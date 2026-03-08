
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';
import ParallaxSection from '@/components/ParallaxSection';
import FloatingOrb from '@/components/FloatingOrb';
import ResumeTimeline from '@/components/ResumeTimeline';
import ChatWidget from '@/components/ChatWidget';
import { usePageAnalytics } from '@/hooks/use-analytics';

const AboutPage = () => {
  usePageAnalytics();

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[var(--portfolio-dark)] min-h-screen text-[var(--text-primary)] overflow-x-hidden relative"
    >
      <FloatingOrb color="#4BDFFF" size="400px" top="5%" left="-5%" speed={0.3} />
      <FloatingOrb color="#9b87f5" size="350px" top="35%" right="-8%" speed={-0.2} />
      <FloatingOrb color="#39FF14" size="250px" top="65%" left="5%" speed={0.25} />
      <FloatingOrb color="#4BDFFF" size="300px" top="85%" right="10%" speed={-0.35} />

      <Header />
      <div className="pt-24">
        <ParallaxSection speed={0.15} fadeIn scale>
          <About />
        </ParallaxSection>
        
        <ParallaxSection speed={0.1} fadeIn>
          <Skills />
        </ParallaxSection>
        
        <ParallaxSection speed={0.1} fadeIn>
          <Experience />
        </ParallaxSection>

        <ParallaxSection speed={0.08} fadeIn>
          <ResumeTimeline />
        </ParallaxSection>
      </div>
      <Footer />
      <ChatWidget />
    </motion.div>
  );
};

export default AboutPage;
