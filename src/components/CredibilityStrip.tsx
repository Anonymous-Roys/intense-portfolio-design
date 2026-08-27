import { motion } from 'framer-motion';
import { Cpu, Terminal, ShieldCheck, Database, Cloud } from 'lucide-react';

const badges = [
  { icon: ShieldCheck, title: "AWS Solutions Architect Track", desc: "VPCs, Serverless, IAM & K8s" },
  { icon: Cloud, title: "GCP & Multi-Cloud Systems", desc: "Kubernetes Engine & Cloud Run" },
  { icon: Terminal, title: "Autonomous AI Agent Loops", desc: "LangChain, ReAct & RAG Pipelines" },
  { icon: Database, title: "Multi-Tenant & RLS Scaling", desc: "PostgreSQL & Supabase Row Policies" },
  { icon: Cpu, title: "Offline-First Engine Architecture", desc: "IndexedDB Sync & Conflict Resolution" },
];

const CredibilityStrip = () => {
  return (
    <div className="w-full border-y border-border/40 py-6 my-6">
      <div className="container mx-auto px-4">
        <p className="text-xs font-mono uppercase tracking-widest text-center text-[var(--text-muted)] mb-4">
          Core Architectural Focus & Standards
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex items-start gap-3 p-3.5 rounded-xl glass-card hover:border-portfolio-blue/40 transition-all group"
              >
                <div className="p-2 rounded-lg glass-tag text-portfolio-blue group-hover:scale-110 transition-transform">
                  <Icon size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[var(--text-primary)] group-hover:text-portfolio-blue transition-colors leading-tight">
                    {badge.title}
                  </h4>
                  <p className="text-[11px] text-[var(--text-secondary)] mt-1 leading-snug">
                    {badge.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CredibilityStrip;
