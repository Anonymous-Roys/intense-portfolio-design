
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} id="home" className="min-h-screen flex flex-col justify-center relative pt-20 overflow-hidden" itemScope itemType="https://schema.org/Person">
      <div className="container mx-auto px-4 py-10 md:py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center gap-10"
        >
          <motion.div className="flex-1 text-center md:text-left" style={{ y: textY, opacity: bgOpacity }}>
            <motion.p 
              className="text-portfolio-blue mb-4 font-mono"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('hero.greeting')}
            </motion.p>
            
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-2 highlight-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span itemProp="name">Arhin David Kwabena</span>
            </motion.h1>
            
            <motion.h2 
              className="text-2xl md:text-3xl text-[var(--text-secondary)] font-medium mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <span itemProp="jobTitle">{t('hero.title')}</span>
            </motion.h2>
            
            <motion.p 
              className="text-lg text-[var(--text-secondary)] mb-8 max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {t('hero.description')}
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <Link to="/projects">
                <Button className="btn-gradient rounded-2xl">
                  {t('hero.viewWork')}
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                className="glass-pill bg-transparent border-portfolio-blue/30 text-portfolio-blue hover:bg-portfolio-blue/10 transition-all px-6 py-2.5"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/Software_engineer.pdf';
                  link.download = 'Arhin_David_Kwabena_CV.pdf';
                  link.click();
                }}
              >
                {t('hero.downloadCV')}
              </Button>
              
              <Link to="/contact">
                <Button className="glass-pill bg-transparent border-portfolio-purple/30 text-portfolio-purple hover:bg-portfolio-purple/10 transition-all px-6 py-2.5">
                  {t('hero.contactMe')}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative w-64 h-64 md:w-80 md:h-80"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ y: imageY }}
          >
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-[var(--glass-border)] relative z-10" style={{ boxShadow: '0 12px 40px rgba(75, 223, 255, 0.15)' }}>
              <img 
                src="/profile.jpeg" 
                alt="Arhin David Kwabena - Fullstack Developer" 
                className="w-full h-full object-cover" 
                loading="eager"
              />
            </div>
            <div className="absolute top-0 left-0 w-full h-full rounded-full bg-portfolio-purple opacity-20 blur-xl -z-10"></div>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute top-1/4 left-10 w-64 h-64 bg-portfolio-blue opacity-5 rounded-full blur-3xl"
        style={{ scale: bgScale }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-10 w-80 h-80 bg-portfolio-purple opacity-5 rounded-full blur-3xl"
        style={{ scale: bgScale }}
      />
    </section>
  );
};

export default Hero;
