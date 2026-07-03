
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingOrb from '@/components/FloatingOrb';
import { usePageAnalytics } from '@/hooks/use-analytics';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';

const BlogPage = () => {
  usePageAnalytics();

  const { data: posts, isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[var(--portfolio-dark)] min-h-screen text-[var(--text-primary)] overflow-x-hidden relative"
    >
      <FloatingOrb color="#9b87f5" size="400px" top="10%" left="-5%" speed={0.3} />
      <FloatingOrb color="#4BDFFF" size="300px" top="50%" right="-8%" speed={-0.2} />

      <Header />
      <main className="mx-auto max-w-4xl px-6 md:px-10 pt-20 pb-20">
        <motion.h1
          className="section-title text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Blog
        </motion.h1>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card p-6 animate-pulse">
                <div className="h-40 bg-white/5 rounded-lg mb-4" />
                <div className="h-6 bg-white/5 rounded mb-2 w-3/4" />
                <div className="h-4 bg-white/5 rounded w-full" />
              </div>
            ))}
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="max-w-2xl mx-auto mt-12 space-y-6">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Link to={`/blog/${post.slug}`} className="block glass-card p-6 card-hover group">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                    <h2 className="text-xl font-semibold text-[var(--text-primary)] group-hover:text-portfolio-blue transition-colors">
                      {post.title}
                    </h2>
                    <span className="text-xs font-mono text-[var(--text-muted)] whitespace-nowrap">
                      {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  {post.excerpt && (
                    <p className="text-[var(--text-secondary)] text-sm mb-4 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span key={tag} className="glass-tag text-[10px] px-2.5 py-0.5 text-[var(--text-secondary)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-xl text-[var(--text-muted)]">No blog posts yet. Stay tuned!</p>
          </motion.div>
        )}
      </main>
      <Footer />
    </motion.div>
  );
};

export default BlogPage;
