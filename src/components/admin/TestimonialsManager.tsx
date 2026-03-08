import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Plus, Trash2, Eye, EyeOff, Pencil, Star, GripVertical } from 'lucide-react';

const TestimonialsManager = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ name: '', role: '', avatar: '🧑‍💼', rating: 5, text: '', display_order: 0, visible: true });

  const fetchItems = async () => {
    const { data } = await supabase.from('testimonials').select('*').order('display_order', { ascending: true });
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const resetForm = () => {
    setForm({ name: '', role: '', avatar: '🧑‍💼', rating: 5, text: '', display_order: items.length + 1, visible: true });
    setEditing(null);
    setShowForm(false);
  };

  const handleSave = async () => {
    const payload = { ...form };
    if (editing) {
      const { error } = await supabase.from('testimonials').update(payload).eq('id', editing.id);
      if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
      toast({ title: 'Testimonial updated' });
    } else {
      const { error } = await supabase.from('testimonials').insert(payload);
      if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
      toast({ title: 'Testimonial created' });
    }
    resetForm();
    fetchItems();
  };

  const handleEdit = (item: any) => {
    setForm({ name: item.name, role: item.role, avatar: item.avatar, rating: item.rating, text: item.text, display_order: item.display_order, visible: item.visible });
    setEditing(item);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    await supabase.from('testimonials').delete().eq('id', id);
    toast({ title: 'Testimonial deleted' });
    fetchItems();
  };

  const toggleVisibility = async (item: any) => {
    await supabase.from('testimonials').update({ visible: !item.visible }).eq('id', item.id);
    fetchItems();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Testimonials ({items.length})</h2>
        <button onClick={() => { resetForm(); setShowForm(!showForm); }} className="flex items-center gap-2 btn-gradient px-4 py-2 rounded-lg text-sm">
          <Plus size={16} /> New Testimonial
        </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Name" className="bg-transparent border border-[var(--glass-border)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)]" />
            <input value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} placeholder="Role / Company" className="bg-transparent border border-[var(--glass-border)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)]" />
            <input value={form.avatar} onChange={e => setForm(f => ({ ...f, avatar: e.target.value }))} placeholder="Avatar emoji" className="bg-transparent border border-[var(--glass-border)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)]" />
            <div className="flex items-center gap-2">
              <label className="text-sm text-[var(--text-secondary)]">Rating:</label>
              {[1, 2, 3, 4, 5].map(r => (
                <button key={r} onClick={() => setForm(f => ({ ...f, rating: r }))} className="p-0.5">
                  <Star size={18} className={r <= form.rating ? 'text-yellow-400 fill-yellow-400' : 'text-[var(--text-secondary)]'} />
                </button>
              ))}
            </div>
          </div>
          <textarea value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))} placeholder="Testimonial text" rows={3} className="w-full bg-transparent border border-[var(--glass-border)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)]" />
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.visible} onChange={e => setForm(f => ({ ...f, visible: e.target.checked }))} className="accent-portfolio-blue" />
              Visible
            </label>
            <input type="number" value={form.display_order} onChange={e => setForm(f => ({ ...f, display_order: parseInt(e.target.value) || 0 }))} className="w-20 bg-transparent border border-[var(--glass-border)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)]" placeholder="Order" />
            <div className="ml-auto flex gap-2">
              <button onClick={resetForm} className="px-4 py-2 text-sm glass-card rounded-lg">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 text-sm btn-gradient rounded-lg">{editing ? 'Update' : 'Create'}</button>
            </div>
          </div>
        </motion.div>
      )}

      {loading ? <p>Loading...</p> : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="glass-card p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="text-2xl">{item.avatar}</span>
                <div className="min-w-0">
                  <h3 className="font-medium truncate">{item.name}</h3>
                  <p className="text-xs text-[var(--text-secondary)] truncate">{item.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={12} className={j < item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-[var(--text-secondary)]'} />
                ))}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => toggleVisibility(item)} className={`p-2 rounded-lg ${item.visible ? 'text-portfolio-green' : 'text-[var(--text-secondary)]'}`}>
                  {item.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button onClick={() => handleEdit(item)} className="p-2 rounded-lg text-portfolio-blue hover:bg-portfolio-blue/10"><Pencil size={16} /></button>
                <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-400/10"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-center text-[var(--text-secondary)] py-8">No testimonials yet.</p>}
        </div>
      )}
    </div>
  );
};

export default TestimonialsManager;
