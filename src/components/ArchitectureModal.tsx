import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, ShieldCheck, ExternalLink, Github, CheckCircle2, ArrowRight, Layers } from 'lucide-react';
import { Project } from '@/data/projects';

interface ArchitectureModalProps {
  project: Project | null;
  onClose: () => void;
}

const ArchitectureModal = ({ project, onClose }: ArchitectureModalProps) => {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project || !project.architectureWhitepaper) return null;
  const wp = project.architectureWhitepaper;

  const modalContent = (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl glass-card-strong p-6 sm:p-8 text-[var(--text-primary)] my-8 max-h-[85vh] overflow-y-auto shadow-2xl border border-border/80"
          style={{ background: 'var(--portfolio-dark)' }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl glass-card text-[var(--text-secondary)] hover:text-portfolio-blue transition-colors z-20"
            title="Close Modal"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="space-y-3 mb-6 pr-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono glass-tag text-portfolio-blue">
              <Cpu size={14} />
              SYSTEM DESIGN & ARCHITECTURE WHITEPAPER
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] leading-tight">
              {project.title}
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-3 mb-8 pb-6 border-b border-border/40">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient text-xs transition-all flex items-center gap-1.5"
              >
                Live Production Environment <ExternalLink size={14} />
              </a>
            )}
            {project.githubRepo && (
              <a
                href={project.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl glass-card text-[var(--text-secondary)] hover:text-portfolio-blue text-xs font-mono transition-all flex items-center gap-1.5"
              >
                GitHub Repository <Github size={14} />
              </a>
            )}
          </div>

          {/* 4-Part Case Study Breakdown */}
          <div className="space-y-8 font-sans">
            {/* 1. Problem & Scale Constraints */}
            <div className="p-4 rounded-xl glass-card space-y-2">
              <div className="flex items-center gap-2 text-portfolio-purple font-mono text-xs font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-portfolio-purple" />
                01. Problem & Scale Constraints
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {wp.problemAndScale}
              </p>
            </div>

            {/* 2. System Architecture Blueprint */}
            <div className="p-4 rounded-xl glass-card space-y-3">
              <div className="flex items-center gap-2 text-portfolio-blue font-mono text-xs font-semibold uppercase tracking-wider">
                <Layers size={16} />
                02. System Architecture & Component Flow
              </div>
              <p className="text-sm text-[var(--text-primary)] leading-relaxed font-mono bg-black/20 dark:bg-white/5 p-3.5 rounded-lg border border-border/40 text-xs">
                {wp.architectureBlueprint}
              </p>

              {/* Tech Stack Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {wp.techStackBreakdown.map((sec) => (
                  <div key={sec.category} className="p-3 rounded-lg glass-tag">
                    <h5 className="text-[11px] font-mono font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                      {sec.category}
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {sec.technologies.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded text-[11px] font-mono bg-portfolio-blue/10 text-portfolio-blue border border-portfolio-blue/20">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Key Engineering Trade-offs */}
            <div className="p-4 rounded-xl glass-card space-y-3">
              <div className="flex items-center gap-2 text-portfolio-purple font-mono text-xs font-semibold uppercase tracking-wider">
                <ShieldCheck size={16} />
                03. Key Engineering Trade-offs
              </div>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                {wp.engineeringTradeoffs.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <ArrowRight className="w-4 h-4 text-portfolio-purple shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Impact Metrics */}
            <div className="p-4 rounded-xl glass-card space-y-3">
              <div className="flex items-center gap-2 text-portfolio-blue font-mono text-xs font-semibold uppercase tracking-wider">
                <CheckCircle2 size={16} />
                04. Verified Impact & System Metrics
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {wp.impactMetrics.map((metric, idx) => (
                  <div key={idx} className="p-3 rounded-lg glass-tag text-portfolio-blue text-xs font-medium leading-snug">
                    ✓ {metric}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-border/40 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl glass-card text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-mono transition-colors"
            >
              Close Architecture View
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default ArchitectureModal;
