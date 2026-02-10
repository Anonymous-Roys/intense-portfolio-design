
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const projectsData = [
  {
    id: 1,
    title: "Ideation Axis WebApp",
    description: "Idea collaboration platform with authentication system and seamless UI.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    tags: ["React.js", "Node.js", "MySQL", "Featured"],
    liveLink: "https://ideationaxis.com/",
    githubRepo: "https://github.com/Anonymous-Roys/Ideation-axis",
    isFeatured: true
  },
  {
    id: 2,
    title: "Smagritrade Website",
    description: "Award-winning website revolutionizing agriculture through technology.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    tags: ["React.js", "Node.js", "MongoDB", "Featured"],
    liveLink: "https://smagritrade.vercel.app/",
    githubRepo: "https://github.com/Anonymous-Roys/Smagritrade",
    isFeatured: true
  },
  {
    id: 3,
    title: "ECommerceX",
    description: "Secure, full-fledged e-commerce platform with integrated authentication & authorization.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    tags: ["Next.js", "Prisma", "MongoDB", "Featured"],
    liveLink: "https://ecommercex-rho.vercel.app/",
    githubRepo: "https://github.com/Anonymous-Roys/ECommerceX",
    isFeatured: true
  },
  {
    id: 4,
    title: "AWS Scheduled Email Cronjob",
    description: "Automated email notifications using event-driven execution with AWS services.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    tags: ["AWS Lambda", "SES", "CloudWatch", "Featured"],
    liveLink: "",
    githubRepo: "https://github.com/Anonymous-Roys/AWS-Scheduled-Email-Cronjob",
    isFeatured: true
  },
  {
    id: 5,
    title: "Containerized App Deployment",
    description: "Scalable, load-balanced cloud deployment architecture.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    tags: ["AWS ECS", "Docker", "ELB", "Featured"],
    liveLink: "",
    githubRepo: "https://github.com/Anonymous-Roys/Containerized-App-Deployment",
    isFeatured: true
  },
  {
    id: 6,
    title: "Printing App Management",
    description: "End-to-end printing shop management system.",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    tags: ["React.js", "MongoDB", "Node.js", "Featured"],
    liveLink: "",
    githubRepo: "https://github.com/Anonymous-Roys/Printing-App-Management",
    isFeatured: true
  },
  {
    id: 7,
    title: "Banking Dashboard",
    description: "Financial management dashboard with secure authentication.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    tags: ["Next.js", "PostgreSQL", "NextAuth.js", "Zod"],
    liveLink: "",
    githubRepo: "https://github.com/Anonymous-Roys/Banking-Dashboard",
    isFeatured: false
  },
  {
    id: 8,
    title: "Educ8Africa Job Showcase",
    description: "Platform to showcase job opportunities in education.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    tags: ["React", "Tailwind CSS"],
    liveLink: "",
    githubRepo: "https://github.com/Anonymous-Roys/Educ8Africa-Job-Showcase",
    isFeatured: false
  },
  {
    id: 9,
    title: "Fullstack E-commerce App",
    description: "Complete e-commerce solution with product management and checkout.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    tags: ["Django", "JavaScript", "HTML", "CSS"],
    liveLink: "",
    githubRepo: "https://github.com/Anonymous-Roys/Fullstack-E-commerce-App",
    isFeatured: false
  },
  {
    id: 10,
    title: "CropCircle Open Source Project",
    description: "Agricultural management platform for sustainable farming.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    tags: ["React", "Django", "MySQL"],
    liveLink: "",
    githubRepo: "https://github.com/Anonymous-Roys/CropCircle-Open-Source-Project",
    isFeatured: false
  }
];

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const filters = ['all', 'featured', 'frontend', 'backend', 'fullstack', 'cloud'];
  
  const getFilteredProjects = () => {
    if (filter === 'all') return projectsData;
    if (filter === 'featured') return projectsData.filter(project => project.isFeatured);
    return projectsData.filter(project => 
      project.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
    );
  };

  const filteredProjects = getFilteredProjects();

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="section-title text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mt-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {filters.map((f) => (
            <Button 
              key={f} 
              variant="outline"
              size="sm"
              onClick={() => setFilter(f)}
              className={cn(
                "border border-portfolio-light/20 capitalize",
                filter === f 
                  ? "bg-gradient-to-r from-portfolio-blue to-portfolio-purple text-white border-none" 
                  : "bg-transparent hover:bg-white/5"
              )}
            >
              {f}
            </Button>
          ))}
        </motion.div>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="glass-card overflow-hidden rounded-lg card-hover"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-portfolio-dark to-transparent opacity-80"></div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span 
                          key={tag} 
                          className="text-xs bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="text-xs bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                  <p className="text-portfolio-light/70 mb-6 h-14 line-clamp-2">{project.description}</p>
                  
                  <div className="flex gap-4">
                    {project.liveLink && (
                      <a 
                        href={project.liveLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-portfolio-light/70 hover:text-portfolio-blue transition-colors"
                      >
                        <Eye size={16} />
                        <span>Live Demo</span>
                      </a>
                    )}
                    
                    {project.githubRepo && (
                      <a 
                        href={project.githubRepo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-portfolio-light/70 hover:text-portfolio-purple transition-colors"
                      >
                        <Github size={16} />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {filteredProjects.length === 0 && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl text-portfolio-light/70">No projects found with this filter</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
