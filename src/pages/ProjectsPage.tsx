
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';
import ParallaxSection from '@/components/ParallaxSection';
import FloatingOrb from '@/components/FloatingOrb';
import { usePageAnalytics } from '@/hooks/use-analytics';

const ProjectsPage = () => {
  usePageAnalytics();

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[var(--portfolio-dark)] min-h-screen text-[var(--text-primary)] overflow-x-hidden relative"
    >
      <FloatingOrb color="#4BDFFF" size="400px" top="10%" left="-5%" speed={0.3} />
      <FloatingOrb color="#9b87f5" size="350px" top="50%" right="-8%" speed={-0.2} />
      <FloatingOrb color="#39FF14" size="250px" top="80%" left="10%" speed={0.25} />

      <Header />
      <div className="pt-24">
        <ParallaxSection speed={0.1} fadeIn scale>
          <Projects />
        </ParallaxSection>
      </div>
      <Footer />
    </motion.div>
  );
};

export default ProjectsPage;
