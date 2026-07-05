import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Home, User, Briefcase, BookOpen, Mail, X, Sun, Moon, Globe, Github, Linkedin, Grid } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/hooks/use-theme';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [time, setTime] = useState(new Date());
  
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const toggleLang = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: t('nav.home'), href: '/', id: '01' },
    { name: t('nav.about'), href: '/about', id: '02' },
    { name: t('nav.projects'), href: '/projects', id: '03' },
    { name: t('nav.blog'), href: '/blog', id: '04' },
    { name: t('nav.contact'), href: '/contact', id: '05' },
  ];

  const dockItems = [
    { name: t('nav.home'), href: '/', icon: Home },
    { name: t('nav.about'), href: '/about', icon: User },
    { name: t('nav.projects'), href: '/projects', icon: Briefcase },
    { name: t('nav.blog'), href: '/blog', icon: BookOpen },
    { name: t('nav.contact'), href: '/contact', icon: Mail }
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

  const formattedTime = time.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
    hour12: true 
  });

  return (
    <>
      {/* Top Header Bar */}
      <header className="fixed top-0 left-0 w-full z-40 py-4 bg-transparent">
        <div className="container mx-auto px-6 md:px-10 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="logo-mark flex items-center gap-2 font-mono font-bold tracking-tighter" aria-label="Home">
              <span className="bg-portfolio-blue text-white dark:text-background rounded-lg px-2.5 py-1 text-base">DA</span>
            </Link>
          </motion.div>

          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2.5 rounded-full glass-card text-[var(--text-primary)] hover:scale-105 transition-transform flex items-center gap-2"
            aria-label="Toggle Navigation Panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Grid size={18} className="text-portfolio-blue animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider hidden sm:inline">{menuOpen ? t('nav.close') || 'Close' : t('nav.menu') || 'Menu'}</span>
          </motion.button>
        </div>
      </header>

      {/* Bottom Floating macOS Magnifying Dock */}
      <AnimatePresence>
        {!menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 40, x: '-50%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="fixed bottom-6 left-1/2 z-40 glass-pill px-4 py-2 flex items-center gap-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.15)] border-[var(--glass-border)]"
          >
            {dockItems.map((item, idx) => {
              const Icon = item.icon;
              const isHovered = hoveredIndex === idx;
              const isNeighbor = hoveredIndex !== null && Math.abs(hoveredIndex - idx) === 1;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative p-1 rounded-full flex flex-col items-center justify-center"
                  title={item.name}
                >
                  <motion.div
                    animate={{
                      scale: isHovered ? 1.3 : isNeighbor ? 1.12 : 1,
                      y: isHovered ? -6 : isNeighbor ? -2 : 0
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                    className={cn(
                      "p-2 rounded-full transition-colors",
                      active 
                        ? "bg-portfolio-blue text-white dark:text-background" 
                        : "text-[var(--text-secondary)] hover:text-portfolio-blue hover:bg-muted"
                    )}
                  >
                    <Icon size={18} />
                  </motion.div>
                  
                  {active && (
                    <motion.span 
                      layoutId="dock-dot"
                      className="absolute bottom-0 w-1 h-1 rounded-full bg-portfolio-blue" 
                    />
                  )}
                </Link>
              );
            })}

            <div className="w-px h-6 bg-border/60 mx-1.5" />

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-[var(--text-secondary)] hover:text-portfolio-blue transition-colors rounded-full"
              aria-label="Toggle theme"
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 12 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              className="p-2 text-[var(--text-secondary)] hover:text-portfolio-blue transition-colors rounded-full flex items-center font-mono font-bold text-xs"
              aria-label="Toggle language"
            >
              <motion.div
                whileHover={{ scale: 1.15, rotate: -10 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="flex items-center gap-0.5"
              >
                <Globe size={16} />
                <span className="text-[10px]">{i18n.language.toUpperCase()}</span>
              </motion.div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Navigation Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[var(--portfolio-dark)]/95 backdrop-blur-2xl flex flex-col justify-between p-8 md:p-16 text-[var(--text-primary)]"
          >
            {/* Header clone inside drawer */}
            <div className="flex justify-between items-center w-full">
              <Link to="/" onClick={() => setMenuOpen(false)} className="logo-mark flex items-center gap-2 font-mono font-bold tracking-tighter">
                <span className="bg-portfolio-blue text-white dark:text-background rounded-lg px-2.5 py-1 text-base">DA</span>
              </Link>

              <button
                onClick={() => setMenuOpen(false)}
                className="p-2.5 rounded-full glass-card text-[var(--text-primary)] hover:scale-105 transition-transform flex items-center gap-2"
                aria-label="Close Navigation Panel"
              >
                <X size={18} className="text-portfolio-purple animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider hidden sm:inline">Close</span>
              </button>
            </div>

            {/* Oversized staggered routing links */}
            <nav className="flex flex-col gap-4 md:gap-6 my-auto max-w-xl">
              {navLinks.map((link, idx) => {
                const active = isActive(link.href);
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "group flex items-baseline gap-4 md:gap-6 text-4xl md:text-6xl font-bold tracking-tight transition-all duration-300",
                        active 
                          ? "text-portfolio-blue pl-4 border-l-4 border-portfolio-blue" 
                          : "hover:text-portfolio-blue hover:translate-x-2 text-[var(--text-secondary)]"
                      )}
                    >
                      <span className="text-xs md:text-sm font-mono text-[var(--text-muted)] group-hover:text-portfolio-blue transition-colors">
                        {link.id}
                      </span>
                      <span>{link.name}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom metadata panel */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-t border-border/40 pt-8">
              <div className="space-y-1">
                <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest">Local Time</p>
                <p className="text-lg font-mono font-semibold tabular-nums text-portfolio-blue">{formattedTime}</p>
              </div>

              <div className="flex items-center gap-5">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.ariaLabel}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--text-secondary)] hover:text-portfolio-blue transition-colors"
                      aria-label={link.ariaLabel}
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
