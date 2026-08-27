import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, CheckCircle2, Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface AdvisoryModalProps {
  open: boolean;
  onClose: () => void;
}

const AdvisoryModal = ({ open, onClose }: AdvisoryModalProps) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    systemScope: '',
    budgetTimeline: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.systemScope) {
      toast.error('Please complete all required fields.');
      return;
    }

    setLoading(true);
    try {
      const subject = `[Architecture Advisory Request] ${form.company ? form.company + ' - ' : ''}${form.name}`;
      const message = `Advisory Booking Details:
Company/Project: ${form.company || 'N/A'}
Scope & System Constraints: ${form.systemScope}
Budget & Timeline: ${form.budgetTimeline || 'Not specified'}
Contact Email: ${form.email}`;

      const { error } = await supabase.from('contact_messages').insert({
        name: form.name,
        email: form.email,
        subject: subject,
        message: message,
      });

      if (error) throw error;

      // Attempt edge function trigger
      supabase.functions.invoke('send-contact-email', {
        body: { name: form.name, email: form.email, subject, message },
      }).catch(() => {});

      toast.success('Advisory request submitted successfully! David will reply within 24 hours.');
      setForm({ name: '', email: '', company: '', systemScope: '', budgetTimeline: '' });
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Direct form submission issue. Launching email client...');
      window.location.href = `mailto:davidarhin2005@gmail.com?subject=Architecture Advisory Audit&body=Name: ${encodeURIComponent(form.name)}%0D%0ACompany: ${encodeURIComponent(form.company)}%0D%0ASystem Scope: ${encodeURIComponent(form.systemScope)}`;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl glass-card-strong p-6 sm:p-8 text-[var(--text-primary)]"
            style={{ background: 'var(--portfolio-dark)' }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg glass-card text-[var(--text-secondary)] hover:text-portfolio-blue transition-colors"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl glass-tag text-portfolio-blue">
                <Calendar size={22} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--text-primary)]">Book Architecture Advisory</h3>
                <p className="text-xs font-mono text-portfolio-blue">30-Min Technical Audit & System Design Session</p>
              </div>
            </div>

            <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
              Get targeted feedback on multi-tenant architecture, AWS/GCP cloud setup, offline sync reliability, or autonomous AI pipelines.
            </p>

            {/* Bullet Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-[var(--text-secondary)] mb-6 glass-card p-3 rounded-xl">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-portfolio-blue shrink-0" />
                <span>Cloud Cost & Scalability Audit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-portfolio-blue shrink-0" />
                <span>Multi-Tenant RLS Security</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-portfolio-purple shrink-0" />
                <span>Autonomous AI Agent Loops</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-portfolio-blue shrink-0" />
                <span>High-Throughput Offline Sync</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)] mb-1 block">Full Name *</label>
                  <Input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="glass-input text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)] mb-1 block">Work Email *</label>
                  <Input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="sarah@company.com"
                    className="glass-input text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)] mb-1 block">Company / Organization</label>
                  <Input
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="e.g. Nexus Tech"
                    className="glass-input text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)] mb-1 block">Target Timeline / Budget</label>
                  <Input
                    value={form.budgetTimeline}
                    onChange={(e) => setForm({ ...form, budgetTimeline: e.target.value })}
                    placeholder="e.g. Q3 Rollout / $5k-$20k"
                    className="glass-input text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[var(--text-secondary)] mb-1 block">System Scope & Architecture Bottlenecks *</label>
                <Textarea
                  required
                  value={form.systemScope}
                  onChange={(e) => setForm({ ...form, systemScope: e.target.value })}
                  placeholder="Describe your system requirements, infrastructure stack, performance targets, or scale bottlenecks..."
                  className="glass-input text-sm min-h-[90px]"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="btn-gradient flex-1 text-sm py-2.5"
                >
                  {loading ? 'Submitting...' : 'Request Advisory Session'}
                  <Send className="w-4 h-4 ml-2" />
                </Button>
                
                <a
                  href="mailto:davidarhin2005@gmail.com?subject=Architecture Advisory Inquiry"
                  className="p-2.5 rounded-xl glass-card text-[var(--text-secondary)] hover:text-portfolio-blue transition-colors"
                  title="Direct Email"
                >
                  <Mail size={18} />
                </a>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AdvisoryModal;
