import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CredibilityStrip from '@/components/CredibilityStrip';
import TechnicalSpecs from '@/components/TechnicalSpecs';
import Projects from '@/components/Projects';
import AdvisorySection from '@/components/AdvisorySection';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import { usePageAnalytics } from '@/hooks/use-analytics';
import FloatingOrb from '@/components/FloatingOrb';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';

const HomePage = () => {
  usePageAnalytics();

  // Fetch recent blog posts
  const { data: posts } = useQuery({
    queryKey: ['recent-blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(3);
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
      <FloatingOrb color="var(--portfolio-blue)" size="400px" top="10%" left="-5%" speed={0.3} />
      <FloatingOrb color="var(--portfolio-purple)" size="350px" top="30%" right="-8%" speed={-0.2} />

      <Header />
      
      <main className="mx-auto max-w-4xl px-6 md:px-10 pt-20 pb-20">
        {/* Architect Hero */}
        <Hero />

        {/* Credibility Strip */}
        <CredibilityStrip />

        {/* Featured Projects with Architecture Whitepapers (Top 2) */}
        <Projects limit={2} />

        {/* Technical Specs & Architectural Capabilities */}
        <TechnicalSpecs />

        {/* Technical Writing & Benchmarks (if posts exist) */}
        {posts && posts.length > 0 && (
          <section className="py-16">
            <div className="flex items-center justify-between gap-4 mb-8 pb-3 border-b border-border/40">
              <div className="flex items-center gap-2">
                <BookOpen className="text-portfolio-blue" size={18} />
                <h3 className="text-xs font-mono tracking-wider uppercase text-portfolio-blue font-bold">
                  Technical Writings & System Benchmarks
                </h3>
              </div>
              <Link to="/blog" className="text-xs font-mono text-portfolio-blue hover:underline inline-flex items-center gap-1">
                View All Writings <ArrowRight size={12} />
              </Link>
            </div>

            <div className="space-y-3">
              {posts.map((post) => (
                <Link 
                  key={post.id} 
                  to={`/blog/${post.slug}`} 
                  className="group flex flex-col sm:flex-row justify-between items-start sm:items-baseline p-4 rounded-xl glass-card hover:border-portfolio-blue/40 transition-all gap-2"
                >
                  <span className="text-xs text-[var(--text-muted)] font-mono">
                    {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-portfolio-blue transition-colors flex-1 sm:ml-4">
                    {post.title}
                  </span>
                  <span className="text-xs font-mono text-portfolio-blue group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Read Blueprint <ArrowRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Testimonials */}
        <section className="py-16">
          <Testimonials />
        </section>

        {/* High-Ticket Advisory Call to Action */}
        <AdvisorySection />
      </main>

      <Footer />
      <ChatWidget />
    </motion.div>
  );
};

export default HomePage;
