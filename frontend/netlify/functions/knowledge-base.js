// Bilgi Kütüphanesi - OstWindGroup AI
const knowledgeBase = {
  // Programlama Dilleri
  programmingLanguages: {
    javascript: {
      name: "JavaScript",
      description: "Web geliştirmenin temel taşı",
      features: ["Frontend", "Backend (Node.js)", "Mobil (React Native)", "Desktop (Electron)"],
      frameworks: ["React", "Vue", "Angular", "Express", "Next.js"],
      useCases: ["Web siteleri", "API geliştirme", "Mobil uygulamalar", "Sunucu uygulamaları"]
    },
    python: {
      name: "Python",
      description: "En popüler programlama dillerinden biri",
      features: ["Basit syntax", "Güçlü kütüphaneler", "Veri bilimi", "AI/ML"],
      frameworks: ["Django", "Flask", "FastAPI", "TensorFlow", "PyTorch"],
      useCases: ["Web geliştirme", "Veri analizi", "Yapay zeka", "Otomasyon"]
    },
    java: {
      name: "Java",
      description: "Kurumsal uygulamalar için ideal",
      features: ["Platform bağımsız", "Güvenli", "Ölçeklenebilir", "Çoklu thread"],
      frameworks: ["Spring", "Hibernate", "Struts", "JSF"],
      useCases: ["Kurumsal uygulamalar", "Android geliştirme", "Web servisleri"]
    },
    csharp: {
      name: "C#",
      description: "Microsoft ekosisteminin kalbi",
      features: ["Type-safe", "Güçlü IDE", "Cross-platform", "Modern syntax"],
      frameworks: [".NET Core", "ASP.NET", "Entity Framework", "Xamarin"],
      useCases: ["Windows uygulamaları", "Web API", "Mobil uygulamalar", "Oyun geliştirme"]
    }
  },

  // Web Teknolojileri
  webTechnologies: {
    frontend: {
      html: "Semantik HTML5 yapısı ve accessibility",
      css: "Modern CSS3, Flexbox, Grid, Animations",
      javascript: "ES6+, DOM manipulation, Async programming",
      frameworks: {
        react: "Component-based, Virtual DOM, Hooks",
        vue: "Progressive framework, Easy learning curve",
        angular: "Full-featured, TypeScript, Enterprise-ready"
      }
    },
    backend: {
      nodejs: "JavaScript runtime, NPM ecosystem",
      python: "Django, Flask, FastAPI frameworks",
      php: "Laravel, Symfony, WordPress",
      java: "Spring Boot, Enterprise solutions",
      databases: {
        sql: "MySQL, PostgreSQL, SQL Server",
        nosql: "MongoDB, Redis, Elasticsearch"
      }
    }
  },

  // Yapay Zeka ve Makine Öğrenmesi
  aiTechnologies: {
    machineLearning: {
      supervised: "Sınıflandırma ve regresyon problemleri",
      unsupervised: "Kümeleme ve boyut azaltma",
      reinforcement: "Ödül tabanlı öğrenme",
      frameworks: ["TensorFlow", "PyTorch", "Scikit-learn", "Keras"]
    },
    deepLearning: {
      neuralNetworks: "Çok katmanlı sinir ağları",
      cnn: "Görüntü işleme ve bilgisayarlı görü",
      rnn: "Sıralı veri ve doğal dil işleme",
      transformers: "Modern NLP modelleri (GPT, BERT)"
    },
    applications: {
      nlp: "Metin analizi, chatbot, çeviri",
      computerVision: "Görüntü tanıma, nesne tespiti",
      recommendation: "Öneri sistemleri, kişiselleştirme",
      automation: "İş süreçleri otomasyonu"
    }
  },

  // Tasarım Prensipleri
  designPrinciples: {
    ui: {
      principles: ["Kullanılabilirlik", "Tutarlılık", "Basitlik", "Görsel hiyerarşi"],
      elements: ["Renk", "Tipografi", "Boşluk", "Layout"],
      patterns: ["Navigation", "Forms", "Cards", "Modals"]
    },
    ux: {
      research: ["Kullanıcı araştırması", "Persona oluşturma", "Kullanıcı yolculuğu"],
      design: ["Wireframing", "Prototyping", "Usability testing"],
      metrics: ["Conversion rate", "Task completion", "User satisfaction"]
    }
  },

  // Proje Yönetimi
  projectManagement: {
    methodologies: {
      agile: "İteratif geliştirme, Scrum, Kanban",
      waterfall: "Sıralı aşamalar, detaylı planlama",
      devops: "Sürekli entegrasyon ve dağıtım"
    },
    tools: {
      planning: ["Jira", "Trello", "Asana", "Monday.com"],
      communication: ["Slack", "Microsoft Teams", "Discord"],
      versionControl: ["Git", "GitHub", "GitLab", "Bitbucket"]
    }
  }
};

// Yanıt Şablonları
const responseTemplates = {
  greeting: [
    "Merhaba! OstWindGroup AI asistanınıza hoş geldiniz. Size nasıl yardımcı olabilirim?",
    "Selam! Ben OstWindGroup AI asistanınızım. Hangi konuda bilgi almak istersiniz?",
    "Hoş geldiniz! Size en iyi şekilde yardımcı olmaya hazırım. Ne öğrenmek istersiniz?"
  ],
  
  howAreYou: [
    "Teşekkürler, iyiyim! Size nasıl yardımcı olabilirim? Hangi konuda bilgi almak istersiniz?",
    "Çok iyiyim, teşekkürler! OstWindGroup AI asistanınız olarak size hizmet vermeye hazırım. Ne öğrenmek istersiniz?",
    "Harika! Size yardımcı olmaktan mutluyum. Hangi teknoloji konusunda bilgi almak istersiniz?"
  ],
  
  capabilities: [
    "Size şu konularda yardımcı olabilirim:",
    "Uzman olduğum alanlar şunlar:",
    "Size destek verebileceğim konular:"
  ],
  
  detailed: [
    "Bu konuda detaylı bilgi verebilirim:",
    "Size bu konuda kapsamlı yardım sağlayabilirim:",
    "Bu alanda size rehberlik edebilirim:"
  ]
};

// Yardımcı Fonksiyonlar
const helpers = {
  getRandomTemplate: (templates) => {
    return templates[Math.floor(Math.random() * templates.length)];
  },
  
  formatList: (items, emoji = "•") => {
    return items.map(item => `${emoji} **${item}**`).join('\n');
  },
  
  createDetailedResponse: (title, description, features, frameworks, useCases) => {
    let response = `## ${title}\n\n${description}\n\n`;
    
    if (features) {
      response += `**Özellikler:**\n${helpers.formatList(features, "🔹")}\n\n`;
    }
    
    if (frameworks) {
      response += `**Popüler Framework'ler:**\n${helpers.formatList(frameworks, "⚡")}\n\n`;
    }
    
    if (useCases) {
      response += `**Kullanım Alanları:**\n${helpers.formatList(useCases, "🎯")}\n\n`;
    }
    
    response += "Bu konuda daha detaylı bilgi almak isterseniz, hangi özel alanında yardıma ihtiyacınız var?";
    
    return response;
  }
};

module.exports = {
  knowledgeBase,
  responseTemplates,
  helpers
};
