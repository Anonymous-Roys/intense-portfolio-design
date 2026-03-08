import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';
import { LogOut, FileText, MessageSquare, BarChart3, Plus, Trash2, Eye, EyeOff, Mail, Sun, Moon, Star as StarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useTheme } from '@/hooks/use-theme';
import TestimonialsManager from '@/components/admin/TestimonialsManager';

type Tab = 'blog' | 'messages' | 'analytics' | 'testimonials';

const AdminPage = () => {
  const [tab, setTab] = useState<Tab>('blog');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate('/admin/login'); return; }
      const { data: roles } = await supabase.from('user_roles').select('role').eq('user_id', user.id);
      if (!roles?.some(r => r.role === 'admin')) { navigate('/admin/login'); return; }
      setLoading(false);
    };
    check();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) return <div className="bg-[var(--portfolio-dark)] min-h-screen flex items-center justify-center text-[var(--text-primary)]">Loading...</div>;

  const tabs: { id: Tab; label: string; icon: typeof FileText }[] = [
    { id: 'blog', label: 'Blog Posts', icon: FileText },
    { id: 'testimonials', label: 'Testimonials', icon: StarIcon },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="bg-[var(--portfolio-dark)] min-h-screen text-[var(--text-primary)]">
      <header className="glass-header py-4 px-6 flex items-center justify-between">
        <h1 className="text-xl font-bold highlight-text">Admin Dashboard</h1>
        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} className="p-2 rounded-lg glass-card text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors" title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-portfolio-blue transition-colors">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-2 mb-8 flex-wrap">
          {tabs.map(t => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  tab === t.id ? 'bg-portfolio-blue text-portfolio-dark' : 'glass-card text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Icon size={16} /> {t.label}
              </button>
            );
          })}
        </div>

        {tab === 'blog' && <BlogManager />}
        {tab === 'testimonials' && <TestimonialsManager />}
        {tab === 'messages' && <MessagesViewer />}
        {tab === 'analytics' && <AnalyticsViewer />}
      </div>
    </div>
  );
};

