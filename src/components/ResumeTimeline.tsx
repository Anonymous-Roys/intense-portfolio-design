import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Award, Calendar } from 'lucide-react';

type TimelineItem = {
  type: 'education' | 'work' | 'certification';
  title: string;
  org: string;
  period: string;
  description: string;
};

const timelineData: TimelineItem[] = [
  {
    type: 'certification',
    title: 'AWS Cloud Practitioner',
    org: 'Amazon Web Services',
    period: '2024',
    description: 'Certified in cloud concepts, AWS services, security, architecture, and pricing.',
  },
  {
    type: 'work',
    title: 'Fullstack Developer',
    org: 'Freelance / Open Source',
    period: '2023 – Present',
    description: 'Building scalable web apps with React, Node.js, and cloud infrastructure. Mentoring junior developers.',
  },
  {
    type: 'work',
    title: 'Software Engineering Intern',
    org: 'Tech Company',
    period: '2023',
    description: 'Developed features for production applications, participated in code reviews and agile sprints.',
  },
  {
    type: 'education',
    title: 'Computer Science',
    org: 'University',
    period: '2021 – Present',
    description: 'Studying computer science with focus on software engineering, data structures, and algorithms.',
  },
];

const iconMap = {
  education: GraduationCap,
  work: Briefcase,
  certification: Award,
};

const colorMap = {
  education: '#9b87f5',
  work: '#4BDFFF',
  certification: '#39FF14',
};

const ResumeTimeline = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.h2
          className="section-title text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          My Journey
        </motion.h2>

        <div className="relative mt-12">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-portfolio-blue via-portfolio-purple to-portfolio-green" />

          <div className="space-y-8">
            {timelineData.map((item, i) => {
              const Icon = iconMap[item.type];
              const color = colorMap[item.type];

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative pl-16"
                >
                  {/* Icon dot */}
                  <div
                    className="absolute left-3 w-7 h-7 rounded-full flex items-center justify-center border-2"
                    style={{ borderColor: color, background: 'var(--portfolio-dark)' }}
                  >
                    <Icon size={14} style={{ color }} />
                  </div>

                  <div className="glass-card p-5 group hover:border-portfolio-blue/40 transition-colors">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span
                        className="text-xs font-mono px-2 py-0.5 rounded-full"
                        style={{ color, background: `${color}15`, border: `1px solid ${color}30` }}
                      >
                        {item.type}
                      </span>
                      <span className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
                        <Calendar size={12} /> {item.period}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mt-2">{item.title}</h3>
                    <p className="text-sm text-portfolio-blue">{item.org}</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeTimeline;
