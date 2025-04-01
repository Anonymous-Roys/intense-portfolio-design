
import { motion } from 'framer-motion';
import { Briefcase, Users } from 'lucide-react';

const experienceItems = [
  {
    id: 1,
    title: "Lead Developer",
    company: "Ideation Axis",
    period: "Jan 2023 – Sept 2024",
    description: "Led frontend & backend development. Managed project lifecycle with Agile & Google PM Certification.",
    type: "work",
    skills: ["React", "Node.js", "MySQL", "Project Management"]
  },
  {
    id: 2,
    title: "Frontend Tutor",
    company: "Ideation Axis",
    period: "May 2024 – June 2024",
    description: "Trained 50+ students in HTML, CSS, JS, React.",
    type: "teaching",
    skills: ["HTML", "CSS", "JavaScript", "React", "Teaching"]
  },
  {
    id: 3,
    title: "React Instructor",
    company: "Ideation Axis",
    period: "Sept 2024 – Dec 2024",
    description: "Managed 16 mentees in an open-source project. Set up GitHub workflows, API integrations.",
    type: "teaching",
    skills: ["React", "GitHub", "API", "Mentoring"]
  },
  {
    id: 4,
    title: "Software Developer Intern",
    company: "ImhoGen",
    period: "Oct 2023 – Dec 2023",
    description: "Researched, optimized company website, proposal writing.",
    type: "work",
    skills: ["Web Development", "Research", "Technical Writing"]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-portfolio-dark/50 relative">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="section-title text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Experience
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-portfolio-blue/10 rounded-full">
                <Briefcase className="text-portfolio-blue" size={24} />
              </div>
              <h3 className="text-xl font-semibold">Work Experience</h3>
            </div>
            
            <div className="space-y-8">
              {experienceItems.filter(item => item.type === "work").map((item, index) => (
                <motion.div 
                  key={item.id} 
                  className="relative pl-8 border-l-2 border-portfolio-blue/20 pb-8 last:pb-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="absolute top-0 left-[-9px] w-4 h-4 rounded-full bg-portfolio-blue"></div>
                  <h4 className="text-lg font-medium text-portfolio-light">{item.title}</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-portfolio-blue">{item.company}</span>
                    <span className="text-portfolio-light/50 text-sm">•</span>
                    <span className="text-portfolio-light/50 text-sm">{item.period}</span>
                  </div>
                  <p className="text-portfolio-light/70 mb-3">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill) => (
                      <span 
                        key={skill} 
                        className="text-xs bg-portfolio-blue/10 text-portfolio-blue px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-portfolio-purple/10 rounded-full">
                <Users className="text-portfolio-purple" size={24} />
              </div>
              <h3 className="text-xl font-semibold">Mentorship & Teaching</h3>
            </div>
            
            <div className="space-y-8">
              {experienceItems.filter(item => item.type === "teaching").map((item, index) => (
                <motion.div 
                  key={item.id} 
                  className="relative pl-8 border-l-2 border-portfolio-purple/20 pb-8 last:pb-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="absolute top-0 left-[-9px] w-4 h-4 rounded-full bg-portfolio-purple"></div>
                  <h4 className="text-lg font-medium text-portfolio-light">{item.title}</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-portfolio-purple">{item.company}</span>
                    <span className="text-portfolio-light/50 text-sm">•</span>
                    <span className="text-portfolio-light/50 text-sm">{item.period}</span>
                  </div>
                  <p className="text-portfolio-light/70 mb-3">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill) => (
                      <span 
                        key={skill} 
                        className="text-xs bg-portfolio-purple/10 text-portfolio-purple px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-portfolio-dark to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-portfolio-dark to-transparent"></div>
    </section>
  );
};

export default Experience;
