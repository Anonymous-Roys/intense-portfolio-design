import { motion } from 'framer-motion';
import { Database, Bot, Cloud, Cpu, ArrowUpRight } from 'lucide-react';

const specs = [
  {
    icon: Database,
    title: "Multi-Tenant Isolation & RLS Scaling",
    subtitle: "PostgreSQL & Supabase Security",
    color: "text-portfolio-purple",
    points: [
      "Row-Level Security (RLS) policies enforcing zero cross-tenant leakage",
      "Dynamic tenant schema pools & connection proxying via PgBouncer",
      "Role-Based Access Control (RBAC) & fine-grained security claims"
    ]
  },
  {
    icon: Bot,
    title: "Agentic AI Pipelines & RAG Architectures",
    subtitle: "ReAct Loops & LangChain Orchestration",
    color: "text-portfolio-blue",
    points: [
      "Autonomous ReAct agent decision loops with multi-tool calling capabilities",
      "Retrieval-Augmented Generation (RAG) using pgvector embeddings",
      "Streaming SSE event channels for sub-second LLM response delivery"
    ]
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure & Container Orchestration",
    subtitle: "AWS / GCP Enterprise Systems",
    color: "text-portfolio-blue",
    points: [
      "AWS Solutions Architecture track (VPCs, ECS/EKS, API Gateway, S3, IAM)",
      "Dockerized micro-service deployments with automated CI/CD pipelines",
      "Edge worker functions & serverless event processing"
    ]
  },
  {
    icon: Cpu,
    title: "High-Throughput & Offline Sync Engines",
    subtitle: "Local-First & Distributed Persistence",
    color: "text-portfolio-purple",
    points: [
      "IndexedDB optimistic state engines with Service Worker background sync",
      "Conflict resolution protocols for asynchronous internet reconnects",
      "Sub-50ms query evaluation on bandwidth-constrained hardware"
    ]
  }
];

const TechnicalSpecs = () => {
  return (
    <section className="py-20 border-y border-border/40 relative">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center space-y-3 mb-14"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-mono uppercase tracking-widest text-portfolio-blue font-bold">
            ENGINEERING SPECS & CAPABILITIES
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
            Core Architectural Competencies
          </h2>
          <p className="text-sm md:text-base text-[var(--text-secondary)] max-w-2xl mx-auto">
            Deep technical standards engineered for enterprise scale, data integrity, and autonomous system execution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {specs.map((spec, idx) => {
            const Icon = spec.icon;
            return (
              <motion.div
                key={spec.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl glass-card hover:border-portfolio-blue/40 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl glass-tag text-portfolio-blue group-hover:scale-110 transition-transform">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-portfolio-blue transition-colors">
                        {spec.title}
                      </h3>
                      <p className="text-xs font-mono text-[var(--text-muted)]">
                        {spec.subtitle}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="text-[var(--text-muted)] group-hover:text-portfolio-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" size={20} />
                </div>

                <ul className="space-y-2.5 pt-2 border-t border-border/40 text-xs font-mono text-[var(--text-secondary)]">
                  {spec.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-portfolio-blue shrink-0 mt-1.5" />
                      <span className="leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechnicalSpecs;
