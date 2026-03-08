
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { usePageAnalytics } from '@/hooks/use-analytics';
import FloatingOrb from '@/components/FloatingOrb';
import GlowOrb from '@/components/GlowOrb';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import ParallaxSection from '@/components/ParallaxSection';
import Testimonials from '@/components/Testimonials';
import ChatWidget from '@/components/ChatWidget';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Briefcase, BookOpen, MessageSquare } from 'lucide-react';

const previewSections = [
  {
    title: 'Projects',
    description: 'Explore my featured work — from EdTech platforms to cloud deployments.',
    href: '/projects',
    icon: Code2,
    color: '#4BDFFF',
  },
  {
    title: 'About & Experience',
    description: 'My journey as a developer, certifications, and professional experience.',
    href: '/about',
    icon: Briefcase,
    color: '#9b87f5',
  },
  {
    title: 'Blog',
    description: 'Thoughts on web development, React, cloud, and the tech journey.',
    href: '/blog',
    icon: BookOpen,
    color: '#39FF14',
  },
  {
    title: 'Contact',
    description: 'Let\'s collaborate — reach out for opportunities or a tech chat.',
    href: '/contact',
    icon: MessageSquare,
    color: '#4BDFFF',
  },
];

const HomePage = () => {
  usePageAnalytics();

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[var(--portfolio-dark)] min-h-screen text-[var(--text-primary)] overflow-x-hidden relative"
    >
      <FloatingOrb color="#4BDFFF" size="400px" top="10%" left="-5%" speed={0.3} />
      <FloatingOrb color="#9b87f5" size="350px" top="30%" right="-8%" speed={-0.2} />
      <FloatingOrb color="#39FF14" size="200px" top="70%" left="10%" speed={0.2} />

      <Header />
      <Hero />

      {/* Featured Projects Carousel */}
      <ParallaxSection speed={0.1} fadeIn scale>
        <FeaturedCarousel />
      </ParallaxSection>

      {/* Quick navigation cards */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.h2
            className="section-title text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Explore
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {previewSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={section.href}
                    className="block glass-card p-6 card-hover group relative overflow-hidden h-full"
                  >
                    <GlowOrb color={section.color} size="120px" className="-top-8 -right-8" duration={6 + index} delay={index} />
                    
                    <div className="relative z-10">
                      <div className="p-3 glass-card rounded-2xl w-fit mb-4">
                        <Icon size={24} style={{ color: section.color }} />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-portfolio-blue transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-portfolio-light/60 text-sm mb-4">
                        {section.description}
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm text-portfolio-blue group-hover:gap-2 transition-all">
                        Explore <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <ParallaxSection speed={0.08} fadeIn>
        <Testimonials />
      </ParallaxSection>

      <Footer />
      <ChatWidget />
    </motion.div>
  );
};

export default HomePage;
