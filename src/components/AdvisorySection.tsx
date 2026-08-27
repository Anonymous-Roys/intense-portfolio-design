import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ShieldCheck, ArrowRight, FileText } from 'lucide-react';
import AdvisoryModal from './AdvisoryModal';
import { Button } from '@/components/ui/button';

const AdvisorySection = () => {
  const [advisoryOpen, setAdvisoryOpen] = useState(false);

  return (
    <>
      <section className="py-20 relative overflow-hidden border-t border-border/40">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto p-8 sm:p-12 glass-card-strong text-center space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono glass-tag text-portfolio-blue">
              <ShieldCheck size={16} />
              SYSTEM DESIGN AUDITS & TECHNICAL CONSULTING
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
              Building Mission-Critical Systems or Scaling Infrastructure?
            </h2>

            <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              Book a targeted 30-minute system design audit, cloud architecture review, or technical advisory session for your enterprise or early-stage platform.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button
                onClick={() => setAdvisoryOpen(true)}
                className="btn-gradient text-sm py-3.5 px-8 flex items-center gap-2"
              >
                <Calendar size={18} />
                Book Architecture Advisory Call
                <ArrowRight size={16} />
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/Software_engineer.pdf';
                  link.download = 'Arhin_David_Kwabena_CV.pdf';
                  link.click();
                }}
                className="glass-card text-[var(--text-primary)] px-6 py-3.5 rounded-xl font-mono text-sm flex items-center gap-2"
              >
                <FileText size={18} />
                Download Technical CV
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <AdvisoryModal open={advisoryOpen} onClose={() => setAdvisoryOpen(false)} />
    </>
  );
};

export default AdvisorySection;
