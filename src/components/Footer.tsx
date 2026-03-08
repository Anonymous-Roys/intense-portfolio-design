
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: Github, href: 'https://github.com/Anonymous-Roys', ariaLabel: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/david-arhin-09a0a026a', ariaLabel: 'LinkedIn' },
    { icon: Mail, href: 'mailto:davidarhin2005@gmail.com', ariaLabel: 'Email' }
  ];

  return (
    <footer className="py-10 relative glass-header">
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <a href="#home" className="text-2xl font-bold highlight-text mb-4">
            Arhin David
          </a>
          
          <p className="text-[var(--text-muted)] mb-6 text-center">
            {t('footer.tagline')}
          </p>
          
          <div className="flex gap-6 mb-8">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a 
                  key={link.ariaLabel} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={link.ariaLabel}
                  className="p-2 glass-card rounded-full hover:bg-[var(--glass-bg)] transition-colors"
                >
                  <Icon size={20} className="text-[var(--text-secondary)]" />
                </a>
              );
            })}
          </div>
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--glass-border)] to-transparent my-6"></div>
          
          <p className="text-sm text-[var(--text-muted)] text-center">
            © {currentYear} Arhin David Kwabena. {t('footer.rights')}
          </p>
        </motion.div>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[var(--portfolio-dark)] to-transparent"></div>
    </footer>
  );
};

export default Footer;
