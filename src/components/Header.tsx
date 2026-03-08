
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
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
              key={link.name}
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
                    : "text-portfolio-light hover:text-portfolio-blue"
                )}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
          
          <motion.div 
            className="flex items-center gap-4 ml-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a 
                  key={link.ariaLabel} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={link.ariaLabel}
                  className="text-portfolio-light hover:text-portfolio-blue transition-colors"
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </motion.div>
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-portfolio-light"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.nav 
          className="fixed inset-0 pt-24 px-6 flex flex-col md:hidden z-40"
          style={{
            background: 'rgba(30, 30, 46, 0.85)',
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
                key={link.name} 
                to={link.href}
                className={cn(
                  "text-xl transition-colors",
                  isActive(link.href) 
                    ? "text-portfolio-blue" 
                    : "text-portfolio-light hover:text-portfolio-blue"
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
                  className="text-portfolio-light hover:text-portfolio-blue transition-colors"
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
