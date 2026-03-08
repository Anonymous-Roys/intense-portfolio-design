
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ParallaxSection from '@/components/ParallaxSection';
import FloatingOrb from '@/components/FloatingOrb';

const Index = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => observer.observe(element));

    return () => {
      elements.forEach(element => observer.unobserve(element));
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[var(--portfolio-dark)] min-h-screen text-[var(--text-primary)] overflow-x-hidden relative"
    >
      {/* Global floating orbs for depth */}
      <FloatingOrb color="#4BDFFF" size="400px" top="10%" left="-5%" speed={0.3} />
      <FloatingOrb color="#9b87f5" size="350px" top="30%" right="-8%" speed={-0.2} />
      <FloatingOrb color="#4BDFFF" size="300px" top="55%" left="5%" speed={0.25} />
      <FloatingOrb color="#39FF14" size="250px" top="75%" right="10%" speed={-0.35} />
      <FloatingOrb color="#9b87f5" size="400px" top="90%" left="-10%" speed={0.2} />

      <Header />
      <Hero />
      
      <ParallaxSection speed={0.15} fadeIn scale>
        <About />
      </ParallaxSection>
      
      <ParallaxSection speed={0.1} fadeIn>
        <Skills />
      </ParallaxSection>
      
      <ParallaxSection speed={0.12} fadeIn scale>
        <Projects />
      </ParallaxSection>
      
      <ParallaxSection speed={0.1} fadeIn>
        <Experience />
      </ParallaxSection>
      
      <ParallaxSection speed={0.08} fadeIn>
        <Contact />
      </ParallaxSection>
      
      <Footer />
    </motion.div>
  );
};

export default Index;
