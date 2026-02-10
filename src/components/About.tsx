
import { motion } from 'framer-motion';
import { GraduationCap, Award, FileText } from 'lucide-react';

const About = () => {
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: i * 0.2,
        duration: 0.5
      }
    })
  };

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="section-title text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeInUpVariants}
            className="flex flex-col gap-6"
          >
            <div className="relative w-full max-w-md mx-auto">
              <img 
                src="/me.jpg" 
                alt="Arhin David Kwabena" 
                className="w-full rounded-lg shadow-2xl"
                loading="lazy"
              />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-portfolio-blue opacity-20 rounded-full blur-2xl"></div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-portfolio-blue">Who I am</h3>
              <p className="text-portfolio-light/80 mb-4">
                I'm a passionate fullstack developer with 3-4 years of experience in building web and mobile applications.
                My focus areas are JavaScript technologies, cloud infrastructure, and creating performant, accessible user experiences.
              </p>
              <p className="text-portfolio-light/80 mb-4">
                Currently pursuing a BSc. in Computer Science & Engineering at the University of Mines and Technology, Tarkwa, Ghana.
                I'm expected to graduate in October 2026.
              </p>
              <p className="text-portfolio-light/80">
                Beyond coding, I enjoy mentoring other developers, contributing to open source projects, and exploring new technologies
                to enhance my development toolkit.
              </p>
            </div>
          </motion.div>
          
          <div className="space-y-8">
            <motion.div 
              className="glass-card p-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={fadeInUpVariants}
            >
              <div className="flex items-center gap-4 mb-4">
                <GraduationCap className="text-portfolio-blue" size={24} />
                <h3 className="text-xl font-semibold">Education</h3>
              </div>
              <div>
                <h4 className="font-medium text-portfolio-light">BSc. Computer Science & Engineering</h4>
                <p className="text-portfolio-light/70">University of Mines and Technology, Tarkwa, Ghana</p>
                <p className="text-sm text-portfolio-light/60">Expected Graduation: October 2026</p>
              </div>
            </motion.div>

            <motion.div 
              className="glass-card p-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              variants={fadeInUpVariants}
            >
              <div className="flex items-center gap-4 mb-4">
                <Award className="text-portfolio-purple" size={24} />
                <h3 className="text-xl font-semibold">Certifications</h3>
              </div>
              <ul className="space-y-3">
                <li>
                  <h4 className="font-medium text-portfolio-light">AWS Cloud Practitioner</h4>
                  <p className="text-sm text-portfolio-light/60">Amazon Web Services</p>
                </li>
                <li>
                  <h4 className="font-medium text-portfolio-light">Google Project Management</h4>
                  <p className="text-sm text-portfolio-light/60">Google</p>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              className="glass-card p-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={3}
              variants={fadeInUpVariants}
            >
              <div className="flex items-center gap-4 mb-4">
                <FileText className="text-portfolio-green" size={24} />
                <h3 className="text-xl font-semibold">Achievements</h3>
              </div>
              <ul className="space-y-3">
                <li>
                  <h4 className="font-medium text-portfolio-light">Winner – 2023 Innovation & Career Fair (UMAT)</h4>
                  <p className="text-sm text-portfolio-light/60">Smagritrade Website</p>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-portfolio-dark to-transparent"></div>
    </section>
  );
};

export default About;
