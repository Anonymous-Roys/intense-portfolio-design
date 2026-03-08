
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ParallaxSection from '@/components/ParallaxSection';
import FloatingOrb from '@/components/FloatingOrb';
import { usePageAnalytics } from '@/hooks/use-analytics';

const ContactPage = () => {
  usePageAnalytics();

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-portfolio-dark min-h-screen text-portfolio-light overflow-x-hidden relative"
    >
      <FloatingOrb color="#9b87f5" size="400px" top="10%" right="-5%" speed={0.3} />
      <FloatingOrb color="#4BDFFF" size="300px" top="60%" left="-8%" speed={-0.2} />

      <Header />
      <div className="pt-24">
        <ParallaxSection speed={0.08} fadeIn>
          <Contact />
        </ParallaxSection>
      </div>
      <Footer />
    </motion.div>
  );
};

export default ContactPage;
