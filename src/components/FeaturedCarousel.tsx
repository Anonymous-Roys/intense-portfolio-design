import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projectsData } from '@/data/projects';
import { Eye, Github, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import GlowOrb from './GlowOrb';

const featuredProjects = projectsData.filter(p => p.isFeatured).slice(0, 3);

const FeaturedCarousel = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % featuredProjects.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
  }, []);

  // Auto-advance every 5s
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const project = featuredProjects[current];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Featured Work
          </motion.h2>
          <Link
            to="/projects"
            className="hidden sm:inline-flex items-center gap-2 text-portfolio-blue hover:gap-3 transition-all text-sm"
          >
            View all projects <ArrowRight size={16} />
          </Link>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5 }}
              className="glass-card-strong overflow-hidden relative"
            >
              <GlowOrb color="#4BDFFF" size="250px" className="-top-16 -right-16" duration={8} />
              <GlowOrb color="#9b87f5" size="200px" className="bottom-0 -left-12" duration={10} delay={2} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-portfolio-dark/60 hidden md:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-portfolio-dark/80 to-transparent md:hidden" />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col justify-center relative z-10">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="glass-tag text-xs px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold mb-3">{project.title}</h3>
                  <p className="text-portfolio-light/70 mb-6">{project.description}</p>

                  <div className="flex gap-4">
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-portfolio-blue hover:text-portfolio-blue/80 transition-colors"
                      >
                        <Eye size={16} /> Live Demo
                      </a>
                    )}
                    {project.githubRepo && (
                      <a
                        href={project.githubRepo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-portfolio-purple hover:text-portfolio-purple/80 transition-colors"
                      >
                        <Github size={16} /> Source
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2">
              {featuredProjects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-8 bg-gradient-to-r from-portfolio-blue to-portfolio-purple'
                      : 'w-2 bg-white/20 hover:bg-white/30'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={prev}
                className="glass-card p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="glass-card p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <Link
          to="/projects"
          className="sm:hidden inline-flex items-center gap-2 text-portfolio-blue hover:gap-3 transition-all text-sm mt-6"
        >
          View all projects <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedCarousel;
