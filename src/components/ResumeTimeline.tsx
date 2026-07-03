import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Award, Calendar } from 'lucide-react';

type TimelineItem = {
  type: 'education' | 'work' | 'certification';
  title: string;
  org: string;
  period: string;
  description: string;
  skills?: string[];
};

const timelineData: TimelineItem[] = [
  {
    type: 'work',
    title: 'React Instructor',
    org: 'Ideation Axis',
    period: 'Sept 2024 – Dec 2024',
    description: 'Managed 16 mentees in an open-source project. Configured GitHub CI/CD workflows and API integrations.',
    skills: ['React', 'GitHub Workflows', 'REST APIs', 'Mentoring']
  },
  {
    type: 'work',
    title: 'Lead Developer',
    org: 'Ideation Axis',
    period: 'Jan 2023 – Sept 2024',
    description: 'Led full-stack frontend and backend development. Directed project development lifecycles with Agile frameworks.',
    skills: ['React', 'Node.js', 'MySQL', 'Project Management', 'Agile']
  },
  {
    type: 'work',
    title: 'Frontend Tutor',
    org: 'Ideation Axis',
    period: 'May 2024 – June 2024',
    description: 'Mentored and trained 50+ students in HTML, CSS, JavaScript, and modern React development.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React']
  },
  {
    type: 'certification',
    title: 'AWS Certified Cloud Practitioner',
    org: 'Amazon Web Services',
    period: '2024',
    description: 'Certified in foundational cloud computing architecture, core AWS services, security, compliance, and billing models.',
    skills: ['AWS', 'Cloud Architecture', 'IAM', 'VPC', 'EC2']
  },
  {
    type: 'work',
    title: 'Software Developer Intern',
    org: 'ImhoGen',
    period: 'Oct 2023 – Dec 2023',
    description: 'Assisted in web platform optimization, performed code refactoring, and drafted technical proposals.',
    skills: ['Web Optimization', 'Research', 'Technical Writing']
  },
  {
    type: 'education',
    title: 'Computer Science & Engineering',
    org: 'University',
    period: '2021 – Present',
    description: 'Currently pursuing software engineering, systems design, data structures, and distributed algorithms coursework.',
    skills: ['Data Structures', 'Algorithms', 'Systems Design']
  }
];

const iconMap = {
  education: GraduationCap,
  work: Briefcase,
  certification: Award,
};

const colorMap = {
  education: 'var(--portfolio-purple)',
  work: 'var(--portfolio-blue)',
  certification: 'var(--portfolio-green)',
};

const ResumeTimeline = () => {
  return (
    <section className="py-16 relative">
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
                  transition={{ duration: 0.5, delay: i * 0.1 }}
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
                        className="text-xs font-mono px-2.5 py-0.5 rounded-full"
                        style={{ color, background: `${color}10`, border: `1px solid ${color}20` }}
                      >
                        {item.type}
                      </span>
                      <span className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
                        <Calendar size={12} /> {item.period}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mt-2">{item.title}</h3>
                    <p className="text-sm font-medium text-portfolio-blue">{item.org}</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">{item.description}</p>
                    
                    {item.skills && item.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {item.skills.map((skill) => (
                          <span key={skill} className="glass-tag text-[10px] px-2.5 py-0.5 text-[var(--text-secondary)]">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
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
