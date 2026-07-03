import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingOrb from '@/components/FloatingOrb';
import { usePageAnalytics } from '@/hooks/use-analytics';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

const markdownComponents = {
  img: ({ src, alt }: { src?: string; alt?: string }) => {
    return (
      <div className="rounded-xl border border-border bg-card overflow-hidden my-8 shadow-xl">
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-border bg-muted/30">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          {alt && <span className="text-xs font-mono text-[var(--text-muted)] mx-auto pr-10">{alt}</span>}
        </div>
        <img src={src} alt={alt} className="w-full object-cover max-h-[450px]" />
      </div>
    );
  }
};

const BlogPostPage = () => {
  usePageAnalytics();
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug!)
        .eq('published', true)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[var(--portfolio-dark)] min-h-screen text-[var(--text-primary)] overflow-x-hidden relative"
    >
      <FloatingOrb color="var(--portfolio-purple)" size="400px" top="10%" right="-5%" speed={0.3} />
      <FloatingOrb color="var(--portfolio-blue)" size="300px" top="50%" left="-8%" speed={-0.2} />

      <Header />
      <main className="mx-auto max-w-4xl px-6 md:px-10 pt-20 pb-20">
        <Link to="/blog" className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-portfolio-blue transition-colors mb-8 text-sm">
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-white/5 rounded w-3/4" />
            <div className="h-4 bg-white/5 rounded w-1/4" />
            <div className="h-64 bg-white/5 rounded mt-8" />
          </div>
        ) : post ? (
          <article>
            {post.cover_image && (
              <div className="rounded-xl border border-border bg-card overflow-hidden mb-8 shadow-xl">
                <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border bg-muted/40">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                  <span className="text-xs font-mono text-[var(--text-muted)] mx-auto pr-10">cover.jpg</span>
                </div>
                <img src={post.cover_image} alt={post.title} className="w-full h-64 md:h-80 object-cover" />
              </div>
            )}
            
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[var(--text-primary)]">{post.title}</h1>
            
            <div className="flex items-center gap-4 text-sm text-[var(--text-muted)] mb-8">
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <span key={tag} className="glass-tag text-sm px-3 py-1 flex items-center gap-1 text-[var(--text-secondary)]">
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="glass-card-strong p-8 prose dark:prose-invert prose-lg max-w-none prose-headings:text-[var(--text-primary)] prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:text-[var(--text-secondary)] prose-p:leading-relaxed prose-strong:text-[var(--text-primary)] prose-li:text-[var(--text-secondary)] prose-a:text-portfolio-blue prose-a:no-underline hover:prose-a:underline prose-ol:list-decimal prose-ul:list-disc prose-code:text-portfolio-blue prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded">
              <ReactMarkdown rehypePlugins={[rehypeHighlight]} components={markdownComponents}>{post.content}</ReactMarkdown>
            </div>
          </article>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-[var(--text-muted)]">Post not found</p>
            <Link to="/blog" className="text-portfolio-blue mt-4 inline-block hover:underline">Back to Blog</Link>
          </div>
        )}
      </main>
      <Footer />
    </motion.div>
  );
};

export default BlogPostPage;
