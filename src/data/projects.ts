export interface ArchitectureWhitepaper {
  problemAndScale: string;
  architectureBlueprint: string;
  engineeringTradeoffs: string[];
  impactMetrics: string[];
  techStackBreakdown: { category: string; technologies: string[] }[];
}

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
  isWebApp?: boolean;
  architectureWhitepaper?: ArchitectureWhitepaper;
  /** When set, the project card links to a dedicated in-portfolio case study route instead of the quick-view modal. */
  detailPath?: string;
  client?: string;
}

export const projectsData: Project[] = [
  {
    id: 0,
    title: "ZeroDoc - Private Document Engine & ATS Matcher",
    description: "100% on-device document processing and ATS resume matching engine. Runs entirely inside the browser tab using WebAssembly & Web Workers with zero server data uploads.",
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=800&q=80",
    tags: ["Privacy-First", "WebAssembly", "TypeScript", "PDF Engine", "ATS Matcher", "Featured"],
    liveLink: "https://privacy-docs-suite.vercel.app/",
    githubRepo: "https://github.com/davidarhin/zerodoc",
    isFeatured: true,
    faviconDomain: "privacy-docs-suite.vercel.app",
    isWebApp: true,
    architectureWhitepaper: {
      problemAndScale: "Eliminating severe data privacy risks caused by cloud document processing tools that upload sensitive PII (resumes, contracts, financial records) to third-party servers.",
      architectureBlueprint: "Zero-Server Client-Side Engine: WebAssembly PDF parser executing in isolated Web Workers. Browser-native File System Access API & client-side vector cosine algorithms handle ATS keyword matching, PDF redaction, merge, split, and compression with 0 Bytes data egress.",
      engineeringTradeoffs: [
        "Offloaded PDF parsing, text extraction, and regex redaction to background Web Workers to maintain 60fps UI responsiveness.",
        "Implemented in-browser vector cosine matching for ATS resume scoring without invoking external LLM APIs.",
        "Leveraged browser Blob Memory and Stream APIs for instant zero-upload PDF merge, split, and compression operations."
      ],
      impactMetrics: [
        "100% local privacy compliance (0 Bytes cloud file egress)",
        "Sub-100ms in-browser ATS resume match scoring",
        "100% offline capability after initial web asset loading"
      ],
      techStackBreakdown: [
        { category: "Client Core Engine", technologies: ["TypeScript", "WebAssembly", "Web Workers"] },
        { category: "Document & PDF APIs", technologies: ["pdf-lib", "PDF.js", "File System Access API"] },
        { category: "Local Intelligence", technologies: ["Tf-Idf Vector Matcher", "Client Redaction Engine"] }
      ]
    }
  },
  {
    id: 1,
    title: "Empowered Nexus - Business & Micro-Cloud Platform",
    description: "AI-powered offline-first education and business platform bridging Africa's digital divide with LMS, digital marketplace, and micro-cloud technology.",
    image: "https://www.empowerednexus.com/assets/impact-tablet-learning-DWfrHaS5.webp",
    tags: ["React.js", "AI", "Offline-First", "EdTech", "Fullstack", "Featured"],
    liveLink: "https://empowerednexus.com/",
    githubRepo: "",
    isFeatured: true,
    faviconDomain: "empowerednexus.com",
    isWebApp: true,
    architectureWhitepaper: {
      problemAndScale: "Delivering interactive educational media, business workflows, and AI assistance in remote African regions with intermittent or zero internet bandwidth, requiring zero data loss and resilient local edge node synchronization.",
      architectureBlueprint: "Hybrid Offline-First Sync Architecture: React SPA + IndexedDB local persistence engine communicating with local Edge Micro-Clouds via Service Workers. Incremental delta sync feeds to Supabase PostgreSQL when uplink is re-established.",
      engineeringTradeoffs: [
        "Selected optimistic IndexedDB transaction logging over direct HTTP mutation to ensure 100% offline uptime.",
        "Implemented vector embeddings cached on edge devices for low-latency local AI query processing.",
        "Chose CRDT (Conflict-Free Replicated Data Types) for multi-device sync over heavy server-side locking."
      ],
      impactMetrics: [
        "100% operation continuity during full network outages",
        "Sub-50ms local data query response time from IndexedDB cache",
        "Zero transaction loss across over 5,000 offline learning sessions"
      ],
      techStackBreakdown: [
        { category: "Frontend Engine", technologies: ["React 18", "TypeScript", "Tailwind CSS", "IndexedDB"] },
        { category: "Cloud & Edge Sync", technologies: ["Supabase PostgreSQL", "Edge Functions", "Service Workers"] },
        { category: "AI Infrastructure", technologies: ["Local Vector Embeddings", "Streaming LLM API"] }
      ]
    }
  },
  {
    id: 2,
    title: "Westminster Chariots - High-Concurrency Dispatch Engine",
    description: "Premium online booking and fleet dispatch system for luxury chauffeur operations across DC, Maryland, and Virginia with automated driver assignment and zero-collision scheduling.",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
    tags: ["React.js", "FastAPI", "PostgreSQL", "Google Maps API", "Fullstack", "Featured"],
    liveLink: "https://www.westminsterchariots.com/",
    githubRepo: "",
    isFeatured: true,
    faviconDomain: "westminsterchariots.com",
    isWebApp: true,
    architectureWhitepaper: {
      problemAndScale: "Real-time multi-state dispatching across Washington D.C., Maryland, and Virginia requiring zero double-booking collisions, dynamic pricing calculations based on traffic geometry, and sub-second driver dispatch routing.",
      architectureBlueprint: "Event-Driven Fleet Architecture: React SPA frontend communicating with a high-concurrency Python FastAPI backend, PostgreSQL with row-level locks for slot reservation, and async background workers handling Twilio SMS/email alerts.",
      engineeringTradeoffs: [
        "Selected PostgreSQL explicit row-level locks over background polling to prevent concurrent reservation collisions under peak booking bursts.",
        "Used Redis pub/sub queue for background dispatch worker isolation instead of blocking HTTP handling threads.",
        "Integrated Google Distance Matrix API caching to minimize external API costs while maintaining live route precision."
      ],
      impactMetrics: [
        "Dispatch queue latency reduced to <180ms",
        "99.9% uptime across multi-state dispatch operations",
        "Zero scheduling collisions across thousands of executive bookings"
      ],
      techStackBreakdown: [
        { category: "Backend Microservices", technologies: ["Python FastAPI", "Celery", "Redis Queue"] },
        { category: "Data & Locking", technologies: ["PostgreSQL", "Row-Level Locking (FOR UPDATE)", "Alembic"] },
        { category: "Integrations", technologies: ["Google Distance Matrix API", "Stripe Connect", "Twilio API"] }
      ]
    }
  },
  {
    id: 3,
    title: "Smagritrade (SMA) - Agritech Marketplace Ecosystem",
    description: "Winner of the 2023 UMaT Innovation & Career Fair and Hult Prize 2025 Regional Qualifier. Multi-tenant supply chain platform connecting rural production with urban commercial demand.",
    image: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=800&q=80",
    tags: ["React.js", "Node.js", "MongoDB", "Android", "Agritech", "Featured"],
    liveLink: "https://smabuyer.vercel.app/",
    githubRepo: "https://github.com/Anonymous-Roys/Smagritrade",
    isFeatured: true,
    faviconDomain: "ideationaxis.com",
    isWebApp: true,
    architectureWhitepaper: {
      problemAndScale: "Bridging fragmented rural agricultural logistics with bulk urban buyers, requiring dual tenant workflows, SMS order fallback for non-smartphone farmers, and real-time inventory aggregation.",
      architectureBlueprint: "Multi-Tenant Marketplace Blueprint: Decoupled Web Buyer Portal & Mobile Farmer App communicating via Node.js API Gateway, MongoDB geo-spatial queries for produce location matching, and automated SMS fallback triggers.",
      engineeringTradeoffs: [
        "Implemented MongoDB 2DSphere indexes for fast proximity query evaluation across regional farms.",
        "Used optimistic inventory reservations to handle fluctuating bulk orders from institutional buyers.",
        "Decoupled buyer and seller auth schemas using JWT claims to enforce role-based access control."
      ],
      impactMetrics: [
        "1st Place Winner - 2023 UMaT Innovation & Career Fair",
        "Regional Qualifier - Hult Prize 2025",
        "Reduced farm-to-market dispatch delays by 40%"
      ],
      techStackBreakdown: [
        { category: "API Gateway & Services", technologies: ["Node.js", "Express.js", "JWT Auth"] },
        { category: "Databases & Geo", technologies: ["MongoDB Atlas", "2DSphere Spatial Indexing"] },
        { category: "Mobile & Web UI", technologies: ["React.js", "Android SDK", "Tailwind CSS"] }
      ]
    }
  },
  {
    id: 4,
    title: "CoreTracking Platform - AngloGold Ashanti (Iduapriem Mine)",
    description: "Specialized geological tracking and automation mobile application for AngloGold Ashanti's Iduapriem Mine, digitizing geological core sample workflows and real-time mine reporting.",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    tags: ["React Native", "TypeScript", "Geology Tech", "Real-time Tracking", "Mobile", "Featured"],
    liveLink: "",
    githubRepo: "",
    isFeatured: true,
    faviconDomain: "anglogoldashanti.com",
    isWebApp: false,
    architectureWhitepaper: {
      problemAndScale: "Eliminating manual paper logging errors and data latency in active open-pit gold mining operations where core drill samples move through assaying labs under harsh environmental conditions.",
      architectureBlueprint: "Mission-Critical Core Tracking System: Offline-first React Native mobile client with local SQLite store, Bluetooth barcode scanner integration, and automated synchronization to enterprise mine databases upon dock connectivity.",
      engineeringTradeoffs: [
        "Used SQLite embedded database with write-ahead logging (WAL) on mobile hardware to prevent corruption during unexpected tablet power loss.",
        "Implemented strict field-level schema validation to guarantee zero invalid core log entries.",
        "Engineered batch payload compression for rapid synchronization over mining site Wi-Fi nodes."
      ],
      impactMetrics: [
        "Saved an estimated 15+ weekly hours of manual geological data entry",
        "Eliminated core sample transcription error rate to 0%",
        "Adopted across active field geological operations at Iduapriem Mine"
      ],
      techStackBreakdown: [
        { category: "Mobile Client", technologies: ["React Native", "TypeScript", "SQLite WAL"] },
        { category: "Hardware Integration", technologies: ["Bluetooth Barcode Scanner SDK", "NFC Core Tagging"] },
        { category: "Enterprise Backend", technologies: ["RESTful Sync Engine", "PostgreSQL Core Vault"] }
      ]
    }
  },
  {
    id: 5,
    title: "Searchpoint GH - High-Performance Enterprise Index",
    description: "Dynamic online business index and IT consulting directory connecting technology, engineering, supply chains, and travel services for Ghanaian enterprises.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    tags: ["React.js", "Node.js", "Algolia", "Tailwind CSS", "Frontend", "Featured"],
    liveLink: "https://searchpointgh.vercel.app/",
    githubRepo: "",
    isFeatured: true,
    faviconDomain: "searchpointgh.vercel.app",
    isWebApp: true,
    architectureWhitepaper: {
      problemAndScale: "Indexing thousands of enterprise vendors and service profiles across multi-sector industries in Ghana with instant faceted search, zero-delay autocomplete, and verified vendor credential badges.",
      architectureBlueprint: "Search Indexing Pipeline: React SPA query layer connected to Algolia Search Engine indices, backed by a Node.js microservice syncing real-time vendor updates and analytical telemetry.",
      engineeringTradeoffs: [
        "Offloaded search processing to Algolia serverless edge nodes for sub-20ms instant query responses.",
        "Implemented client-side debounce and payload caching to minimize search API unit usage.",
        "Leveraged ISR (Incremental Static Regeneration) principles for static directory page rendering."
      ],
      impactMetrics: [
        "Sub-20ms search indexing response time",
        "Supported 50+ enterprise service classifications",
        "Enhanced local B2B discovery for IT and engineering firms"
      ],
      techStackBreakdown: [
        { category: "Search & Indexing", technologies: ["Algolia InstantSearch", "Faceted Filters"] },
        { category: "Frontend Framework", technologies: ["React.js", "TypeScript", "Tailwind CSS"] },
        { category: "Backend Services", technologies: ["Node.js", "Express", "Vercel Serverless"] }
      ]
    }
  },
  {
    id: 6,
    title: "The DT Hub - Multi-Tenant Authentication & Web Portal Engine",
    description: "Digital hub infrastructure supporting multiple online portals, providing modular systems and integrated single-sign-on authentication interfaces for sub-applications.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    tags: ["React.js", "Node.js", "Frontend", "Fullstack", "Infrastructure", "Featured"],
    liveLink: "https://thedthub.com",
    githubRepo: "",
    isFeatured: true,
    faviconDomain: "thedthub.com",
    isWebApp: true,
    architectureWhitepaper: {
      problemAndScale: "Centralizing authentication, tenant authorization, and asset management across an expanding portfolio of digital sub-applications without duplicating user stores or authentication services.",
      architectureBlueprint: "Modular SSO & Hub Architecture: Micro-frontend portal architecture with unified OAuth2 / JWT identity server issuing domain-scoped bearer tokens for sub-application delegation.",
      engineeringTradeoffs: [
        "Chose centralized JWT token issuer over distributed session stores to maintain low-latency authorization across isolated domains.",
        "Built modular UI iframe sandbox protocols to safely host legacy third-party tools within the main hub UI."
      ],
      impactMetrics: [
        "Unified authentication across 4+ digital sub-portals",
        "99.95% single-sign-on authorization reliability",
        "Reduced security maintenance overhead across web assets"
      ],
      techStackBreakdown: [
        { category: "Identity & Security", technologies: ["JWT Authorization", "OAuth2 Protocol", "Bcrypt Engine"] },
        { category: "Frontend Core", technologies: ["React.js", "Tailwind CSS", "Context API"] },
        { category: "Services", technologies: ["Node.js API Gateway", "Redis Session Cache"] }
      ]
    }
  },
  {
    id: 7,
    title: "Ideation Axis - Collaborative Project Workbench",
    description: "Collaborative brainstorming and project development environment facilitating team ideation, real-time board sync, and modular software planning.",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
    tags: ["React.js", "Node.js", "MySQL", "Fullstack", "Featured"],
    liveLink: "https://ideationaxis.com",
    githubRepo: "https://github.com/Anonymous-Roys/Ideation-axis",
    isFeatured: true,
    faviconDomain: "ideationaxis.com",
    isWebApp: true,
    architectureWhitepaper: {
      problemAndScale: "Enabling remote software development teams to brainstorm, map out architectural modules, and collaborate in real-time with zero state synchronization collisions.",
      architectureBlueprint: "Real-Time Collaboration Engine: React frontend connected to WebSocket server cluster handling dynamic board updates, backed by MySQL relational schema for workspace persistence.",
      engineeringTradeoffs: [
        "Used WebSocket binary frames for live cursor & board updates to reduce bandwidth overhead.",
        "Implemented MySQL transaction isolations for project state saving."
      ],
      impactMetrics: [
        "Real-time state sync latency <50ms",
        "Supported concurrent multi-user workspace editing"
      ],
      techStackBreakdown: [
        { category: "Real-Time Comms", technologies: ["WebSockets / Socket.io", "Event Emitter"] },
        { category: "Frontend", technologies: ["React.js", "Framer Motion", "Tailwind CSS"] },
        { category: "Persistence", technologies: ["MySQL", "Node.js Express API"] }
      ]
    }
  },
  {
    id: 9,
    title: "MPTI Chatbase - AI Admissions Assistant for Macpartners Training Institute",
    description: "AI chatbot plugin built for Macpartners Training Institute (MPTI): a WordPress widget backed by a Python NLP microservice and a live-synced knowledge base, fronted by \"Joe\" — a warm, concise admissions assistant that answers course, fee, and application questions around the clock.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    tags: ["WordPress", "Python", "FastAPI", "NLP", "AI Chatbot", "EdTech", "Client Work", "Featured"],
    liveLink: "https://www.mptigh.com/",
    githubRepo: "",
    isFeatured: true,
    faviconDomain: "mptigh.com",
    isWebApp: true,
    detailPath: "/projects/mpti-chatbase",
    client: "Macpartners Training Institute (MPTI)",
    architectureWhitepaper: {
      problemAndScale: "Macpartners Training Institute needed 24/7 first-line admissions support on mptigh.com — answering course, tuition, and application questions from prospective students around the clock without adding front-desk headcount, and without it feeling like a generic, scripted bot.",
      architectureBlueprint: "WordPress-Native AI Layer: a custom WordPress plugin renders a branded chat widget on mptigh.com that calls a dedicated Python (FastAPI/Hypercorn) microservice deployed on Render. The service periodically scrapes and indexes the live site into a lightweight knowledge base, runs intent classification and sentiment analysis on incoming messages, and forwards grounded prompts to a Groq-hosted Llama 3.1 model to draft the final, human-toned reply.",
      engineeringTradeoffs: [
        "Split the AI brain into a standalone Python microservice instead of PHP-only logic, so the NLP/LLM layer and the WordPress admin can be deployed, scaled, and redeployed independently.",
        "Used a scheduled content scraper with a 30-minute in-memory refresh instead of a full vector database, keeping hosting cost near-zero while the assistant's knowledge stays current with the live site.",
        "Added per-IP rate limiting plus a rule-based fallback responder so the widget degrades to instant, still-useful answers if the LLM call fails or a quota is hit, rather than surfacing an error to a prospective student."
      ],
      impactMetrics: [
        "Gives MPTI a 24/7 admissions responder without extra front-desk staff",
        "Knowledge base auto-refreshes from the live site every 30 minutes with zero manual retraining",
        "Rate-limited, cached architecture runs comfortably on a free-tier Render deployment"
      ],
      techStackBreakdown: [
        { category: "WordPress Plugin", technologies: ["PHP", "WordPress REST API", "Custom Admin Dashboard"] },
        { category: "AI Microservice", technologies: ["Python", "FastAPI", "Hypercorn", "Groq Llama 3.1 8B Instant"] },
        { category: "NLP & Ops", technologies: ["Intent Classification", "Sentiment Analysis", "Rate Limiting", "Render"] }
      ]
    }
  },
  {
    id: 8,
    title: "Girl Genius Foundation Portal",
    description: "Corporate portfolio for the Girl Genius Foundation, showcasing mission impact, community mentorship initiatives, and technical empowerment programs.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    tags: ["React.js", "Tailwind CSS", "Frontend"],
    liveLink: "https://girl-genius-foundation.vercel.app/",
    githubRepo: "",
    isFeatured: false,
    faviconDomain: "girl-genius-foundation.vercel.app",
    isWebApp: true
  }
];
