import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Cpu, ArrowRight, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { projectsData, Project } from '@/data/projects';
import ArchitectureModal from './ArchitectureModal';
import { Link } from 'react-router-dom';

interface ProjectsProps {
  limit?: number;
}

const LiveProjectPreviewImage = ({ project }: { project: Project }) => {
  const isGitHubLink = !project.liveLink || project.liveLink.includes('github.com');

  if (isGitHubLink) {
    return (
      <div className="w-full h-full rounded-xl bg-gray-950 p-4 border border-border/40 font-mono flex flex-col justify-between text-xs">
        <div className="flex items-center justify-between border-b border-gray-800 pb-2">
          <div className="flex items-center gap-2 text-portfolio-blue font-bold">
            <Github size={16} />
            <span className="truncate max-w-[180px]">
              {project.githubRepo ? project.githubRepo.replace('https://github.com/', '') : project.title}
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded glass-tag text-portfolio-purple font-mono">
            OPEN SOURCE
          </span>
        </div>

        <div className="py-2 space-y-2 text-[11px] text-[var(--text-secondary)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Branch: main // Code Repository</span>
          </div>
          <div className="flex items-center gap-2">
            <Cpu size={14} className="text-portfolio-purple" />
            <span>Tech Stack: {project.tags.slice(0, 3).join(', ')}</span>
          </div>
          <p className="text-[10px] text-[var(--text-muted)] line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="pt-2 border-t border-gray-800 text-[10px] text-portfolio-blue flex items-center justify-between font-mono">
          <span>GitHub Developer Repository</span>
          <ExternalLink size={12} />
        </div>
      </div>
    );
  }

  // Live Web App Homepage Preview (Embedded Live Iframe with Live Screenshot Fallback)
  const liveScreenshot = `https://s0.wp.com/mshots/v1/${encodeURIComponent(project.liveLink)}?w=1200&h=800`;
  const [iframeFailed, setIframeFailed] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl border border-border/40 group/img bg-black">
      {!iframeFailed ? (
        <div className="w-full h-full relative overflow-hidden">
          <iframe
            src={project.liveLink}
            title={project.title}
            className="w-[200%] h-[200%] origin-top-left scale-[0.5] pointer-events-none border-none opacity-90 transition-opacity group-hover/img:opacity-100"
            onError={() => setIframeFailed(true)}
          />
        </div>
      ) : (
        <img 
          src={liveScreenshot} 
          alt={project.title} 
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = project.image;
          }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-3 pointer-events-none">
        <div className="flex items-center justify-between w-full">
          <p className="text-xs text-white font-medium line-clamp-1">{project.title}</p>
          <span className="text-[10px] font-mono text-portfolio-blue bg-black/60 px-2 py-0.5 rounded border border-portfolio-blue/30">
            Live Web App Homepage
          </span>
        </div>
      </div>
    </div>
  );
};

