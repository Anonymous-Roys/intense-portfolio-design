import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Award, Calendar, Lightbulb, Users } from 'lucide-react';

type TimelineItem = {
  type: 'education' | 'work' | 'certification' | 'leadership' | 'award';
  title: string;
  org: string;
  period: string;
  description: string;
  skills?: string[];
  link?: string;
};

const timelineData: TimelineItem[] = [
  {
    type: 'work',
    title: 'Software Engineer',
    org: 'AngloGold Ashanti - Iduapriem Mine',
    period: '2025 – Present',
    description: 'Developing CoreTracking, a specialized geological tracking and automation mobile application for the Geological Department of the Iduapriem Mine to digitize geological workflows and mining operations logs.',
    skills: ['React Native', 'Geology Tech', 'Intelligent Reporting', 'Automation']
  },
  {
    type: 'leadership',
    title: 'President',
    org: 'Amalitech Coding Club, UMaT',
    period: 'Present',
    description: 'Leading workshops, coding hackathons, and mentoring peers in software engineering fundamentals.',
    skills: ['Leadership', 'Software Engineering', 'Mentoring']
  },
  {
    type: 'leadership',
    title: 'Deputy Project Manager',
    org: "ACSES'25 Administration",
    period: '2025',
    description: "Supported planning, resource allocation, and execution of ACSES '25 events and tech projects.",
    skills: ['Project Management', 'Coordination', 'Agile Planning']
  },
  {
    type: 'certification',
    title: 'Certified AWS Cloud Practitioner',
    org: 'Amazon Web Services (AWS)',
    period: 'Oct 2024 – Jan 2025',
    description: 'Foundational certification covering AWS cloud services, security controls, shared responsibility model, pricing models, and global infrastructure.',
    skills: ['AWS Cloud', 'SES / SNS', 'IAM', 'Cloud Security'],
    link: 'https://aws.amazon.com/'
  },
  {
    type: 'work',
    title: 'React Course Instructor & Open Source Lead',
    org: 'Ideation Axis',
    period: 'Sept 2024 – Dec 2024',
    description: 'Taught React.js, guided 20+ students, and coordinated open-source projects. Integrated frontend and backend systems, improving team expertise in API design and product lifecycles.',
    skills: ['React.js', 'API Integration', 'GitHub Workflows', 'Teaching']
  },
  {
    type: 'award',
    title: 'Regional Qualifier',
    org: 'Hult Prize Ghana 2025',
    period: '2025',
    description: 'Qualified in the Agritech Category for innovative, technology-driven solutions addressing sustainable food production challenges.',
    skills: ['Agritech', 'Product Pitching', 'Sustainable Tech']
  },
  {
    type: 'education',
    title: 'BSc Computer Science and Engineering',
    org: 'University of Phoenix (Arizona, USA)',
    period: 'Expected Sept 2026',
    description: 'Pursuing systems engineering, data structures, distributed systems design, and advanced software engineering principles online.',
    skills: ['Data Structures', 'Systems Design', 'Algorithms', 'Distributed Systems']
  },
  {
    type: 'certification',
    title: 'Google Project Management Certification',
    org: 'Coursera',
    period: 'Jan 2024 – June 2024',
    description: 'Professional training covering Agile, Scrum, risk management, project planning documentation, and stakeholder communications.',
    skills: ['Agile', 'Scrum', 'Risk Management', 'Stakeholder Communication']
  },
  {
    type: 'work',
    title: 'Frontend Development Tutor',
    org: 'Ideation Axis',
    period: 'May 2024 – June 2024',
    description: 'Mentored over 50 students in HTML, CSS, JavaScript, and modern frameworks (React and Vue.js). Provided personalized guidance to overcome coding roadblocks.',
    skills: ['HTML/CSS', 'JavaScript', 'React.js', 'Vue.js', 'Mentoring']
  },
  {
    type: 'award',
    title: 'Innovation & Career Fair Winner',
    org: 'University of Mines and Technology (UMaT)',
    period: '2023',
    description: 'Won 1st place at the UMaT Innovation & Career Fair for developing the Smagritrade WebApp, an agricultural trade platform supporting buyers and farmers.',
    skills: ['Smagritrade', 'Full-stack Dev', 'Product Innovation']
  },
  {
    type: 'work',
    title: 'Lead Developer',
    org: 'Ideation Axis',
    period: 'Jan 2023 – Sept 2024',
    description: 'Built core collaboration platform using React, Node.js, and MongoDB with real-time features (ideationaxis.com & thedthub.com). Developed the award-winning Smagritrade Buyer & Smagritrade Farmer portals.',
    skills: ['React.js', 'Node.js', 'MongoDB', 'Real-time Apps', 'System Design']
  },
  {
    type: 'work',
    title: 'Software Developer Intern',
    org: 'ImhoGen',
    period: 'Oct 2023 – Dec 2023',
    description: 'Kumasi, Ghana. Revamped company web platforms and optimized digital usability and search layouts.',
    skills: ['Web Optimization', 'Usability Testing', 'Technical Writing']
  },
  {
    type: 'certification',
    title: 'JavaScript Intermediate to Advanced Certification',
    org: 'Scaler',
    period: 'July 2022 – Sept 2022',
    description: 'Advanced studies in JavaScript closures, prototypical inheritance, event loops, async/await, and DOM manipulation principles.',
    skills: ['ES6+', 'Async JS', 'Closures', 'DOM Architecture']
  },
  {
    type: 'education',
    title: 'General Science',
    org: 'Obuasi Senior High School (Obuasi, Ghana)',
    period: 'Sept 2019 – Sept 2021',
    description: 'Secondary education specializing in Physics, Chemistry, Elective Mathematics, and foundational sciences.',
    skills: ['General Science', 'Mathematics', 'Problem Solving']
  }
];

const iconMap = {
  education: GraduationCap,
  work: Briefcase,
  certification: Award,
  leadership: Users,
  award: Lightbulb
};

const colorMap = {
  education: 'var(--portfolio-purple)',
  work: 'var(--portfolio-blue)',
  certification: 'var(--portfolio-green)',
  leadership: 'var(--portfolio-blue)',
  award: 'var(--portfolio-purple)'
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
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative pl-16"
                >
                  {/* Icon dot */}
                  <div
                    className="absolute left-3 w-7 h-7 rounded-full flex items-center justify-center border-2 z-10"
                    style={{ borderColor: color, background: 'var(--portfolio-dark)' }}
                  >
                    <Icon size={13} style={{ color }} />
                  </div>

                  <div className="glass-card p-5 group hover:border-portfolio-blue/40 transition-colors">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full capitalize"
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
