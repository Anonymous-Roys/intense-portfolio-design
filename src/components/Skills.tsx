
import { motion } from 'framer-motion';

const Skills = () => {
  const skillCategories = [
    {
      name: "Programming Languages",
      skills: [
        { name: "JavaScript (ES6+)", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "Python", level: 80 },
        { name: "Java", level: 75 },
        { name: "SQL", level: 85 },
        { name: "HTML/CSS", level: 95 }
      ]
    },
    {
      name: "Frontend",
      skills: [
        { name: "React.js", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "React Native", level: 80 },
        { name: "Tailwind CSS", level: 90 },
        { name: "Material UI", level: 75 },
        { name: "SASS/SCSS", level: 80 }
      ]
    },
    {
      name: "Backend",
      skills: [
        { name: "Node.js", level: 85 },
        { name: "Express.js", level: 85 },
        { name: "Django", level: 75 },
        { name: "REST APIs", level: 90 },
        { name: "GraphQL", level: 70 }
      ]
    },
    {
      name: "Database & ORM",
      skills: [
        { name: "MongoDB", level: 85 },
        { name: "MySQL", level: 80 },
        { name: "PostgreSQL", level: 75 },
        { name: "Prisma", level: 80 }
      ]
    },
    {
      name: "Cloud & DevOps",
      skills: [
        { name: "AWS", level: 80 },
        { name: "GCP", level: 70 },
        { name: "Docker", level: 75 },
        { name: "CI/CD", level: 80 }
      ]
    },
    {
      name: "Tools & Others",
      skills: [
        { name: "Git/GitHub", level: 90 },
        { name: "Figma", level: 75 },
        { name: "Postman", level: 85 },
        { name: "Agile/Scrum", level: 80 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 relative bg-portfolio-dark/50">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="section-title text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Skills & Technologies
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              className="glass-card p-6 h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-6 text-center text-portfolio-blue">
                {category.name}
              </h3>
              
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="text-portfolio-light/90">{skill.name}</span>
                      <span className="text-sm text-portfolio-light/60">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-portfolio-light/10 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-portfolio-blue to-portfolio-purple"
                        initial={{ width: "0%" }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: (categoryIndex * 0.1) + (skillIndex * 0.1) }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-portfolio-dark to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-portfolio-dark to-transparent"></div>
    </section>
  );
};

export default Skills;
