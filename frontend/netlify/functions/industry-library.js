// Sektör Bilgileri ve Trendler Kütüphanesi - OstWindGroup AI
const industryLibrary = {
  // Teknoloji Sektörleri
  sectors: {
    fintech: {
      description: "Finansal teknoloji sektörü",
      technologies: [
        "Blockchain ve kripto para",
        "Mobile payments",
        "Digital banking",
        "Insurtech",
        "Regtech",
        "Wealthtech"
      ],
      trends: [
        "Open banking",
        "AI-powered fraud detection",
        "Real-time payments",
        "Embedded finance",
        "Central bank digital currencies (CBDC)"
      ],
      companies: [
        "Stripe - Payment processing",
        "Square - Mobile payments",
        "Revolut - Digital banking",
        "Coinbase - Cryptocurrency exchange"
      ]
    },
    healthtech: {
      description: "Sağlık teknolojisi sektörü",
      technologies: [
        "Telemedicine",
        "Wearable devices",
        "AI diagnostics",
        "Electronic health records",
        "Digital therapeutics",
        "Precision medicine"
      ],
      trends: [
        "Remote patient monitoring",
        "AI-powered drug discovery",
        "Personalized medicine",
        "Mental health apps",
        "Surgical robotics"
      ],
      companies: [
        "Teladoc - Telemedicine",
        "Fitbit - Wearable devices",
        "23andMe - Genetic testing",
        "Babylon Health - AI diagnostics"
      ]
    },
    edtech: {
      description: "Eğitim teknolojisi sektörü",
      technologies: [
        "Online learning platforms",
        "Virtual reality (VR) education",
        "AI tutoring",
        "Learning management systems",
        "Gamification",
        "Adaptive learning"
      ],
      trends: [
        "Microlearning",
        "Social learning",
        "Competency-based education",
        "Lifelong learning",
        "Skills-based training"
      ],
      companies: [
        "Coursera - Online courses",
        "Khan Academy - Free education",
        "Duolingo - Language learning",
        "Udemy - Skill-based courses"
      ]
    },
    proptech: {
      description: "Emlak teknolojisi sektörü",
      technologies: [
        "Virtual property tours",
        "AI property valuation",
        "Smart home systems",
        "PropTech platforms",
        "Real estate analytics",
        "Digital mortgage processing"
      ],
      trends: [
        "PropTech integration",
        "Sustainable buildings",
        "Co-living spaces",
        "Real estate tokenization",
        "Smart cities"
      ],
      companies: [
        "Zillow - Real estate platform",
        "Airbnb - Short-term rentals",
        "WeWork - Co-working spaces",
        "Compass - Real estate brokerage"
      ]
    }
  },

  // Teknoloji Trendleri 2024-2025
  trends: {
    artificialIntelligence: {
      description: "Yapay zeka trendleri",
      current: [
        "Generative AI (ChatGPT, DALL-E)",
        "Large Language Models (LLMs)",
        "AI-powered automation",
        "Computer vision applications",
        "Natural language processing"
      ],
      emerging: [
        "Multimodal AI",
        "AI agents",
        "Edge AI",
        "Quantum machine learning",
        "Neuromorphic computing"
      ],
      applications: [
        "Content generation",
        "Code assistance",
        "Customer service",
        "Medical diagnosis",
        "Autonomous vehicles"
      ]
    },
    cloudComputing: {
      description: "Bulut bilişim trendleri",
      current: [
        "Multi-cloud strategies",
        "Serverless computing",
        "Container orchestration",
        "Edge computing",
        "Cloud-native applications"
      ],
      emerging: [
        "Quantum cloud computing",
        "Green cloud initiatives",
        "Cloud sustainability",
        "Distributed cloud",
        "Cloud gaming"
      ],
      providers: [
        "Amazon Web Services (AWS)",
        "Microsoft Azure",
        "Google Cloud Platform",
        "IBM Cloud",
        "Oracle Cloud"
      ]
    },
    cybersecurity: {
      description: "Siber güvenlik trendleri",
      current: [
        "Zero trust architecture",
        "AI-powered security",
        "Cloud security",
        "Identity and access management",
        "Threat intelligence"
      ],
      emerging: [
        "Quantum cryptography",
        "Homomorphic encryption",
        "AI security",
        "Supply chain security",
        "Privacy-preserving technologies"
      ],
      threats: [
        "Ransomware attacks",
        "Phishing campaigns",
        "Supply chain attacks",
        "IoT vulnerabilities",
        "Social engineering"
      ]
    },
    blockchain: {
      description: "Blockchain ve Web3 trendleri",
      current: [
        "DeFi (Decentralized Finance)",
        "NFTs (Non-Fungible Tokens)",
        "Smart contracts",
        "Cryptocurrency adoption",
        "Web3 applications"
      ],
      emerging: [
        "Layer 2 solutions",
        "Cross-chain interoperability",
        "Central bank digital currencies",
        "Green blockchain initiatives",
        "Metaverse integration"
      ],
      platforms: [
        "Ethereum",
        "Binance Smart Chain",
        "Polygon",
        "Solana",
        "Cardano"
      ]
    },
    iot: {
      description: "Nesnelerin interneti trendleri",
      current: [
        "Smart home devices",
        "Industrial IoT",
        "Wearable technology",
        "Connected vehicles",
        "Smart cities"
      ],
      emerging: [
        "5G IoT applications",
        "Edge AI in IoT",
        "Digital twins",
        "IoT security",
        "Sustainable IoT"
      ],
      applications: [
        "Smart agriculture",
        "Healthcare monitoring",
        "Supply chain tracking",
        "Energy management",
        "Environmental monitoring"
      ]
    }
  },

  // Gelişen Teknolojiler
  emergingTech: {
    quantumComputing: {
      description: "Kuantum bilgisayarlar",
      applications: [
        "Cryptography",
        "Drug discovery",
        "Financial modeling",
        "Optimization problems",
        "Machine learning"
      ],
      companies: [
        "IBM Quantum",
        "Google Quantum AI",
        "Microsoft Quantum",
        "IonQ",
        "Rigetti Computing"
      ],
      challenges: [
        "Quantum decoherence",
        "Error correction",
        "Scalability",
        "Cost",
        "Talent shortage"
      ]
    },
    augmentedReality: {
      description: "Artırılmış gerçeklik",
      applications: [
        "Gaming and entertainment",
        "Education and training",
        "Retail and e-commerce",
        "Healthcare",
        "Manufacturing"
      ],
      platforms: [
        "Apple ARKit",
        "Google ARCore",
        "Microsoft HoloLens",
        "Magic Leap",
        "Snapchat AR"
      ],
      trends: [
        "Web-based AR",
        "AR cloud",
        "Spatial computing",
        "AR glasses",
        "AR in social media"
      ]
    },
    robotics: {
      description: "Robotik teknolojiler",
      applications: [
        "Manufacturing automation",
        "Service robots",
        "Medical robotics",
        "Autonomous vehicles",
        "Space exploration"
      ],
      types: [
        "Industrial robots",
        "Service robots",
        "Humanoid robots",
        "Collaborative robots (cobots)",
        "Autonomous mobile robots"
      ],
      companies: [
        "Boston Dynamics",
        "Tesla",
        "ABB",
        "Fanuc",
        "Universal Robots"
      ]
    },
    biotechnology: {
      description: "Biyoteknoloji",
      applications: [
        "Gene therapy",
        "Synthetic biology",
        "Biopharmaceuticals",
        "Agricultural biotechnology",
        "Environmental biotechnology"
      ],
      trends: [
        "CRISPR gene editing",
        "Personalized medicine",
        "Biomarkers",
        "Regenerative medicine",
        "Bioinformatics"
      ],
      companies: [
        "Moderna",
        "BioNTech",
        "CRISPR Therapeutics",
        "Ginkgo Bioworks",
        "Illumina"
      ]
    }
  },

  // İş Modelleri ve Stratejiler
  businessModels: {
    saas: {
      description: "Software as a Service",
      characteristics: [
        "Subscription-based pricing",
        "Cloud-hosted",
        "Multi-tenant architecture",
        "Automatic updates",
        "Scalable infrastructure"
      ],
      examples: [
        "Salesforce - CRM",
        "Slack - Communication",
        "Zoom - Video conferencing",
        "Dropbox - File storage",
        "HubSpot - Marketing automation"
      ],
      benefits: [
        "Lower upfront costs",
        "Automatic updates",
        "Scalability",
        "Accessibility",
        "Reduced IT overhead"
      ]
    },
    platform: {
      description: "Platform iş modeli",
      characteristics: [
        "Two-sided marketplace",
        "Network effects",
        "API-first approach",
        "Ecosystem development",
        "Data monetization"
      ],
      examples: [
        "Amazon - E-commerce platform",
        "Uber - Transportation platform",
        "Airbnb - Accommodation platform",
        "App Store - Mobile app platform",
        "Facebook - Social platform"
      ],
      strategies: [
        "Build ecosystem",
        "Enable third-party developers",
        "Create network effects",
        "Monetize data",
        "Expand globally"
      ]
    },
    freemium: {
      description: "Freemium iş modeli",
      characteristics: [
        "Free basic version",
        "Premium paid features",
        "User acquisition focus",
        "Conversion optimization",
        "Viral growth"
      ],
      examples: [
        "Spotify - Music streaming",
        "LinkedIn - Professional network",
        "Dropbox - File storage",
        "Canva - Design tool",
        "Notion - Productivity tool"
      ],
      strategies: [
        "Limit free features",
        "Create upgrade incentives",
        "Focus on user engagement",
        "Implement usage limits",
        "Offer premium support"
      ]
    }
  },

  // Kariyer ve Beceriler
  careers: {
    softwareDevelopment: {
      roles: [
        "Frontend Developer",
        "Backend Developer",
        "Full-stack Developer",
        "Mobile Developer",
        "DevOps Engineer",
        "Software Architect"
      ],
      skills: [
        "Programming languages",
        "Frameworks and libraries",
        "Version control (Git)",
        "Testing and debugging",
        "Agile methodologies",
        "Problem solving"
      ],
      salary: {
        junior: "₺15,000 - ₺25,000",
        mid: "₺25,000 - ₺45,000",
        senior: "₺45,000 - ₺80,000",
        lead: "₺80,000+"
      }
    },
    dataScience: {
      roles: [
        "Data Scientist",
        "Data Analyst",
        "Machine Learning Engineer",
        "Data Engineer",
        "Business Intelligence Analyst",
        "Research Scientist"
      ],
      skills: [
        "Python/R programming",
        "Statistics and mathematics",
        "Machine learning algorithms",
        "Data visualization",
        "SQL and databases",
        "Domain knowledge"
      ],
      salary: {
        junior: "₺20,000 - ₺35,000",
        mid: "₺35,000 - ₺60,000",
        senior: "₺60,000 - ₺100,000",
        lead: "₺100,000+"
      }
    },
    cybersecurity: {
      roles: [
        "Security Analyst",
        "Penetration Tester",
        "Security Engineer",
        "CISO (Chief Information Security Officer)",
        "Incident Response Specialist",
        "Security Consultant"
      ],
      skills: [
        "Network security",
        "Vulnerability assessment",
        "Security tools and frameworks",
        "Risk management",
        "Compliance and regulations",
        "Incident response"
      ],
      salary: {
        junior: "₺18,000 - ₺30,000",
        mid: "₺30,000 - ₺55,000",
        senior: "₺55,000 - ₺90,000",
        lead: "₺90,000+"
      }
    },
    productManagement: {
      roles: [
        "Product Manager",
        "Product Owner",
        "Product Marketing Manager",
        "Technical Product Manager",
        "VP of Product",
        "Chief Product Officer"
      ],
      skills: [
        "Product strategy",
        "User research",
        "Data analysis",
        "Project management",
        "Stakeholder management",
        "Technical understanding"
      ],
      salary: {
        junior: "₺25,000 - ₺40,000",
        mid: "₺40,000 - ₺70,000",
        senior: "₺70,000 - ₺120,000",
        lead: "₺120,000+"
      }
    }
  }
};

module.exports = industryLibrary;