/* ===== Blog Manager ===== */
const BlogManager = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', content: '', cover_image: '', tags: '', published: false });

  const fetchPosts = async () => {
    const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    setPosts(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const resetForm = () => {
    setForm({ title: '', slug: '', excerpt: '', content: '', cover_image: '', tags: '', published: false });
    setEditing(null);
    setShowForm(false);
  };

  const handleSave = async () => {
    const payload = {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt || null,
      content: form.content,
      cover_image: form.cover_image || null,
      tags: form.tags ? form.tags.split(',').map(t => t.trim()) : [],
      published: form.published,
    };

    if (editing) {
      const { error } = await supabase.from('blog_posts').update(payload).eq('id', editing.id);
      if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
      toast({ title: 'Post updated' });
    } else {
      const { error } = await supabase.from('blog_posts').insert(payload);
      if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
      toast({ title: 'Post created' });
    }
    resetForm();
    fetchPosts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    await supabase.from('blog_posts').delete().eq('id', id);
    toast({ title: 'Post deleted' });
    fetchPosts();
  };

  const handleEdit = (post: any) => {
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content,
      cover_image: post.cover_image || '',
      tags: post.tags?.join(', ') || '',
      published: post.published,
    });
    setEditing(post);
    setShowForm(true);
  };

  const togglePublish = async (post: any) => {
    await supabase.from('blog_posts').update({ published: !post.published }).eq('id', post.id);
    fetchPosts();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Blog Posts ({posts.length})</h2>
        <button onClick={() => { resetForm(); setShowForm(!showForm); }} className="flex items-center gap-2 btn-gradient px-4 py-2 rounded-lg text-sm">
          <Plus size={16} /> New Post
        </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Title" className="bg-transparent border border-[var(--glass-border)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)]" />
            <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="slug-url" className="bg-transparent border border-[var(--glass-border)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)]" />
            <input value={form.cover_image} onChange={e => setForm(f => ({ ...f, cover_image: e.target.value }))} placeholder="Cover image URL" className="bg-transparent border border-[var(--glass-border)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)]" />
            <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="Tags (comma separated)" className="bg-transparent border border-[var(--glass-border)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)]" />
          </div>
          <input value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} placeholder="Excerpt" className="w-full bg-transparent border border-[var(--glass-border)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)]" />
          <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="Content (Markdown)" rows={10} className="w-full bg-transparent border border-[var(--glass-border)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] font-mono" />
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} className="accent-portfolio-blue" />
              Published
            </label>
            <div className="ml-auto flex gap-2">
              <button onClick={resetForm} className="px-4 py-2 text-sm glass-card rounded-lg">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 text-sm btn-gradient rounded-lg">{editing ? 'Update' : 'Create'}</button>
            </div>
          </div>
        </motion.div>
      )}

      {loading ? <p>Loading...</p> : (
        <div className="space-y-3">
          {posts.map(post => (
            <div key={post.id} className="glass-card p-4 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{post.title}</h3>
                <p className="text-xs text-[var(--text-secondary)]">{format(new Date(post.created_at), 'MMM d, yyyy')} • /{post.slug}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => togglePublish(post)} className={`p-2 rounded-lg ${post.published ? 'text-portfolio-green' : 'text-[var(--text-secondary)]'}`} title={post.published ? 'Published' : 'Draft'}>
                  {post.published ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button onClick={() => handleEdit(post)} className="p-2 rounded-lg text-portfolio-blue hover:bg-portfolio-blue/10"><FileText size={16} /></button>
                <button onClick={() => handleDelete(post.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-400/10"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
          {posts.length === 0 && <p className="text-center text-[var(--text-secondary)] py-8">No blog posts yet.</p>}
        </div>
      )}
    </div>
  );
};

/* ===== Messages Viewer ===== */
const MessagesViewer = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
      setMessages(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const markRead = async (msg: any) => {
    await supabase.from('contact_messages').update({ is_read: true }).eq('id', msg.id);
    setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, is_read: true } : m));
  };

  const unread = messages.filter(m => !m.is_read).length;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">Messages ({messages.length}) {unread > 0 && <span className="text-portfolio-blue">• {unread} unread</span>}</h2>

      {loading ? <p>Loading...</p> : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {messages.map(msg => (
              <button
                key={msg.id}
                onClick={() => { setSelected(msg); if (!msg.is_read) markRead(msg); }}
                className={`w-full text-left glass-card p-4 transition-colors ${selected?.id === msg.id ? 'border-portfolio-blue' : ''} ${!msg.is_read ? 'border-l-2 border-l-portfolio-blue' : ''}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-sm truncate">{msg.name}</span>
                  <span className="text-xs text-[var(--text-secondary)]">{format(new Date(msg.created_at), 'MMM d')}</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] truncate">{msg.subject}</p>
              </button>
            ))}
            {messages.length === 0 && <p className="text-center text-[var(--text-secondary)] py-8">No messages yet.</p>}
          </div>

          {selected && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-6">
              <h3 className="font-semibold text-lg mb-1">{selected.subject}</h3>
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-4">
                <Mail size={14} /> {selected.email} {selected.phone && `• ${selected.phone}`}
              </div>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              <p className="text-xs text-[var(--text-secondary)] mt-4">{format(new Date(selected.created_at), 'MMMM d, yyyy h:mm a')}</p>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

/* ===== Analytics Viewer ===== */
const AnalyticsViewer = () => {
  const [analytics, setAnalytics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('page_analytics').select('*').order('visited_at', { ascending: false }).limit(100);
      setAnalytics(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const grouped = analytics.reduce((acc, item) => {
    acc[item.page_path] = (acc[item.page_path] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sorted = Object.entries(grouped).sort(([, a], [, b]) => (b as number) - (a as number));

  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">Page Analytics (last 100 visits)</h2>

      {loading ? <p>Loading...</p> : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="glass-card p-4 text-center">
              <p className="text-3xl font-bold text-portfolio-blue">{analytics.length}</p>
              <p className="text-sm text-[var(--text-secondary)]">Total Views</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="text-3xl font-bold text-portfolio-purple">{Object.keys(grouped).length}</p>
              <p className="text-sm text-[var(--text-secondary)]">Pages Visited</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="text-3xl font-bold text-portfolio-green">{new Set(analytics.map(a => a.visitor_id)).size}</p>
              <p className="text-sm text-[var(--text-secondary)]">Unique Visitors</p>
            </div>
          </div>

          <div className="glass-card p-4">
            <h3 className="font-medium mb-3">Top Pages</h3>
            {sorted.map(([path, count]) => (
              <div key={path} className="flex items-center justify-between py-2 border-b border-[var(--glass-border)] last:border-0">
                <span className="text-sm font-mono">{path}</span>
                <span className="text-sm font-bold text-portfolio-blue">{count as number}</span>
              </div>
            ))}
            {sorted.length === 0 && <p className="text-sm text-[var(--text-secondary)]">No analytics data yet.</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
