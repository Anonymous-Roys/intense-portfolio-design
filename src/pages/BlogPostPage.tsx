
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingOrb from '@/components/FloatingOrb';
import { usePageAnalytics } from '@/hooks/use-analytics';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';

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
      className="bg-portfolio-dark min-h-screen text-portfolio-light overflow-x-hidden relative"
    >
      <FloatingOrb color="#9b87f5" size="400px" top="10%" right="-5%" speed={0.3} />
      <FloatingOrb color="#4BDFFF" size="300px" top="50%" left="-8%" speed={-0.2} />

      <Header />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-portfolio-light/60 hover:text-portfolio-blue transition-colors mb-8">
            <ArrowLeft size={18} />
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
                <div className="rounded-2xl overflow-hidden mb-8">
                  <img src={post.cover_image} alt={post.title} className="w-full h-64 md:h-80 object-cover" />
                </div>
              )}
              
              <h1 className="text-3xl md:text-5xl font-bold mb-4 highlight-text">{post.title}</h1>
              
              <div className="flex items-center gap-4 text-sm text-portfolio-light/50 mb-8">
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((tag) => (
                    <span key={tag} className="glass-tag text-sm px-3 py-1 flex items-center gap-1">
                      <Tag size={12} />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="glass-card-strong p-8 prose prose-invert max-w-none">
                <div className="text-portfolio-light/85 leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </div>
              </div>
            </article>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-portfolio-light/50">Post not found</p>
              <Link to="/blog" className="text-portfolio-blue mt-4 inline-block">Back to Blog</Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default BlogPostPage;
