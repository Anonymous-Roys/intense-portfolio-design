import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Terminal, ShieldCheck, Cpu, ArrowRight, FileText, Calendar } from 'lucide-react';
import { useState } from 'react';
import AdvisoryModal from './AdvisoryModal';

const Hero = () => {
  const [advisoryOpen, setAdvisoryOpen] = useState(false);

  return (
    <>
      <section 
        id="home" 
        className="relative min-h-[75vh] flex flex-col justify-center pt-24 pb-12 overflow-hidden border-b border-border/40"
        itemScope 
        itemType="https://schema.org/Person"
      >
        <div className="max-w-3xl z-10 space-y-5">
          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono glass-tag text-portfolio-blue border-portfolio-blue/30"
          >
            <span className="w-2 h-2 rounded-full bg-portfolio-blue animate-pulse" />
            CLOUD ARCHITECT // SYSTEMS ENGINEER
          </motion.div>

          {/* Name & Headline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-2"
          >
            <p className="text-xs font-mono text-portfolio-blue tracking-widest uppercase">
              <span itemProp="name">Arhin David Kwabena</span>
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
              Building Scalable Cloud Systems <br className="hidden sm:inline" />
              <span className="highlight-text bg-clip-text">
                & AI Infrastructure.
              </span>
            </h1>
          </motion.div>

          {/* Elevator Subheading */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base text-[var(--text-secondary)] max-w-xl leading-relaxed"
            itemProp="description"
          >
            Systems engineer designing multi-tenant cloud architectures (AWS/GCP), autonomous AI workflows, and resilient offline-first platforms.
          </motion.p>

          {/* Key Architectural Highlights */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-border/40 font-mono text-xs text-[var(--text-secondary)]"
          >
            <div className="flex items-center gap-2 p-2 rounded-xl glass-card">
              <Cpu className="w-4 h-4 text-portfolio-blue shrink-0" />
              <span>Multi-Tenant & RLS</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl glass-card">
              <Terminal className="w-4 h-4 text-portfolio-purple shrink-0" />
              <span>Autonomous AI Agents</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl glass-card">
              <ShieldCheck className="w-4 h-4 text-portfolio-blue shrink-0" />
              <span>AWS Cloud Track</span>
            </div>
          </motion.div>

          {/* Action CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <a href="#projects">
              <Button className="btn-gradient flex items-center gap-2 text-xs py-2 px-5">
                Explore Blueprints
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </a>

            <Button
              variant="outline"
              onClick={() => setAdvisoryOpen(true)}
              className="glass-card hover:bg-portfolio-blue/10 text-[var(--text-primary)] text-xs border-border/80 px-5 py-2 rounded-xl transition-all flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5 text-portfolio-blue" />
              Book Advisory
            </Button>

            <Button 
              variant="ghost" 
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-mono flex items-center gap-1.5 px-3"
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/Software_engineer.pdf';
                link.download = 'Arhin_David_Kwabena_CV.pdf';
                link.click();
              }}
            >
              <FileText className="w-3.5 h-3.5" />
              CV
            </Button>
          </motion.div>
        </div>
      </section>

      <AdvisoryModal open={advisoryOpen} onClose={() => setAdvisoryOpen(false)} />
    </>
  );
};

export default Hero;
