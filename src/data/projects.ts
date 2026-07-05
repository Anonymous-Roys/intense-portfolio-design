export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveLink: string;
  githubRepo: string;
  isFeatured: boolean;
  faviconDomain?: string;
}

export const projectsData: Project[] = [
  {
    id: 0,
    title: "Empowered Nexus - Business Platform",
    description: "AI-powered offline-first education and business platform bridging Africa's digital divide with LMS, digital marketplace, and micro-cloud technology.",
    image: "https://www.empowerednexus.com/assets/impact-tablet-learning-DWfrHaS5.webp",
    tags: ["React.js", "AI", "Offline-First", "EdTech", "Fullstack", "Featured"],
    liveLink: "https://empowerednexus.com/",
    githubRepo: "",
    isFeatured: true,
    faviconDomain: "empowerednexus.com"
  },
  {
    id: 1,
    title: "Smagritrade (SMA) - Ecosystem",
    description: "Winner of the 2023 UMaT Innovation & Career Fair and Hult Prize Ghana 2025 Regional Qualifier. Architected separate workflows for buyers and farmers to bridge rural production with urban market demand.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    tags: ["React.js", "Node.js", "MongoDB", "Android", "Agritech", "Featured"],
    liveLink: "https://smabuyer.vercel.app/",
    githubRepo: "https://github.com/Anonymous-Roys/Smagritrade",
    isFeatured: true,
    faviconDomain: "ideationaxis.com"
  },
  {
    id: 2,
    title: "Searchpoint GH",
    description: "Dynamic online business index and IT consulting platform connecting technology, engineering, supply chains, and travel services for Ghanaian enterprises.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    tags: ["React.js", "Node.js", "Algolia", "Tailwind CSS", "Frontend", "Featured"],
    liveLink: "https://searchpointgh.vercel.app/",
    githubRepo: "",
    isFeatured: true,
    faviconDomain: "searchpointgh.vercel.app"
  },
  {
    id: 3,
    title: "Westminster Chariots",
    description: "Premium online booking and fleet dispatch system for a luxury private black car chauffeur service based in the Washington D.C. metropolitan area (Virginia, Maryland, and D.C.).",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    tags: ["React.js", "FastAPI", "PostgreSQL", "Google Maps API", "Fullstack", "Featured"],
    liveLink: "https://www.westminsterchariots.com/",
    githubRepo: "",
    isFeatured: true,
    faviconDomain: "westminsterchariots.com"
  },
  {
    id: 4,
    title: "CoreTracking Platform (AngloGold Ashanti - Iduapriem Mine)",
    description: "Specialized geological tracking and automation mobile application for the Geological Department of AngloGold Ashanti's Iduapriem Mine. The platform digitizes and optimizes geological data workflows with real-time tracking and intelligent reporting.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    tags: ["React Native", "TypeScript", "Geology Tech", "Real-time Tracking", "Mobile", "Featured"],
    liveLink: "",
    githubRepo: "",
    isFeatured: true,
    faviconDomain: "anglogoldashanti.com"
  },
  {
    id: 5,
    title: "The DT Hub",
    description: "Digital hub infrastructure supporting multiple online portals, providing modular systems and integrated authentication interfaces for sub-applications.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    tags: ["React.js", "Node.js", "Frontend", "Fullstack", "Infrastructure", "Featured"],
    liveLink: "https://thedthub.com",
    githubRepo: "",
    isFeatured: true,
    faviconDomain: "thedthub.com"
  },
  {
    id: 6,
    title: "Ideation Axis WebApp",
    description: "Collaborative brainstorming and project development environment facilitating team brainstorms and modular software planning.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    tags: ["React.js", "Node.js", "MySQL", "Fullstack", "Featured"],
    liveLink: "https://ideationaxis.com",
    githubRepo: "https://github.com/Anonymous-Roys/Ideation-axis",
    isFeatured: true,
    faviconDomain: "ideationaxis.com"
  },
  {
    id: 7,
    title: "Girl Genius Foundation",
    description: "Corporate portfolio for the Girl Genius Foundation, showcasing mission impact and community initiatives.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    tags: ["React.js", "Tailwind CSS", "Frontend"],
    liveLink: "https://girl-genius-foundation-54tb.vercel.app/",
    githubRepo: "",
    isFeatured: false,
    faviconDomain: "girl-genius-foundation-54tb.vercel.app"
  },
  {
    id: 8,
    title: "Intelligent Waste Management System (Smart Bin)",
    description: "Built an Intelligent Waste Management System MVP to optimize urban waste collection through smart sensor integration and real-time monitoring.",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    tags: ["IoT", "React.js", "Node.js", "Fullstack"],
    liveLink: "https://v0-smart-bin-mvp-build.vercel.app/",
    githubRepo: "",
    isFeatured: false,
    faviconDomain: "v0-smart-bin-mvp-build.vercel.app"
  },
  {
    id: 9,
    title: "Aquafix",
    description: "Engineered an ecosystem for monitoring fish ecosystems using IoT technology. Developed real-time data visualization dashboards to track water quality parameters and environmental health.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    tags: ["IoT", "React.js", "FastAPI", "Fullstack"],
    liveLink: "https://aquafix.vercel.app/",
    githubRepo: "",
    isFeatured: false,
    faviconDomain: "aquafix.vercel.app"
  },
  {
    id: 10,
    title: "Printing App Management System (In Progress)",
    description: "End-to-end printing shop management system with dynamic order workflows.",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    tags: ["React.js", "MongoDB", "Node.js", "System Design", "In Progress", "Fullstack"],
    liveLink: "https://fastprint-sage.vercel.app",
    githubRepo: "",
    isFeatured: false,
    faviconDomain: "fastprint-sage.vercel.app"
  },
  {
    id: 11,
    title: "EcommerceX",
    description: "Full-stack e-commerce app with secure transactions, product catalog, and administrator dashboards.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    tags: ["Next.js", "Prisma", "MongoDB", "Fullstack", "Featured"],
    liveLink: "",
    githubRepo: "https://github.com/Anonymous-Roys/techHaven",
    isFeatured: true,
    faviconDomain: "github.com"
  },
  {
    id: 12,
    title: "Confidential Financial Platform",
    description: "Secure, enterprise-grade financial mobile application built for workers and staff transactions at Bensco Susu Limited.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    tags: ["React Native", "Node.js", "PostgreSQL", "Mobile"],
    liveLink: "",
    githubRepo: "",
    isFeatured: false,
    faviconDomain: "github.com"
  },
  {
    id: 13,
    title: "React Native Food Delivery App",
    description: "Modern, high-performance cross-platform mobile application featuring real-time menu browsing, cart management, and secure checkouts.",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    tags: ["React Native", "TypeScript", "Redux Toolkit", "Mobile"],
    liveLink: "",
    githubRepo: "",
    isFeatured: false,
    faviconDomain: "github.com"
  },
  {
    id: 14,
    title: "AI Agents (Exploratory Work - In Progress)",
    description: "Experimenting with autonomous AI agents for task automation, research assistance, and building prototypes combining React frontends with Python backends.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    tags: ["Python", "LangChain", "OpenAI API", "AI Agents", "In Progress", "Fullstack", "Featured"],
    liveLink: "",
    githubRepo: "",
    isFeatured: true,
    faviconDomain: "openai.com"
  },
  {
    id: 15,
    title: "AWS Scheduled Email Cronjob",
    description: "Automated email notification systems using event-driven serverless architecture on AWS.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    tags: ["AWS Lambda", "SES", "CloudWatch", "Serverless", "Cloud"],
    liveLink: "",
    githubRepo: "https://github.com/Anonymous-Roys/AWS-Scheduled-Email-Cronjob",
    isFeatured: false,
    faviconDomain: "amazon.com"
  },
  {
    id: 16,
    title: "Containerized App Deployment",
    description: "Scalable, load-balanced container deployment and cloud hosting infrastructure.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    tags: ["AWS ECS", "Docker", "ELB", "DevOps", "Cloud"],
    liveLink: "",
    githubRepo: "https://github.com/Anonymous-Roys/Containerized-App-Deployment",
    isFeatured: false,
    faviconDomain: "docker.com"
  },
  {
    id: 17,
    title: "Banking Dashboard",
    description: "Secure financial dashboard tracking deposits, withdrawals, and account summaries.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    tags: ["Next.js", "PostgreSQL", "NextAuth.js", "Zod", "Fullstack"],
    liveLink: "",
    githubRepo: "https://github.com/Anonymous-Roys/Banking-Dashboard",
    isFeatured: false,
    faviconDomain: "github.com"
  },
  {
    id: 18,
    title: "Educ8Africa Job Showcase",
    description: "Job board application matching job opportunities across schools and educational programs in Africa.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    tags: ["React", "Tailwind CSS", "Job Portal", "Frontend"],
    liveLink: "",
    githubRepo: "https://github.com/Anonymous-Roys/Educ8Africa-Job-Showcase",
    isFeatured: false,
    faviconDomain: "github.com"
  },
  {
    id: 19,
    title: "CropCircle Open Source Project",
    description: "Open-source agricultural analytics tool mapping crop circles and farming soil data.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    tags: ["React", "Django", "MySQL", "Fullstack", "Agritech"],
    liveLink: "",
    githubRepo: "https://github.com/Anonymous-Roys/CropCircle-Open-Source-Project",
    isFeatured: false,
    faviconDomain: "github.com"
  }
];
