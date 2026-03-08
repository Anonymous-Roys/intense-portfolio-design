
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
                className="glass-card overflow-hidden card-hover"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-portfolio-dark to-transparent opacity-80"></div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span 
                          key={tag} 
                          className="glass-tag text-xs px-2 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="text-xs bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                  <p className="text-portfolio-light/70 mb-6 h-14 line-clamp-2">{project.description}</p>
                  
                  <div className="flex gap-4">
                    {project.liveLink && (
                      <a 
                        href={project.liveLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-portfolio-light/70 hover:text-portfolio-blue transition-colors"
                      >
                        <Eye size={16} />
                        <span>Live Demo</span>
                      </a>
                    )}
                    
                    {project.githubRepo && (
                      <a 
                        href={project.githubRepo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-portfolio-light/70 hover:text-portfolio-purple transition-colors"
                      >
                        <Github size={16} />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
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
