
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { projectsData } from '@/data/projects';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const filters = ['all', 'featured', 'frontend', 'backend', 'fullstack', 'cloud'];
  
  const getFilteredProjects = () => {
    if (filter === 'all') return projectsData;
    if (filter === 'featured') return projectsData.filter(project => project.isFeatured);
    return projectsData.filter(project => 
      project.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
    );
  };

  const filteredProjects = getFilteredProjects();

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="section-title text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mt-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {filters.map((f) => (
            <Button 
              key={f} 
              variant="outline"
              size="sm"
              onClick={() => setFilter(f)}
              className={cn(
                "capitalize rounded-full transition-all duration-300",
                filter === f 
                  ? "bg-gradient-to-r from-portfolio-blue to-portfolio-purple text-white border-none shadow-[0_4px_16px_rgba(75,223,255,0.2)]" 
                  : "glass-tag hover:bg-white/10 border-white/10"
              )}
            >
              {f}
            </Button>
          ))}
        </motion.div>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="glass-card p-6 card-hover flex flex-col justify-between h-full"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] transition-colors">{project.title}</h3>
                    <div className="flex gap-2.5 text-[var(--text-muted)]">
                      {project.githubRepo && (
                        <a 
                          href={project.githubRepo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-portfolio-blue transition-colors"
                          title="Source Code"
                        >
                          <Github size={18} />
                        </a>
                      )}
                      {project.liveLink && (
                        <a 
                          href={project.liveLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-portfolio-blue transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-[var(--text-secondary)] text-sm mb-5 leading-relaxed line-clamp-3">{project.description}</p>
                </div>
                
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="glass-tag text-[10px] px-2.5 py-0.5 text-[var(--text-secondary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {filteredProjects.length === 0 && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl text-portfolio-light/70">No projects found with this filter</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