const Projects = ({ limit }: ProjectsProps) => {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<number | null>(null);

  const primaryFilters = ['all', 'featured', 'fullstack', 'backend', 'cloud', 'mobile'];
  const industryFilters = ['agritech', 'edtech', 'geology tech'];
  
  const getFilteredProjects = () => {
    let list = projectsData;
    if (filter === 'featured') {
      list = projectsData.filter(project => project.isFeatured);
    } else if (filter !== 'all') {
      list = projectsData.filter(project => 
        project.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
      );
    }
    return limit ? list.slice(0, limit) : list;
  };

  const filteredProjects = getFilteredProjects();

  return (
    <section id="projects" className="py-16 relative">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center space-y-3 mb-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono glass-tag text-portfolio-blue">
            <Cpu size={14} />
            FEATURED ARCHITECTURE CASE STUDIES
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
            System Design & Production Work
          </h2>
          <p className="text-sm md:text-base text-[var(--text-secondary)] max-w-2xl mx-auto">
            Interactive deep-dives into high-concurrency dispatch engines, offline-first data platforms, and cloud micro-services.
          </p>
        </motion.div>
        
        {/* Filter Buttons */}
        {!limit && (
          <motion.div 
            className="flex flex-col items-center gap-3 mt-6 mb-12"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex flex-wrap justify-center gap-2.5">
              {primaryFilters.map((f) => (
                <Button 
                  key={f} 
                  variant="outline"
                  size="sm"
                  onClick={() => setFilter(f)}
                  className={cn(
                    "capitalize rounded-full transition-all duration-300 text-xs px-4 py-1.5",
                    filter === f 
                      ? "bg-gradient-to-r from-portfolio-blue to-portfolio-purple text-white border-none shadow-[0_4px_16px_rgba(184,144,71,0.25)]" 
                      : "glass-tag hover:bg-white/10 text-[var(--text-secondary)]"
                  )}
                >
                  {f}
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-2.5">
              {industryFilters.map((f) => (
                <Button 
                  key={f} 
                  variant="outline"
                  size="sm"
                  onClick={() => setFilter(f)}
                  className={cn(
                    "capitalize rounded-full transition-all duration-300 text-xs px-4 py-1.5",
                    filter === f 
                      ? "bg-gradient-to-r from-portfolio-blue to-portfolio-purple text-white border-none shadow-[0_4px_16px_rgba(184,144,71,0.25)]" 
                      : "glass-tag hover:bg-white/10 text-[var(--text-muted)]"
                  )}
                >
                  {f}
                </Button>
              ))}
            </div>
          </motion.div>
        )}
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                onMouseEnter={() => setHoveredProjectId(project.id)}
                onMouseLeave={() => setHoveredProjectId(null)}
                className="glass-card p-6 card-hover flex flex-col justify-between h-full relative overflow-hidden group"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                {/* Watermark Logo */}
                {project.faviconDomain && (
                  <div className="absolute right-[-12px] bottom-[-12px] pointer-events-none z-0 select-none transition-transform duration-500 group-hover:scale-110">
                    <img 
                      src={`https://www.google.com/s2/favicons?sz=128&domain=${project.faviconDomain}`} 
                      alt="" 
                      className="w-24 h-24 object-contain opacity-[0.06] dark:opacity-[0.04] filter grayscale"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}

                {/* Floating On-Hover Preview Popover */}
                <AnimatePresence>
                  {hoveredProjectId === project.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 z-30 p-4 bg-[#0B0B0C]/95 backdrop-blur-md rounded-2xl flex flex-col justify-between border border-portfolio-blue/40 shadow-2xl"
                    >
                      {/* Top Bar with Direct Action Links */}
                      <div className="flex items-center justify-between font-mono text-xs text-[var(--text-secondary)] border-b border-border/40 pb-2">
                        <div className="flex items-center gap-1.5 text-portfolio-blue font-semibold truncate max-w-[170px]">
                          <Globe size={14} className="animate-pulse shrink-0" />
                          <span className="truncate">{project.faviconDomain || 'System Preview'}</span>
                        </div>
                        <div className="flex items-center gap-2 z-40">
                          {project.githubRepo && (
                            <a
                              href={project.githubRepo}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-1 rounded-lg glass-card text-[var(--text-primary)] hover:text-portfolio-blue transition-colors"
                              title="GitHub Repository"
                            >
                              <Github size={14} />
                            </a>
                          )}
                          {project.liveLink && (
                            <a
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-1 rounded-lg glass-card text-portfolio-blue hover:text-white transition-colors"
                              title="Open Live Link"
                            >
                              <ExternalLink size={14} />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Homepage Preview Container */}
                      <div className="relative flex-1 my-2 min-h-[140px]">
                        <LiveProjectPreviewImage project={project} />
                      </div>

                      {/* Bottom Action Bar */}
                      <div className="flex items-center gap-2 pt-1 z-40">
                        {project.detailPath ? (
                          <Link
                            to={project.detailPath}
                            onClick={(e) => e.stopPropagation()}
                            className="btn-gradient flex-1 py-1.5 text-xs flex items-center justify-center gap-1.5"
                          >
                            <Cpu size={14} />
                            View Case Study
                          </Link>
                        ) : project.architectureWhitepaper && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProject(project);
                            }}
                            className="btn-gradient flex-1 py-1.5 text-xs flex items-center justify-center gap-1.5"
                          >
                            <Cpu size={14} />
                            View Blueprint
                          </button>
                        )}
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-3 py-1.5 rounded-xl glass-card text-portfolio-blue hover:text-white text-xs font-mono flex items-center gap-1 border border-portfolio-blue/30"
                            title="Open Link"
                          >
                            {project.liveLink.includes('github.com') ? 'GitHub' : 'Live Site'} <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Clean Card Content */}
                <div className="relative z-10 flex flex-col justify-between h-full w-full">
                  <div>
                    <div className="flex justify-between items-start mb-3 gap-4">
                      <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-portfolio-blue transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex gap-2.5 text-[var(--text-muted)] shrink-0 relative z-40">
                        {project.githubRepo && (
                          <a 
                            href={project.githubRepo} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="hover:text-portfolio-blue transition-colors p-1"
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
                            onClick={(e) => e.stopPropagation()}
                            className="hover:text-portfolio-blue transition-colors p-1"
                            title="Live Production Link"
                          >
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="text-[var(--text-secondary)] text-sm mb-5 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="space-y-4 mt-auto">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="glass-tag text-[10px] px-2.5 py-0.5 font-mono text-[var(--text-secondary)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Architecture Whitepaper / Case Study CTA */}
                    {project.detailPath ? (
                      <Link
                        to={project.detailPath}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full py-2.5 px-4 rounded-xl glass-card hover:bg-portfolio-blue/10 text-portfolio-blue text-xs font-mono font-semibold transition-all flex items-center justify-between group/btn"
                      >
                        <span className="flex items-center gap-2">
                          <Cpu size={14} className="text-portfolio-blue" />
                          Case Study & Live Demo
                        </span>
                        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    ) : project.architectureWhitepaper && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                        className="w-full py-2.5 px-4 rounded-xl glass-card hover:bg-portfolio-blue/10 text-portfolio-blue text-xs font-mono font-semibold transition-all flex items-center justify-between group/btn"
                      >
                        <span className="flex items-center gap-2">
                          <Cpu size={14} className="text-portfolio-blue" />
                          System Design Blueprint & Whitepaper
                        </span>
                        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {/* Link to all projects when limited */}
        {limit && (
          <div className="text-center mt-10">
            <Link to="/projects">
              <Button variant="outline" className="glass-card text-[var(--text-primary)] hover:text-portfolio-blue font-mono text-xs px-6 py-2 rounded-xl inline-flex items-center gap-2">
                View All System Blueprints ({projectsData.length})
                <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
        )}
        
        {!limit && filteredProjects.length === 0 && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl text-[var(--text-muted)]">No architecture cases found matching this criteria.</p>
          </motion.div>
        )}
      </div>

      {/* Interactive Modal (Mounted cleanly via Portal) */}
      <ArchitectureModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Projects;
