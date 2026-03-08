
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
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/blog/${post.slug}`} className="block glass-card overflow-hidden card-hover group">
                    {post.cover_image && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-portfolio-light/50 mb-3">
                        <Calendar size={14} />
                        <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <h2 className="text-xl font-semibold mb-2 group-hover:text-portfolio-blue transition-colors">{post.title}</h2>
                      {post.excerpt && <p className="text-portfolio-light/70 line-clamp-2">{post.excerpt}</p>}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="glass-tag text-xs px-2 py-1">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
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
              <p className="text-xl text-portfolio-light/50">No blog posts yet. Stay tuned!</p>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default BlogPage;
