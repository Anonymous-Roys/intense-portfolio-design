
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Menu, X, Github, Linkedin, Mail, Sun, Moon, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/hooks/use-theme';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const toggleLang = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.projects'), href: '/projects' },
    { name: t('nav.blog'), href: '/blog' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Anonymous-Roys', ariaLabel: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/david-arhin-09a0a026a', ariaLabel: 'LinkedIn' },
    { icon: Mail, href: 'mailto:davidarhin2005@gmail.com', ariaLabel: 'Email' }
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 py-4",
        isScrolled ? "glass-header" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="text-xl md:text-2xl font-bold highlight-text">
            Arhin David
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                to={link.href}
                className={cn(
                  "transition-colors",
                  isActive(link.href) 
                    ? "text-portfolio-blue" 
                    : "text-[var(--text-primary)] hover:text-portfolio-blue"
                )}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
          
          <motion.div 
            className="flex items-center gap-3 ml-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full glass-card hover:scale-110 transition-transform"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} className="text-portfolio-blue" /> : <Moon size={18} className="text-portfolio-purple" />}
            </button>

            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="p-2 rounded-full glass-card hover:scale-110 transition-transform flex items-center gap-1"
              aria-label="Toggle language"
            >
              <Globe size={16} className="text-portfolio-blue" />
              <span className="text-xs font-mono font-bold text-[var(--text-primary)]">{i18n.language.toUpperCase()}</span>
            </button>

            <div className="w-px h-5 bg-[var(--glass-border)] mx-1" />

            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a 
                  key={link.ariaLabel} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={link.ariaLabel}
                  className="text-[var(--text-primary)] hover:text-portfolio-blue transition-colors"
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </motion.div>
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full glass-card"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} className="text-portfolio-blue" /> : <Moon size={16} className="text-portfolio-purple" />}
          </button>
          <button
            onClick={toggleLang}
            className="p-2 rounded-full glass-card"
            aria-label="Toggle language"
          >
            <span className="text-xs font-mono font-bold text-[var(--text-primary)]">{i18n.language.toUpperCase()}</span>
          </button>
          <button 
            className="text-[var(--text-primary)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.nav 
          className="fixed inset-0 pt-24 px-6 flex flex-col md:hidden z-40"
          style={{
            background: var(--glass-header-from) !== undefined ? 'var(--glass-header-from)' : 'rgba(30, 30, 46, 0.85)',
            backdropFilter: 'blur(60px) saturate(200%)',
            WebkitBackdropFilter: 'blur(60px) saturate(200%)',
          }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
        >
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                to={link.href}
                className={cn(
                  "text-xl transition-colors",
                  isActive(link.href) 
                    ? "text-portfolio-blue" 
                    : "text-[var(--text-primary)] hover:text-portfolio-blue"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="mt-8 flex gap-6">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a 
                  key={link.ariaLabel} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={link.ariaLabel}
                  className="text-[var(--text-primary)] hover:text-portfolio-blue transition-colors"
                >
                  <Icon size={24} />
                </a>
              );
            })}
          </div>
        </motion.nav>
      )}
    </header>
  );
};

export default Header;
