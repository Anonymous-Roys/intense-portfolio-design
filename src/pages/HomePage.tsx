import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { projectsData } from '@/data/projects';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { usePageAnalytics } from '@/hooks/use-analytics';
import FloatingOrb from '@/components/FloatingOrb';
import Testimonials from '@/components/Testimonials';
import ChatWidget from '@/components/ChatWidget';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';

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

  const featuredProjects = projectsData.filter(p => p.isFeatured).slice(0, 4);

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
        <Hero />

        {/* Featured Projects Section */}
        <section className="py-12 mt-8">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-mono tracking-wider uppercase text-[var(--text-muted)]">Featured Projects</span>
            <span className="h-px flex-1 bg-border"></span>
            <Link to="/projects" className="text-xs text-portfolio-blue hover:underline inline-flex items-center gap-1">
              All projects <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="glass-card p-6 card-hover flex flex-col justify-between h-full relative overflow-hidden group"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                {/* Watermark Logo */}
                {project.faviconDomain && (
                  <div className="absolute right-[-10px] bottom-[-10px] pointer-events-none z-0 select-none transition-transform duration-500 group-hover:scale-110">
                    <img 
                      src={`https://www.google.com/s2/favicons?sz=128&domain=${project.faviconDomain}`} 
                      alt="" 
                      className="w-20 h-20 object-contain opacity-[0.06] dark:opacity-[0.04] filter grayscale"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}

                <div className="relative z-10 flex flex-col justify-between h-full w-full">
                  <div>
                    <div className="flex justify-between items-start mb-3 gap-4">
                      <h3 className="text-base font-semibold text-[var(--text-primary)]">{project.title}</h3>
                    <div className="flex gap-2.5 text-[var(--text-muted)]">
                      {project.githubRepo && (
                        <a 
                          href={project.githubRepo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-portfolio-blue transition-colors"
                          title="Source Code"
                        >
                          <Github size={16} />
                        </a>
                      )}
                      {project.liveLink && (
                        <a 
                          href={project.liveLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-portfolio-blue transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-[var(--text-secondary)] text-xs mb-5 leading-relaxed line-clamp-3">{project.description}</p>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-auto">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span 
                      key={tag} 
                      className="glass-tag text-[9px] px-2.5 py-0.5 text-[var(--text-secondary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
            ))}
          </div>
        </section>

        {/* Writing Section */}
        {posts && posts.length > 0 && (
          <section className="py-12">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs font-mono tracking-wider uppercase text-[var(--text-muted)]">Writing</span>
              <span className="h-px flex-1 bg-border"></span>
              <Link to="/blog" className="text-xs text-portfolio-blue hover:underline inline-flex items-center gap-1">
                All writing <ArrowRight size={12} />
              </Link>
            </div>

            <div className="space-y-3">
              {posts.map((post) => (
                <Link 
                  key={post.id} 
                  to={`/blog/${post.slug}`} 
                  className="group flex flex-col sm:flex-row justify-between items-start sm:items-baseline py-3 border-b border-border/40 hover:border-portfolio-blue/40 transition-colors gap-1 sm:gap-4"
                >
                  <span className="text-xs text-[var(--text-muted)] font-mono min-w-[100px]">
                    {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-portfolio-blue transition-colors flex-1">
                    {post.title}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Testimonials Section */}
        <section className="py-12">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-mono tracking-wider uppercase text-[var(--text-muted)]">Testimonials</span>
            <span className="h-px flex-1 bg-border"></span>
          </div>
          <Testimonials />
        </section>
      </main>

      <Footer />
      <ChatWidget />
    </motion.div>
  );
};

export default HomePage;
