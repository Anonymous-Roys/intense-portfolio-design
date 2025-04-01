
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: Github, href: 'https://github.com/Anonymous-Roys', ariaLabel: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/david-arhin-09a0a026a', ariaLabel: 'LinkedIn' },
    { icon: Mail, href: 'mailto:davidarhin2005@gmail.com', ariaLabel: 'Email' }
  ];

  return (
    <footer className="py-10 bg-portfolio-dark/90 relative">
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
          
          <p className="text-portfolio-light/60 mb-6 text-center">
            Fullstack Developer | Cloud Practitioner | Tech Mentor
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
                  className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                >
                  <Icon size={20} className="text-portfolio-light/80" />
                </a>
              );
            })}
          </div>
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-portfolio-light/10 to-transparent my-6"></div>
          
          <p className="text-sm text-portfolio-light/50 text-center">
            © {currentYear} Arhin David Kwabena. All rights reserved.
          </p>
        </motion.div>
      </div>
      
      {/* Background element */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-portfolio-dark to-transparent"></div>
    </footer>
  );
};

export default Footer;
