import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="home" className="min-h-[85vh] flex flex-col justify-center relative pt-20 overflow-hidden" itemScope itemType="https://schema.org/Person">
      <div className="py-10 md:py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl text-left"
          style={{ y: textY, opacity: bgOpacity }}
        >
          <motion.p 
            className="text-portfolio-blue mb-4 font-mono text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('hero.greeting')}
          </motion.p>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-[var(--text-primary)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span itemProp="name">Arhin David Kwabena</span>
          </motion.h1>
          
          <motion.h2 
            className="text-xl md:text-2xl text-[var(--text-secondary)] font-medium mb-6 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <span itemProp="jobTitle">{t('hero.title')}</span>
          </motion.h2>
          
          <motion.p 
            className="text-base text-[var(--text-secondary)] mb-8 leading-relaxed max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {t('hero.description')}
          </motion.p>
          
          {/* Minimalist topic badges */}
          <motion.div 
            className="flex flex-wrap gap-2 mb-8 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <span className="glass-tag text-xs font-medium px-3 py-1.5 text-[var(--text-secondary)]">System Design</span>
            <span className="glass-tag text-xs font-medium px-3 py-1.5 text-[var(--text-secondary)]">Distributed Systems</span>
            <span className="glass-tag text-xs font-medium px-3 py-1.5 text-[var(--text-secondary)]">Cloud Infrastructure</span>
            <span className="glass-tag text-xs font-medium px-3 py-1.5 text-[var(--text-secondary)]">Python & Node.js</span>
            <span className="glass-tag text-xs font-medium px-3 py-1.5 text-[var(--text-secondary)]">AI Agents</span>
          </motion.div>

          {/* Social links row matching kelvinamoaba.com */}
          <motion.div 
            className="flex items-center gap-5 mt-6 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <a 
              href="https://github.com/Anonymous-Roys" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[var(--text-secondary)] hover:text-portfolio-blue transition-colors" 
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/david-arhin-09a0a026a" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[var(--text-secondary)] hover:text-portfolio-blue transition-colors" 
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="mailto:davidarhin2005@gmail.com" 
              className="text-[var(--text-secondary)] hover:text-portfolio-blue transition-colors" 
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </motion.div>

          <motion.div 
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <Link to="/projects">
              <Button className="bg-portfolio-blue hover:bg-portfolio-blue/90 text-white dark:text-background font-medium px-6 py-2.5 rounded-xl transition-all">
                {t('hero.viewWork')}
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              className="border-border hover:bg-muted text-[var(--text-primary)] px-6 py-2.5 rounded-xl transition-all"
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
              <Button 
                variant="ghost" 
                className="text-portfolio-blue hover:text-portfolio-blue/80 hover:bg-portfolio-blue/5 px-6 py-2.5 rounded-xl transition-all"
              >
                {t('hero.contactMe')} →
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
