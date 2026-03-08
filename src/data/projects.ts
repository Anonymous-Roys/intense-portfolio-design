export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveLink: string;
  githubRepo: string;
  isFeatured: boolean;
}

export const projectsData: Project[] = [
  {
    id: 0,
    title: "EmpowerED Nexus",
    description: "AI-powered offline-first education platform bridging Africa's digital divide with LMS, digital marketplace, and micro-cloud technology.",
    image: "https://www.empowerednexus.com/assets/impact-tablet-learning-DWfrHaS5.webp",
    tags: ["React.js", "AI", "Offline-First", "EdTech", "Featured"],
    liveLink: "https://empowerednexus.com/",
    githubRepo: "",
    isFeatured: true
  },
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
