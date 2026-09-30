import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, ExternalLink, Cpu, Layers, ShieldCheck,
  CheckCircle2, GraduationCap, MapPin, Sparkles,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingOrb from '@/components/FloatingOrb';
import JoeChatDemo from '@/components/JoeChatDemo';
import { projectsData } from '@/data/projects';
import { usePageAnalytics } from '@/hooks/use-analytics';

const MptiChatbasePage = () => {
  usePageAnalytics();
  const project = projectsData.find((p) => p.detailPath === '/projects/mpti-chatbase');
  const wp = project?.architectureWhitepaper;

  if (!project || !wp) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[var(--portfolio-dark)] min-h-screen text-[var(--text-primary)] overflow-x-hidden relative"
    >
      <FloatingOrb color="var(--portfolio-blue)" size="400px" top="8%" right="-5%" speed={0.3} />
      <FloatingOrb color="var(--portfolio-purple)" size="300px" top="55%" left="-8%" speed={-0.2} />

      <Header />

      <main className="mx-auto max-w-4xl px-6 md:px-10 pt-24 pb-24">
        <Link to="/projects" className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-portfolio-blue transition-colors mb-8 text-sm">
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        {/* Hero */}
        <div className="space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono glass-tag text-portfolio-blue">
            <GraduationCap size={14} />
            CLIENT PROJECT · EDTECH AI
          </div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-[var(--text-primary)]">
            {project.title}
          </h1>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.map((tag) => (
              <span key={tag} className="glass-tag text-[10px] px-2.5 py-0.5 font-mono text-[var(--text-secondary)]">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Client credit strip */}
        <div className="glass-card p-4 sm:p-5 flex flex-wrap items-center gap-4 mb-10">
          <img
            src={`https://www.google.com/s2/favicons?sz=64&domain=${project.faviconDomain}`}
            alt="Macpartners Training Institute"
            className="w-10 h-10 rounded-lg object-contain bg-white/5 p-1.5 shrink-0"
            onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
          />
          <div className="flex-1 min-w-[180px]">
            <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">Built for</p>
            <p className="text-sm font-semibold text-[var(--text-primary)]">{project.client}</p>
          </div>
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gradient text-xs flex items-center gap-1.5 shrink-0"
          >
            Visit MPTI Website <ExternalLink size={14} />
          </a>
        </div>

        {/* Marketing MPTI section */}
        <section className="mb-12 p-5 sm:p-6 rounded-2xl glass-card space-y-3">
          <div className="flex items-center gap-2 text-portfolio-purple font-mono text-xs font-semibold uppercase tracking-wider">
            <MapPin size={16} />
            About Macpartners Training Institute
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Macpartners Training Institute (MPTI) is a technical and vocational training institute in Ghana, focused
            on giving students industry-ready skills in Computer Science, Engineering, Business Management, and
            hands-on vocational trades. MPTI runs multiple intake periods a year and pairs its programs with
            flexible payment plans and scholarship opportunities, making technical education more reachable for
            students across the country.
          </p>
          <a
            href="https://www.mptigh.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-portfolio-blue hover:underline"
          >
            mptigh.com <ExternalLink size={12} />
          </a>
        </section>

        {/* Case study breakdown */}
        <section className="space-y-8 mb-14">
          <div className="p-4 rounded-xl glass-card space-y-2">
            <div className="flex items-center gap-2 text-portfolio-purple font-mono text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-portfolio-purple" />
              01. Problem & Scale Constraints
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{wp.problemAndScale}</p>
          </div>

          <div className="p-4 rounded-xl glass-card space-y-3">
            <div className="flex items-center gap-2 text-portfolio-blue font-mono text-xs font-semibold uppercase tracking-wider">
              <Layers size={16} />
              02. System Architecture & Component Flow
            </div>
            <p className="text-sm text-[var(--text-primary)] leading-relaxed font-mono bg-black/20 dark:bg-white/5 p-3.5 rounded-lg border border-border/40 text-xs">
              {wp.architectureBlueprint}
            </p>
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
        </section>

        {/* Live demo */}
        <section className="space-y-4">
          <div className="text-center space-y-2 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono glass-tag text-portfolio-blue">
              <Sparkles size={14} />
              TRY IT YOURSELF
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">Meet Joe</h2>
            <p className="text-sm text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
              This is a live, working preview of the assistant persona I designed for MPTI — same grounding
              knowledge and tone, running here on the portfolio's own AI backend so you can try it right now.
            </p>
          </div>
          <JoeChatDemo />
        </section>
      </main>

      <Footer />
    </motion.div>
  );
};

export default MptiChatbasePage;
