
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { usePageAnalytics } from '@/hooks/use-analytics';
import FloatingOrb from '@/components/FloatingOrb';

const HomePage = () => {
  usePageAnalytics();

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-portfolio-dark min-h-screen text-portfolio-light overflow-x-hidden relative"
    >
      <FloatingOrb color="#4BDFFF" size="400px" top="10%" left="-5%" speed={0.3} />
      <FloatingOrb color="#9b87f5" size="350px" top="30%" right="-8%" speed={-0.2} />

      <Header />
      <Hero />
      <Footer />
    </motion.div>
  );
};

export default HomePage;
