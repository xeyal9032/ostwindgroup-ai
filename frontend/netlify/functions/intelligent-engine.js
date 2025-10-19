// Gelişmiş Yanıt Motoru - OstWindGroup AI
const { knowledgeBase, responseTemplates, helpers } = require('./knowledge-base');
const { programmingLibrary, designLibrary, aiLibrary, industryLibrary } = require('./libraries');
const { ukraineUniversities, facultyCodes, tuitionInfo, keywords } = require('./ukraine-universities');

class IntelligentResponseEngine {
  constructor() {
    this.contextHistory = [];
    this.userPreferences = {};
  }

  // Ana yanıt üretme fonksiyonu
  generateResponse(message, conversationId) {
    const lowerCaseMessage = message.toLowerCase();
    
    // Bağlam analizi
    const context = this.analyzeContext(lowerCaseMessage);
    
    // Yanıt üretme
    const response = this.createResponse(context, message);
    
    // Bağlam güncelleme
    this.updateContext(context, message);
    
    return response;
  }

  // Bağlam analizi
  analyzeContext(message) {
    const context = {
      intent: this.detectIntent(message),
      entities: this.extractEntities(message),
      sentiment: this.analyzeSentiment(message),
      complexity: this.assessComplexity(message),
      domain: this.identifyDomain(message)
    };
    
    return context;
  }

  // Niyet tespiti
  detectIntent(message) {
    const intents = {
      greeting: ['merhaba', 'selam', 'hello', 'hi', 'hey', 'nasılsın', 'nasilsin', 'nasıl gidiyor', 'nasıl gidiyor', 'iyi misin', 'iyi misin'],
      question: ['nasıl', 'neden', 'ne', 'hangi', 'kim', 'nerede', 'ne zaman', 'nedir', 'neler'],
      request: ['yardım', 'help', 'destek', 'bilgi', 'öğren', 'öğret', 'rehber'],
      comparison: ['fark', 'karşılaştır', 'hangisi', 'daha iyi', 'vs', 'versus'],
      explanation: ['açıkla', 'anlat', 'nedir', 'nasıl çalışır', 'detay', 'detaylı'],
      tutorial: ['nasıl yapılır', 'adım', 'rehber', 'öğret', 'tutorial', 'guide'],
      problem: ['sorun', 'hata', 'problem', 'çözüm', 'bug', 'error'],
      opinion: ['düşün', 'fikir', 'görüş', 'tavsiye', 'öner', 'ne düşünüyorsun']
    };

    for (const [intent, keywords] of Object.entries(intents)) {
      if (keywords.some(keyword => message.includes(keyword))) {
        return intent;
      }
    }
    
    return 'general';
  }

  // Varlık çıkarma
  extractEntities(message) {
    const entities = {
      technologies: [],
      languages: [],
      frameworks: [],
      concepts: []
    };

    // Teknoloji tespiti
    const techKeywords = {
      'javascript': ['javascript', 'js', 'node.js', 'nodejs', 'ecmascript'],
      'python': ['python', 'py', 'django', 'flask', 'fastapi'],
      'java': ['java', 'spring', 'hibernate', 'maven'],
      'csharp': ['c#', 'csharp', '.net', 'asp.net', 'entity framework'],
      'react': ['react', 'reactjs', 'jsx', 'hooks', 'redux'],
      'vue': ['vue', 'vuejs', 'vue.js', 'nuxt'],
      'angular': ['angular', 'typescript', 'rxjs'],
      'ai': ['yapay zeka', 'ai', 'artificial intelligence', 'machine learning', 'ml'],
      'web': ['web', 'website', 'frontend', 'backend', 'html', 'css'],
      'database': ['veritabanı', 'database', 'sql', 'mysql', 'postgresql', 'mongodb'],
      'mobile': ['mobil', 'mobile', 'android', 'ios', 'react native', 'flutter'],
      'cloud': ['bulut', 'cloud', 'aws', 'azure', 'google cloud', 'docker', 'kubernetes'],
      'security': ['güvenlik', 'security', 'cybersecurity', 'hacking', 'penetration testing'],
      'blockchain': ['blockchain', 'bitcoin', 'ethereum', 'cryptocurrency', 'kripto'],
      'data': ['veri', 'data', 'analytics', 'big data', 'data science', 'statistics']
    };

    for (const [tech, keywords] of Object.entries(techKeywords)) {
      if (keywords.some(keyword => message.includes(keyword))) {
        entities.technologies.push(tech);
      }
    }

    return entities;
  }

  // Duygu analizi
  analyzeSentiment(message) {
    const positiveWords = ['teşekkür', 'harika', 'mükemmel', 'güzel', 'iyi', 'başarılı'];
    const negativeWords = ['kötü', 'berbat', 'hata', 'sorun', 'problem', 'çalışmıyor'];
    
    const positiveCount = positiveWords.filter(word => message.includes(word)).length;
    const negativeCount = negativeWords.filter(word => message.includes(word)).length;
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  // Karmaşıklık değerlendirmesi
  assessComplexity(message) {
    const wordCount = message.split(' ').length;
    const hasQuestionWords = ['nasıl', 'neden', 'ne', 'hangi', 'kim'].some(word => message.includes(word));
    const hasTechnicalTerms = ['api', 'database', 'framework', 'algorithm'].some(term => message.includes(term));
    
    if (wordCount > 20 || hasTechnicalTerms) return 'high';
    if (wordCount > 10 || hasQuestionWords) return 'medium';
    return 'low';
  }

  // Domain tespiti
  identifyDomain(message) {
    const domains = {
      programming: ['kod', 'programlama', 'yazılım', 'developer', 'coding', 'javascript', 'python', 'java', 'c#', 'go', 'rust'],
      web: ['web', 'website', 'frontend', 'backend', 'html', 'css', 'react', 'vue', 'angular', 'node.js'],
      ai: ['yapay zeka', 'ai', 'machine learning', 'neural network', 'deep learning', 'nlp', 'computer vision'],
      design: ['tasarım', 'design', 'ui', 'ux', 'görsel', 'figma', 'sketch', 'prototype'],
      business: ['iş', 'business', 'proje', 'yönetim', 'strateji', 'startup', 'girişim'],
      education: ['öğren', 'eğitim', 'kurs', 'tutorial', 'rehber', 'öğretim'],
      career: ['kariyer', 'iş', 'maaş', 'pozisyon', 'cv', 'mülakat', 'beceri'],
      industry: ['sektör', 'fintech', 'healthtech', 'edtech', 'proptech', 'trend', 'teknoloji'],
      cloud: ['bulut', 'cloud', 'aws', 'azure', 'gcp', 'serverless', 'docker', 'kubernetes'],
      mobile: ['mobil', 'mobile', 'ios', 'android', 'flutter', 'react native', 'swift', 'kotlin'],
      data: ['veri', 'data', 'analiz', 'database', 'sql', 'nosql', 'big data', 'analytics'],
      security: ['güvenlik', 'security', 'cybersecurity', 'hack', 'penetration', 'vulnerability'],
      blockchain: ['blockchain', 'kripto', 'crypto', 'bitcoin', 'ethereum', 'web3', 'defi', 'nft'],
      ukraine: ['ukrayna', 'ukraine', 'xarkov', 'kharkiv', 'kiev', 'kyiv', 'üniversite', 'university', 'fakülte', 'faculty', 'təhsil', 'education', 'fhN', 'хпі', 'хнму', 'хнувс', 'хаі', 'мчс', 'politexnik', 'tib', 'med', 'aviasiya', 'aero', 'kosmik', 'space', 'biotexnologiya', 'biotechnology', 'mühəndislik', 'engineering', 'texniki', 'technical', 'milli', 'national', 'dövlət', 'state', 'biotexnologiya universitesi', 'biotexnologiya universiteti']
    };

      for (const [domain, keywords] of Object.entries(domains)) {
        if (keywords.some(keyword => message.includes(keyword))) {
          return domain;
        }
      }
      
      return 'general';
    }

  // Yanıt oluşturma
  createResponse(context, originalMessage) {
    const { intent, entities, sentiment, complexity, domain } = context;
    const lowerCaseMessage = originalMessage.toLowerCase();
    
    // Özel durumlar için hızlı yanıtlar
    if (lowerCaseMessage.includes('saat') && (lowerCaseMessage.includes('kaç') || lowerCaseMessage.includes('ne'))) {
      const now = new Date();
      const timeString = now.toLocaleTimeString('tr-TR');
      return `🕐 Şu an saat **${timeString}** (Türkiye saati)\n\nBaşka bir konuda yardıma ihtiyacınız var mı?`;
    }
    
    if (lowerCaseMessage.includes('tarih') || lowerCaseMessage.includes('bugün')) {
      const now = new Date();
      const dateString = now.toLocaleDateString('tr-TR', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      return `📅 Bugün **${dateString}**\n\nBaşka bir konuda yardıma ihtiyacınız var mı?`;
    }
    
    if (lowerCaseMessage.includes('teşekkür') || lowerCaseMessage.includes('sağol') || lowerCaseMessage.includes('thanks')) {
      return `😊 Rica ederim! Size yardımcı olabildiğim için mutluyum. Başka sorularınız varsa çekinmeden sorun!`;
    }
    
    if (lowerCaseMessage.includes('hoşçakal') || lowerCaseMessage.includes('görüşürüz') || lowerCaseMessage.includes('bye')) {
      return `👋 Hoşçakalın! Size yardımcı olabildiğim için mutluyum. Tekrar görüşmek üzere!`;
    }
    
    if (lowerCaseMessage.includes('nasılsın') || lowerCaseMessage.includes('nasilsin') || lowerCaseMessage.includes('nasıl gidiyor')) {
      return `😊 Teşekkürler, iyiyim! Size nasıl yardımcı olabilirim? Hangi konuda bilgi almak istersiniz?\n\nSize şu konularda yardımcı olabilirim:\n🤖 **Yapay Zeka & Makine Öğrenmesi**\n💻 **Programlama & Yazılım Geliştirme**\n🌐 **Web Geliştirme & Tasarım**\n📊 **Veri Analizi & Görselleştirme**\n🎨 **UI/UX Tasarım**\n💡 **Proje Yönetimi & Strateji**\n🇺🇦 **Ukrayna Üniversiteleri**\n\nHangi konuda detaylı bilgi almak istersiniz?`;
    }
    
    if (lowerCaseMessage.includes('merhaba') || lowerCaseMessage.includes('selam') || lowerCaseMessage.includes('hello')) {
      return `👋 Merhaba! OstWindGroup AI asistanınıza hoş geldiniz. Size nasıl yardımcı olabilirim?\n\nSize şu konularda yardımcı olabilirim:\n🤖 **Yapay Zeka & Makine Öğrenmesi**\n💻 **Programlama & Yazılım Geliştirme**\n🌐 **Web Geliştirme & Tasarım**\n📊 **Veri Analizi & Görselleştirme**\n🎨 **UI/UX Tasarım**\n💡 **Proje Yönetimi & Strateji**\n🇺🇦 **Ukrayna Üniversiteleri**\n\nHangi konuda bilgi almak istersiniz?`;
    }
    
    if (lowerCaseMessage.includes('ne yapabilirsin') || lowerCaseMessage.includes('ne yapa biliyon') || lowerCaseMessage.includes('yeteneklerin')) {
      return `🚀 Size şu konularda yardımcı olabilirim:\n\n🤖 **Yapay Zeka & Makine Öğrenmesi**\n• AI modelleri ve algoritmalar\n• Chatbot geliştirme\n• Veri analizi ve görselleştirme\n\n💻 **Kod Yazma & Programlama**\n• JavaScript, Python, Java, C#\n• Web geliştirme (React, Vue, Angular)\n• Mobil uygulama geliştirme\n• Veritabanı tasarımı\n\n🎨 **Tasarım & UI/UX**\n• Web ve mobil tasarım\n• Kullanıcı deneyimi optimizasyonu\n• Prototipleme ve wireframing\n\n📊 **Proje Yönetimi**\n• Proje planlama ve organizasyon\n• Teknik dokümantasyon\n• Test stratejileri\n\n🇺🇦 **Ukrayna Üniversiteleri**\n• Üniversite bilgileri ve fakülteler\n• Təhsil haqları ve şərtlər\n• Fakültə kodları ve açıqlamaları\n• Kariyer rehberliği\n\n💡 **İnovasyon & Fikirler**\n• Yeni proje fikirleri\n• Teknoloji trendleri\n• Çözüm önerileri\n\nHangi konuda detaylı bilgi almak istersiniz?`;
    }
    
    // Niyet bazlı yanıtlar
    switch (intent) {
      case 'greeting':
        return this.handleGreeting(sentiment);
      
      case 'question':
        return this.handleQuestion(entities, domain, complexity, originalMessage);
      
      case 'request':
        return this.handleRequest(entities, domain);
      
      case 'comparison':
        return this.handleComparison(entities);
      
      case 'explanation':
        return this.handleExplanation(entities, domain);
      
      case 'tutorial':
        return this.handleTutorial(entities, domain);
      
      case 'problem':
        return this.handleProblem(entities, domain);
      
      case 'opinion':
        return this.handleOpinion(entities, domain);
      
      default:
        return this.handleGeneral(entities, domain, complexity, originalMessage);
    }
  }

  // Selamlama yanıtları
  handleGreeting(sentiment) {
    const greetings = responseTemplates.greeting;
    let response = helpers.getRandomTemplate(greetings);
    
    // Özel durumlar için özel yanıtlar
    if (sentiment === 'positive') {
      response += "\n\nGörüyorum ki pozitif bir ruh halindesiniz! Size daha da iyi yardımcı olabilirim.";
    }
    
    response += "\n\nSize şu konularda yardımcı olabilirim:\n";
    response += "🤖 **Yapay Zeka & Makine Öğrenmesi**\n";
    response += "💻 **Programlama & Yazılım Geliştirme**\n";
    response += "🌐 **Web Geliştirme & Tasarım**\n";
    response += "📊 **Veri Analizi & Görselleştirme**\n";
    response += "🎨 **UI/UX Tasarım**\n";
    response += "💡 **Proje Yönetimi & Strateji**\n\n";
    response += "Hangi konuda bilgi almak istersiniz?";
    
    return response;
  }

  // Soru yanıtları
  handleQuestion(entities, domain, complexity, originalMessage = '') {
    if (entities.technologies.length > 0) {
      return this.generateTechnologyResponse(entities.technologies[0]);
    }
    
    if (domain === 'ukraine') {
      return this.generateUkraineResponse(entities, complexity, originalMessage);
    }
    
    if (domain !== 'general') {
      return this.generateDomainResponse(domain, complexity);
    }
    
    return "Bu konuda size yardımcı olabilirim! Hangi özel alanında bilgi almak istersiniz?";
  }

  // Teknoloji yanıtları
  generateTechnologyResponse(technology) {
    // Programlama dili kontrolü
    if (programmingLibrary[technology]) {
      const lib = programmingLibrary[technology];
      let response = `## ${technology.toUpperCase()} Programlama Dili\n\n`;
      
      // Temel konular
      if (lib.basics) {
        response += `### 🔹 Temel Konular\n`;
        for (const [topic, info] of Object.entries(lib.basics)) {
          response += `**${topic.charAt(0).toUpperCase() + topic.slice(1)}:** ${info.description}\n`;
          if (info.examples) {
            response += `\`\`\`${technology}\n${info.examples[0]}\n\`\`\`\n`;
          }
        }
      }
      
      // Gelişmiş konular
      if (lib.advanced) {
        response += `\n### ⚡ Gelişmiş Konular\n`;
        for (const [topic, info] of Object.entries(lib.advanced)) {
          response += `**${topic.charAt(0).toUpperCase() + topic.slice(1)}:** ${info.description}\n`;
        }
      }
      
      // Kütüphaneler
      if (lib.libraries) {
        response += `\n### 📚 Popüler Kütüphaneler\n`;
        for (const [category, libs] of Object.entries(lib.libraries)) {
          response += `**${category.charAt(0).toUpperCase() + category.slice(1)}:**\n`;
          libs.forEach(lib => response += `• ${lib}\n`);
        }
      }
      
      response += `\nBu konuda daha detaylı bilgi almak isterseniz, hangi özel alanında yardıma ihtiyacınız var?`;
      return response;
    }
    
    // Özel teknoloji yanıtları
    const techResponses = {
      'database': `## 🗄️ Veritabanı Teknolojileri\n\nVeritabanı konusunda size yardımcı olabilirim!\n\n### 📊 Popüler Veritabanları:\n• **MySQL** - Açık kaynak ilişkisel veritabanı\n• **PostgreSQL** - Gelişmiş özellikli ilişkisel veritabanı\n• **MongoDB** - NoSQL doküman veritabanı\n• **Redis** - Bellek içi veri deposu\n• **SQLite** - Hafif ilişkisel veritabanı\n\n### 🔧 Veritabanı Yönetimi:\n• **SQL** - Veritabanı sorgulama dili\n• **Indexing** - Performans optimizasyonu\n• **Normalization** - Veri normalleştirme\n• **ACID** - İşlem güvenliği\n\nHangi veritabanı teknolojisi hakkında detaylı bilgi almak istersiniz?`,
      
      'mobile': `## 📱 Mobil Uygulama Geliştirme\n\nMobil uygulama geliştirme konusunda size yardımcı olabilirim!\n\n### 🚀 Popüler Platformlar:\n• **React Native** - Cross-platform geliştirme\n• **Flutter** - Google'ın UI framework'ü\n• **Android** - Java/Kotlin ile geliştirme\n• **iOS** - Swift ile geliştirme\n• **Xamarin** - Microsoft'un cross-platform çözümü\n\n### 📋 Geliştirme Süreci:\n• **UI/UX Design** - Kullanıcı deneyimi tasarımı\n• **API Integration** - Backend entegrasyonu\n• **Testing** - Unit ve integration testleri\n• **Deployment** - App Store ve Google Play\n\nHangi mobil teknoloji hakkında detaylı bilgi almak istersiniz?`,
      
      'cloud': `## ☁️ Bulut Teknolojileri\n\nBulut teknolojileri konusunda size yardımcı olabilirim!\n\n### 🌐 Popüler Bulut Sağlayıcıları:\n• **AWS** - Amazon Web Services\n• **Azure** - Microsoft Azure\n• **Google Cloud** - Google Cloud Platform\n• **DigitalOcean** - Geliştirici dostu bulut\n\n### 🛠️ Bulut Araçları:\n• **Docker** - Konteyner teknolojisi\n• **Kubernetes** - Konteyner orkestrasyonu\n• **Terraform** - Infrastructure as Code\n• **CI/CD** - Sürekli entegrasyon ve dağıtım\n\nHangi bulut teknolojisi hakkında detaylı bilgi almak istersiniz?`,
      
      'security': `## 🔒 Siber Güvenlik\n\nSiber güvenlik konusunda size yardımcı olabilirim!\n\n### 🛡️ Güvenlik Alanları:\n• **Penetration Testing** - Penetrasyon testleri\n• **Vulnerability Assessment** - Zafiyet değerlendirmesi\n• **Network Security** - Ağ güvenliği\n• **Application Security** - Uygulama güvenliği\n• **Incident Response** - Olay müdahalesi\n\n### 🔧 Güvenlik Araçları:\n• **Nmap** - Ağ tarama\n• **Wireshark** - Ağ analizi\n• **Burp Suite** - Web güvenlik testi\n• **Metasploit** - Penetrasyon testi framework'ü\n\nHangi güvenlik konusu hakkında detaylı bilgi almak istersiniz?`,
      
      'blockchain': `## ⛓️ Blockchain ve Kripto\n\nBlockchain teknolojisi konusunda size yardımcı olabilirim!\n\n### 💰 Kripto Para Birimleri:\n• **Bitcoin** - İlk ve en büyük kripto para\n• **Ethereum** - Akıllı kontrat platformu\n• **Binance Coin** - Binance borsası token'ı\n• **Cardano** - Akademik yaklaşımlı blockchain\n\n### 🔧 Blockchain Teknolojileri:\n• **Smart Contracts** - Akıllı kontratlar\n• **DeFi** - Merkezi olmayan finans\n• **NFT** - Tokenize edilmiş varlıklar\n• **Web3** - Merkezi olmayan web\n\nHangi blockchain konusu hakkında detaylı bilgi almak istersiniz?`,
      
      'data': `## 📊 Veri Analizi ve Bilimi\n\nVeri analizi konusunda size yardımcı olabilirim!\n\n### 📈 Veri Analizi Araçları:\n• **Python** - Pandas, NumPy, Matplotlib\n• **R** - İstatistiksel analiz\n• **SQL** - Veritabanı sorgulama\n• **Excel** - Temel veri analizi\n• **Power BI** - İş zekası\n\n### 🔬 Veri Bilimi Konuları:\n• **Machine Learning** - Makine öğrenmesi\n• **Deep Learning** - Derin öğrenme\n• **Statistics** - İstatistik\n• **Data Visualization** - Veri görselleştirme\n• **Big Data** - Büyük veri\n\nHangi veri analizi konusu hakkında detaylı bilgi almak istersiniz?`
    };
    
    if (techResponses[technology]) {
      return techResponses[technology];
    }
    
    // Web teknolojisi kontrolü
    if (knowledgeBase.webTechnologies[technology]) {
      const techInfo = knowledgeBase.webTechnologies[technology];
      return helpers.createDetailedResponse(
        techInfo.name || technology,
        techInfo.description,
        techInfo.features,
        techInfo.frameworks,
        techInfo.useCases
      );
    }
    
    return `**${technology.toUpperCase()}** hakkında detaylı bilgi verebilirim. Bu teknoloji ile ilgili hangi özel konuda yardıma ihtiyacınız var?`;
  }

  // Domain yanıtları
  generateDomainResponse(domain, complexity) {
    const domainResponses = {
      programming: {
        low: this.generateProgrammingLowResponse(),
        medium: this.generateProgrammingMediumResponse(),
        high: this.generateProgrammingHighResponse()
      },
      web: {
        low: this.generateWebLowResponse(),
        medium: this.generateWebMediumResponse(),
        high: this.generateWebHighResponse()
      },
      ai: {
        low: this.generateAILowResponse(),
        medium: this.generateAIMediumResponse(),
        high: this.generateAIHighResponse()
      },
      design: {
        low: this.generateDesignLowResponse(),
        medium: this.generateDesignMediumResponse(),
        high: this.generateDesignHighResponse()
      },
      career: {
        low: this.generateCareerLowResponse(),
        medium: this.generateCareerMediumResponse(),
        high: this.generateCareerHighResponse()
      },
      industry: {
        low: this.generateIndustryLowResponse(),
        medium: this.generateIndustryMediumResponse(),
        high: this.generateIndustryHighResponse()
      },
      cloud: {
        low: this.generateCloudLowResponse(),
        medium: this.generateCloudMediumResponse(),
        high: this.generateCloudHighResponse()
      },
      mobile: {
        low: this.generateMobileLowResponse(),
        medium: this.generateMobileMediumResponse(),
        high: this.generateMobileHighResponse()
      },
      data: {
        low: this.generateDataLowResponse(),
        medium: this.generateDataMediumResponse(),
        high: this.generateDataHighResponse()
      },
      security: {
        low: this.generateSecurityLowResponse(),
        medium: this.generateSecurityMediumResponse(),
        high: this.generateSecurityHighResponse()
      },
      blockchain: {
        low: this.generateBlockchainLowResponse(),
        medium: this.generateBlockchainMediumResponse(),
        high: this.generateBlockchainHighResponse()
      },
      ukraine: {
        low: this.generateGeneralUkraineResponse('low'),
        medium: this.generateGeneralUkraineResponse('medium'),
        high: this.generateGeneralUkraineResponse('high')
      }
    };
    
    return domainResponses[domain]?.[complexity] || "Bu konuda size yardımcı olabilirim!";
  }

  // Programlama yanıtları
  generateProgrammingLowResponse() {
    return `## 💻 Programlama Dünyasına Hoş Geldiniz!

Programlama konusunda size yardımcı olabilirim! Hangi programlama dili ile başlamak istersiniz?

### 🚀 Popüler Başlangıç Dilleri:
• **JavaScript** - Web geliştirme için ideal
• **Python** - Basit syntax, güçlü kütüphaneler
• **Java** - Kurumsal uygulamalar için
• **C#** - Microsoft ekosistemi için

### 📚 Öğrenme Kaynakları:
• Temel syntax ve kavramlar
• Değişkenler ve veri tipleri
• Fonksiyonlar ve döngüler
• Hata ayıklama teknikleri

Hangi dili öğrenmek istersiniz? Size detaylı rehberlik edebilirim!`;
  }

  generateProgrammingMediumResponse() {
    return `## ⚡ Orta Seviye Programlama

Programlama konusunda detaylı bilgi verebilirim. Hangi teknoloji veya konsept hakkında bilgi almak istersiniz?

### 🔧 Gelişmiş Konular:
• **Object-Oriented Programming** - Sınıflar ve nesneler
• **Data Structures** - Diziler, listeler, hash tabloları
• **Algorithms** - Sıralama, arama algoritmaları
• **Design Patterns** - Yazılım tasarım desenleri

### 🛠️ Araçlar ve Framework'ler:
• **Version Control** - Git, GitHub
• **Testing** - Unit test, integration test
• **Debugging** - Hata ayıklama teknikleri
• **Performance** - Kod optimizasyonu

Hangi konuda detaylı bilgi almak istersiniz?`;
  }

  generateProgrammingHighResponse() {
    return `## 🎯 Gelişmiş Programlama

Gelişmiş programlama konularında size rehberlik edebilirim. Hangi özel alanda yardıma ihtiyacınız var?

### 🏗️ Mimari ve Tasarım:
• **System Design** - Büyük sistemlerin tasarımı
• **Microservices** - Servis odaklı mimari
• **Clean Architecture** - Temiz kod mimarisi
• **SOLID Principles** - Yazılım tasarım prensipleri

### 🚀 Performans ve Optimizasyon:
• **Algorithm Complexity** - Big O notasyonu
• **Memory Management** - Bellek yönetimi
• **Concurrency** - Paralel programlama
• **Profiling** - Performans analizi

### 🔒 Güvenlik ve Best Practices:
• **Security Patterns** - Güvenlik desenleri
• **Code Review** - Kod inceleme süreçleri
• **Documentation** - Teknik dokümantasyon
• **Maintenance** - Kod bakımı

Hangi özel konuda yardıma ihtiyacınız var?`;
  }

  // Web geliştirme yanıtları
  generateWebLowResponse() {
    return `## 🌐 Web Geliştirme Başlangıç

Web geliştirme konusunda size yardımcı olabilirim! Frontend mi backend mi öğrenmek istersiniz?

### 🎨 Frontend (Kullanıcı Arayüzü):
• **HTML** - Sayfa yapısı
• **CSS** - Stil ve tasarım
• **JavaScript** - Etkileşim ve dinamiklik
• **Responsive Design** - Mobil uyumlu tasarım

### ⚙️ Backend (Sunucu Tarafı):
• **Server-side Programming** - Sunucu programlama
• **Databases** - Veritabanı yönetimi
• **APIs** - Uygulama programlama arayüzleri
• **Authentication** - Kimlik doğrulama

### 🚀 Fullstack (Tam Stack):
• **End-to-end Development** - Baştan sona geliştirme
• **Deployment** - Yayınlama ve dağıtım
• **DevOps** - Geliştirme operasyonları

Hangi alanda başlamak istersiniz?`;
  }

  generateWebMediumResponse() {
    return `## ⚡ Orta Seviye Web Geliştirme

Web geliştirme konusunda detaylı bilgi verebilirim. Hangi teknoloji veya framework hakkında bilgi almak istersiniz?

### 🎨 Frontend Framework'ler:
• **React** - Component-based UI
• **Vue.js** - Progressive framework
• **Angular** - Full-featured framework
• **Svelte** - Compile-time optimization

### ⚙️ Backend Teknolojileri:
• **Node.js** - JavaScript runtime
• **Python** - Django, Flask, FastAPI
• **PHP** - Laravel, Symfony
• **Java** - Spring Boot

### 🗄️ Veritabanları:
• **SQL** - MySQL, PostgreSQL
• **NoSQL** - MongoDB, Redis
• **GraphQL** - Modern API query language

Hangi teknoloji hakkında detaylı bilgi almak istersiniz?`;
  }

  generateWebHighResponse() {
    return `## 🎯 Gelişmiş Web Geliştirme

Gelişmiş web geliştirme konularında size rehberlik edebilirim. Hangi özel alanda yardıma ihtiyacınız var?

### 🏗️ Mimari ve Ölçeklenebilirlik:
• **Microservices Architecture** - Mikroservis mimarisi
• **Serverless** - Sunucusuz mimari
• **CDN** - İçerik dağıtım ağı
• **Load Balancing** - Yük dengeleme

### 🚀 Performans Optimizasyonu:
• **Code Splitting** - Kod bölme
• **Lazy Loading** - Gecikmeli yükleme
• **Caching Strategies** - Önbellek stratejileri
• **Bundle Optimization** - Paket optimizasyonu

### 🔒 Güvenlik ve Best Practices:
• **OWASP Top 10** - Web güvenlik açıkları
• **HTTPS** - Güvenli iletişim
• **CORS** - Cross-origin resource sharing
• **Rate Limiting** - Hız sınırlama

Hangi özel konuda yardıma ihtiyacınız var?`;
  }

  // AI yanıtları
  generateAILowResponse() {
    return `## 🤖 Yapay Zeka Dünyasına Hoş Geldiniz!

Yapay zeka konusunda size yardımcı olabilirim! Hangi AI alanında bilgi almak istersiniz?

### 🧠 Temel AI Kavramları:
• **Machine Learning** - Makine öğrenmesi
• **Neural Networks** - Sinir ağları
• **Deep Learning** - Derin öğrenme
• **Natural Language Processing** - Doğal dil işleme

### 🎯 AI Uygulama Alanları:
• **Computer Vision** - Bilgisayarlı görü
• **Speech Recognition** - Konuşma tanıma
• **Recommendation Systems** - Öneri sistemleri
• **Chatbots** - Sohbet robotları

### 🛠️ Popüler AI Araçları:
• **TensorFlow** - Google'ın AI framework'ü
• **PyTorch** - Facebook'un AI framework'ü
• **Scikit-learn** - Python ML kütüphanesi
• **OpenAI** - GPT modelleri

Hangi konuda detaylı bilgi almak istersiniz?`;
  }

  generateAIMediumResponse() {
    return `## ⚡ Orta Seviye Yapay Zeka

Yapay zeka konusunda detaylı bilgi verebilirim. Makine öğrenmesi, derin öğrenme veya NLP hakkında bilgi almak ister misiniz?

### 🔬 Makine Öğrenmesi Türleri:
• **Supervised Learning** - Denetimli öğrenme
• **Unsupervised Learning** - Denetimsiz öğrenme
• **Reinforcement Learning** - Pekiştirmeli öğrenme
• **Semi-supervised Learning** - Yarı denetimli öğrenme

### 🧠 Derin Öğrenme Mimarileri:
• **CNN** - Evrişimli sinir ağları
• **RNN** - Tekrarlayan sinir ağları
• **LSTM** - Uzun kısa vadeli bellek
• **Transformer** - Dikkat mekanizması

### 📊 Veri Bilimi:
• **Data Preprocessing** - Veri ön işleme
• **Feature Engineering** - Özellik mühendisliği
• **Model Evaluation** - Model değerlendirme
• **Hyperparameter Tuning** - Hiperparametre ayarı

Hangi konuda detaylı bilgi almak istersiniz?`;
  }

  generateAIHighResponse() {
    return `## 🎯 Gelişmiş Yapay Zeka

Gelişmiş AI konularında size rehberlik edebilirim. Hangi özel model veya algoritma hakkında bilgi almak istersiniz?

### 🏗️ Gelişmiş AI Mimarileri:
• **GPT Models** - Generative Pre-trained Transformers
• **BERT** - Bidirectional Encoder Representations
• **Vision Transformers** - Görüntü işleme için transformer
• **GANs** - Generative Adversarial Networks

### 🔬 Araştırma Alanları:
• **Multimodal AI** - Çoklu modalite AI
• **Few-shot Learning** - Az örnekle öğrenme
• **Meta Learning** - Meta öğrenme
• **Neural Architecture Search** - Sinir ağı mimarisi arama

### 🚀 Production AI:
• **Model Deployment** - Model dağıtımı
• **MLOps** - Makine öğrenmesi operasyonları
• **Model Monitoring** - Model izleme
• **A/B Testing** - A/B testleri

Hangi özel konuda yardıma ihtiyacınız var?`;
  }

  // Tasarım yanıtları
  generateDesignLowResponse() {
    return `## 🎨 Tasarım Dünyasına Hoş Geldiniz!

Tasarım konusunda size yardımcı olabilirim! Hangi tasarım alanında bilgi almak istersiniz?

### 🖼️ Tasarım Türleri:
• **UI Design** - Kullanıcı arayüzü tasarımı
• **UX Design** - Kullanıcı deneyimi tasarımı
• **Graphic Design** - Grafik tasarım
• **Web Design** - Web tasarım

### 🎯 Tasarım Prensipleri:
• **Simplicity** - Basitlik
• **Consistency** - Tutarlılık
• **Hierarchy** - Hiyerarşi
• **Balance** - Denge

### 🛠️ Tasarım Araçları:
• **Figma** - Collaborative design
• **Adobe XD** - Prototyping
• **Sketch** - Mac design tool
• **InVision** - Design workflow

Hangi konuda detaylı bilgi almak istersiniz?`;
  }

  generateDesignMediumResponse() {
    return `## ⚡ Orta Seviye Tasarım

Tasarım konusunda detaylı bilgi verebilirim. Hangi tasarım konsepti hakkında bilgi almak istersiniz?

### 🎨 UI/UX Kavramları:
• **User Research** - Kullanıcı araştırması
• **Personas** - Kullanıcı profilleri
• **User Journey** - Kullanıcı yolculuğu
• **Wireframing** - Tel çerçeve

### 🎯 Tasarım Sistemleri:
• **Design Systems** - Tasarım sistemleri
• **Component Libraries** - Bileşen kütüphaneleri
• **Style Guides** - Stil rehberleri
• **Brand Guidelines** - Marka yönergeleri

### 📱 Responsive Design:
• **Mobile First** - Mobil öncelikli
• **Breakpoints** - Kırılma noktaları
• **Grid Systems** - Grid sistemleri
• **Flexible Layouts** - Esnek düzenler

Hangi konuda detaylı bilgi almak istersiniz?`;
  }

  generateDesignHighResponse() {
    return `## 🎯 Gelişmiş Tasarım

Gelişmiş tasarım konularında size rehberlik edebilirim. Hangi özel alanda yardıma ihtiyacınız var?

### 🏗️ Tasarım Mimarisi:
• **Information Architecture** - Bilgi mimarisi
• **Interaction Design** - Etkileşim tasarımı
• **Service Design** - Hizmet tasarımı
• **Design Thinking** - Tasarım düşüncesi

### 🚀 İleri Seviye Teknikler:
• **Micro-interactions** - Mikro etkileşimler
• **Animation Design** - Animasyon tasarımı
• **Accessibility** - Erişilebilirlik
• **Performance Design** - Performans tasarımı

### 🔬 Tasarım Araştırması:
• **Usability Testing** - Kullanılabilirlik testi
• **A/B Testing** - A/B testleri
• **Analytics** - Analitik
• **User Feedback** - Kullanıcı geri bildirimi

Hangi özel konuda yardıma ihtiyacınız var?`;
  }

  // Diğer yanıt türleri
  handleRequest(entities, domain) {
    return `Size yardımcı olmaktan mutluluk duyarım! ${domain} konusunda detaylı bilgi verebilirim. Hangi özel alanda yardıma ihtiyacınız var?`;
  }

  handleComparison(entities) {
    return "Karşılaştırma konusunda size yardımcı olabilirim! Hangi teknolojileri karşılaştırmak istersiniz?";
  }

  handleExplanation(entities, domain) {
    return `Bu konuyu detaylı olarak açıklayabilirim! ${domain} alanında size rehberlik edebilirim. Hangi özel konuda bilgi almak istersiniz?`;
  }

  handleTutorial(entities, domain) {
    return `Size adım adım rehberlik edebilirim! ${domain} konusunda detaylı tutorial verebilirim. Hangi konuda başlamak istersiniz?`;
  }

  handleProblem(entities, domain) {
    return `Sorununuzu çözmek için size yardımcı olabilirim! ${domain} alanında problem çözme konusunda deneyimliyim. Sorununuzu detaylandırabilir misiniz?`;
  }

  handleOpinion(entities, domain) {
    return `Bu konuda görüşümü paylaşabilirim! ${domain} alanında deneyimliyim ve size tavsiyelerde bulunabilirim. Hangi konuda görüş almak istersiniz?`;
  }

  handleGeneral(entities, domain, complexity, originalMessage) {
    const lowerCaseMessage = originalMessage.toLowerCase();
    
    // Teknoloji tespiti
    if (entities.technologies.length > 0) {
      return this.generateTechnologyResponse(entities.technologies[0]);
    }
    
    // Domain bazlı yanıtlar
    if (domain !== 'general') {
      return this.generateDomainResponse(domain, complexity);
    }
    
    // Özel durumlar için akıllı yanıtlar
    if (lowerCaseMessage.includes('yardım') || lowerCaseMessage.includes('help')) {
      return `🆘 Size yardımcı olmaya hazırım! Hangi konuda destek almak istersiniz?\n\nSize şu konularda yardımcı olabilirim:\n🤖 **Yapay Zeka & Makine Öğrenmesi**\n💻 **Programlama & Yazılım Geliştirme**\n🌐 **Web Geliştirme & Tasarım**\n📊 **Veri Analizi & Görselleştirme**\n🎨 **UI/UX Tasarım**\n💡 **Proje Yönetimi & Strateji**\n🇺🇦 **Ukrayna Üniversiteleri**\n\nHangi konuda detaylı bilgi almak istersiniz?`;
    }
    
    if (lowerCaseMessage.includes('bilgi') || lowerCaseMessage.includes('öğren')) {
      return `📚 Size bilgi verebilirim! Hangi konuda öğrenmek istersiniz?\n\nSize şu konularda detaylı bilgi verebilirim:\n🤖 **Yapay Zeka & Makine Öğrenmesi**\n💻 **Programlama & Yazılım Geliştirme**\n🌐 **Web Geliştirme & Tasarım**\n📊 **Veri Analizi & Görselleştirme**\n🎨 **UI/UX Tasarım**\n💡 **Proje Yönetimi & Strateji**\n🇺🇦 **Ukrayna Üniversiteleri**\n\nHangi konuda detaylı bilgi almak istersiniz?`;
    }
    
    if (lowerCaseMessage.includes('nasıl') || lowerCaseMessage.includes('neden') || lowerCaseMessage.includes('ne')) {
      return `🤔 Sorunuzu anlamaya çalışıyorum. Hangi konuda bilgi almak istersiniz?\n\nSize şu konularda yardımcı olabilirim:\n🤖 **Yapay Zeka & Makine Öğrenmesi**\n💻 **Programlama & Yazılım Geliştirme**\n🌐 **Web Geliştirme & Tasarım**\n📊 **Veri Analizi & Görselleştirme**\n🎨 **UI/UX Tasarım**\n💡 **Proje Yönetimi & Strateji**\n🇺🇦 **Ukrayna Üniversiteleri**\n\nSorunuzu daha spesifik hale getirebilir misiniz?`;
    }
    
    // Genel yanıt
    return `💬 "${originalMessage}" mesajınızı aldım. OstWindGroup AI asistanınız olarak size yardımcı olmaya hazırım.\n\nSize şu konularda yardımcı olabilirim:\n🤖 **Yapay Zeka & Makine Öğrenmesi**\n💻 **Programlama & Yazılım Geliştirme**\n🌐 **Web Geliştirme & Tasarım**\n📊 **Veri Analizi & Görselleştirme**\n🎨 **UI/UX Tasarım**\n💡 **Proje Yönetimi & Strateji**\n🇺🇦 **Ukrayna Üniversiteleri**\n\nHangi konuda bilgi almak istiyorsunuz?`;
  }

  // Kariyer yanıtları
  generateCareerLowResponse() {
    return `## 💼 Kariyer Rehberi

Kariyer konusunda size yardımcı olabilirim! Hangi alanda bilgi almak istersiniz?

### 🚀 Popüler Teknoloji Rolleri:
• **Software Developer** - Yazılım geliştirici
• **Data Scientist** - Veri bilimci
• **Product Manager** - Ürün yöneticisi
• **UX/UI Designer** - Tasarımcı
• **DevOps Engineer** - DevOps mühendisi
• **Cybersecurity Specialist** - Siber güvenlik uzmanı

### 📈 Kariyer Seviyeleri:
• **Junior** - 0-2 yıl deneyim
• **Mid-level** - 2-5 yıl deneyim
• **Senior** - 5+ yıl deneyim
• **Lead/Principal** - 8+ yıl deneyim

### 💰 Maaş Aralıkları (Türkiye):
• **Junior**: ₺15,000 - ₺30,000
• **Mid-level**: ₺30,000 - ₺60,000
• **Senior**: ₺60,000 - ₺120,000
• **Lead**: ₺120,000+

Hangi rol hakkında detaylı bilgi almak istersiniz?`;
  }

  generateCareerMediumResponse() {
    return `## ⚡ Orta Seviye Kariyer Bilgileri

Kariyer konusunda detaylı bilgi verebilirim. Hangi konuda bilgi almak istersiniz?

### 🎯 Kariyer Gelişimi:
• **Skill Development** - Beceri geliştirme
• **Networking** - Profesyonel ağ kurma
• **Certifications** - Sertifikalar
• **Portfolio Building** - Portföy oluşturma
• **Interview Preparation** - Mülakat hazırlığı

### 📊 Sektör Analizi:
• **Fintech** - Finansal teknoloji
• **Healthtech** - Sağlık teknolojisi
• **Edtech** - Eğitim teknolojisi
• **Proptech** - Emlak teknolojisi
• **E-commerce** - E-ticaret

### 🌍 Remote Work:
• **Remote-first companies** - Uzaktan çalışma şirketleri
• **Freelancing** - Serbest çalışma
• **Contract work** - Sözleşmeli çalışma
• **Global opportunities** - Küresel fırsatlar

Hangi konuda detaylı bilgi almak istersiniz?`;
  }

  generateCareerHighResponse() {
    return `## 🎯 Gelişmiş Kariyer Stratejileri

Gelişmiş kariyer konularında size rehberlik edebilirim. Hangi özel alanda yardıma ihtiyacınız var?

### 🏗️ Leadership ve Yönetim:
• **Technical Leadership** - Teknik liderlik
• **Team Management** - Takım yönetimi
• **Strategic Planning** - Stratejik planlama
• **Change Management** - Değişim yönetimi
• **Executive Presence** - Yönetici varlığı

### 💡 Entrepreneurship:
• **Startup Founding** - Startup kurma
• **Venture Capital** - Risk sermayesi
• **Business Development** - İş geliştirme
• **Product Strategy** - Ürün stratejisi
• **Market Analysis** - Pazar analizi

### 🌐 Global Career:
• **International Opportunities** - Uluslararası fırsatlar
• **Cultural Adaptation** - Kültürel uyum
• **Language Skills** - Dil becerileri
• **Cross-border Teams** - Sınır ötesi takımlar
• **Global Networking** - Küresel ağ kurma

Hangi özel konuda yardıma ihtiyacınız var?`;
  }

  // Sektör yanıtları
  generateIndustryLowResponse() {
    return `## 🏭 Teknoloji Sektörleri

Sektör konusunda size yardımcı olabilirim! Hangi sektör hakkında bilgi almak istersiniz?

### 🚀 Popüler Sektörler:
• **Fintech** - Finansal teknoloji
• **Healthtech** - Sağlık teknolojisi
• **Edtech** - Eğitim teknolojisi
• **Proptech** - Emlak teknolojisi
• **E-commerce** - E-ticaret
• **Gaming** - Oyun sektörü

### 💡 Trend Teknolojiler:
• **Artificial Intelligence** - Yapay zeka
• **Cloud Computing** - Bulut bilişim
• **Blockchain** - Blockchain teknolojisi
• **IoT** - Nesnelerin interneti
• **AR/VR** - Artırılmış/sanal gerçeklik

### 🏢 Şirket Türleri:
• **Startups** - Girişimler
• **Scale-ups** - Büyüyen şirketler
• **Corporates** - Kurumsal şirketler
• **Consultancies** - Danışmanlık firmaları

Hangi sektör hakkında detaylı bilgi almak istersiniz?`;
  }

  generateIndustryMediumResponse() {
    return `## ⚡ Orta Seviye Sektör Bilgileri

Sektör konusunda detaylı bilgi verebilirim. Hangi konuda bilgi almak istersiniz?

### 📊 Sektör Analizi:
• **Market Size** - Pazar büyüklüğü
• **Growth Rate** - Büyüme oranı
• **Key Players** - Ana oyuncular
• **Competitive Landscape** - Rekabet ortamı
• **Investment Trends** - Yatırım trendleri

### 🔍 Teknoloji Trendleri:
• **Emerging Technologies** - Gelişen teknolojiler
• **Adoption Rates** - Benimsenme oranları
• **Regulatory Environment** - Düzenleyici ortam
• **Consumer Behavior** - Tüketici davranışları

### 💼 İş Modelleri:
• **SaaS** - Software as a Service
• **Platform Economy** - Platform ekonomisi
• **Freemium** - Freemium modeli
• **Subscription** - Abonelik modeli
• **Marketplace** - Pazar yeri modeli

Hangi konuda detaylı bilgi almak istersiniz?`;
  }

  generateIndustryHighResponse() {
    return `## 🎯 Gelişmiş Sektör Stratejileri

Gelişmiş sektör konularında size rehberlik edebilirim. Hangi özel alanda yardıma ihtiyacınız var?

### 🏗️ Sektör Dönüşümü:
• **Digital Transformation** - Dijital dönüşüm
• **Disruptive Innovation** - Yıkıcı inovasyon
• **Market Disruption** - Pazar bozulması
• **Technology Adoption** - Teknoloji benimsenmesi
• **Regulatory Compliance** - Düzenleyici uyumluluk

### 📈 Investment ve Funding:
• **Venture Capital** - Risk sermayesi
• **Private Equity** - Özel sermaye
• **IPO Strategies** - Halka arz stratejileri
• **M&A Activities** - Birleşme ve satın alma
• **Due Diligence** - Ön araştırma

### 🌍 Global Markets:
• **Market Entry Strategies** - Pazar giriş stratejileri
• **Cross-border Expansion** - Sınır ötesi genişleme
• **Cultural Adaptation** - Kültürel uyum
• **Regulatory Differences** - Düzenleyici farklılıklar
• **Competitive Intelligence** - Rekabet istihbaratı

Hangi özel konuda yardıma ihtiyacınız var?`;
  }

  // Ukrayna üniversiteleri yanıtları
  generateUkraineResponse(entities, complexity, originalMessage = '') {
    const lowerCaseMessage = originalMessage.toLowerCase();
    
    // Spesifik üniversite arama
    for (const [universityName, universityInfo] of Object.entries(ukraineUniversities)) {
      const nameVariations = [
        universityName.toLowerCase(),
        universityInfo.ukrainianName?.toLowerCase(),
        universityInfo.shortName?.toLowerCase(),
        universityInfo.alternativeName?.toLowerCase()
      ].filter(Boolean);
      
      // Özel durumlar için ek kontroller
      if (lowerCaseMessage.includes('biotexnologiya') && universityName.includes('Biotexnologiya')) {
        return this.generateSpecificUniversityResponse(universityName, universityInfo, complexity);
      }
      
      if (nameVariations.some(name => lowerCaseMessage.includes(name))) {
        return this.generateSpecificUniversityResponse(universityName, universityInfo, complexity);
      }
    }
    
    // Fakülte kodu arama
    for (const [code, facultyName] of Object.entries(facultyCodes)) {
      if (lowerCaseMessage.includes(code) || lowerCaseMessage.includes(facultyName.toLowerCase())) {
        return this.generateFacultyResponse(code, facultyName, complexity);
      }
    }
    
    // Genel Ukrayna üniversiteleri yanıtı
    return this.generateGeneralUkraineResponse(complexity);
  }

  // Spesifik üniversite yanıtı
  generateSpecificUniversityResponse(universityName, universityInfo, complexity) {
    let response = `## 🎓 ${universityName}\n\n`;
    
    if (universityInfo.ukrainianName) {
      response += `**Ukraynca adı:** ${universityInfo.ukrainianName}\n\n`;
    }
    
    if (universityInfo.shortName) {
      response += `**Qısa adı:** ${universityInfo.shortName}\n\n`;
    }
    
    if (universityInfo.status) {
      response += `**Statusu:** ${universityInfo.status}\n`;
    }
    
    if (universityInfo.founded) {
      response += `**Yaranma tarixi:** ${universityInfo.founded}\n`;
    }
    
    if (universityInfo.accreditation) {
      response += `**Akkreditasiyası:** ${universityInfo.accreditation}\n`;
    }
    
    if (universityInfo.educationForms) {
      response += `**Təhsil forması:** ${universityInfo.educationForms.join(', ')}\n`;
    }
    
    if (universityInfo.degrees) {
      response += `**Təhsil mərhələləri:** ${universityInfo.degrees.join(', ')}\n`;
    }
    
    if (universityInfo.durationFullTime) {
      response += `**Təhsil müddəti əyani:** ${universityInfo.durationFullTime}\n`;
    }
    
    if (universityInfo.durationPartTime) {
      response += `**Təhsil müddəti qiyabi:** ${universityInfo.durationPartTime}\n\n`;
    }
    
    // Təhsil haqları
    if (universityInfo.tuitionFees) {
      response += `### 💰 Təhsil Haqları\n\n`;
      
      if (universityInfo.tuitionFees.bachelor) {
        response += `**Bakalavr:**\n`;
        if (universityInfo.tuitionFees.bachelor.fullTime) {
          response += `• Əyani təhsil:\n`;
          if (universityInfo.tuitionFees.bachelor.fullTime.russianUkrainian) {
            response += `  - Rus/Ukrayn dilində: ${universityInfo.tuitionFees.bachelor.fullTime.russianUkrainian}\n`;
          }
          if (universityInfo.tuitionFees.bachelor.fullTime.english) {
            response += `  - İngilis dilində: ${universityInfo.tuitionFees.bachelor.fullTime.english}\n`;
          }
        }
        if (universityInfo.tuitionFees.bachelor.partTime) {
          response += `• Qiyabi təhsil:\n`;
          if (universityInfo.tuitionFees.bachelor.partTime.russianUkrainian) {
            response += `  - Rus/Ukrayn dilində: ${universityInfo.tuitionFees.bachelor.partTime.russianUkrainian}\n`;
          }
          if (universityInfo.tuitionFees.bachelor.partTime.english) {
            response += `  - İngilis dilində: ${universityInfo.tuitionFees.bachelor.partTime.english}\n`;
          }
        }
        response += `\n`;
      }
      
      if (universityInfo.tuitionFees.master) {
        response += `**Magistr:**\n`;
        if (universityInfo.tuitionFees.master.fullTime) {
          response += `• Əyani təhsil:\n`;
          if (universityInfo.tuitionFees.master.fullTime.russianUkrainian) {
            response += `  - Rus/Ukrayn dilində: ${universityInfo.tuitionFees.master.fullTime.russianUkrainian}\n`;
          }
          if (universityInfo.tuitionFees.master.fullTime.english) {
            response += `  - İngilis dilində: ${universityInfo.tuitionFees.master.fullTime.english}\n`;
          }
        }
        if (universityInfo.tuitionFees.master.partTime) {
          response += `• Qiyabi təhsil:\n`;
          if (universityInfo.tuitionFees.master.partTime.russianUkrainian) {
            response += `  - Rus/Ukrayn dilində: ${universityInfo.tuitionFees.master.partTime.russianUkrainian}\n`;
          }
          if (universityInfo.tuitionFees.master.partTime.english) {
            response += `  - İngilis dilində: ${universityInfo.tuitionFees.master.partTime.english}\n`;
          }
        }
        response += `\n`;
      }
    }
    
    if (universityInfo.insurance) {
      response += `**Təhsil sığortası:** ${universityInfo.insurance}\n\n`;
    }
    
    // Fakültələr
    if (universityInfo.faculties && universityInfo.faculties.length > 0) {
      response += `### 📚 Fakültələr\n\n`;
      universityInfo.faculties.forEach(faculty => {
        response += `• ${faculty}\n`;
      });
      response += `\n`;
    }
    
    response += `Bu universitet haqqında daha ətraflı məlumat almaq istəyirsiniz?`;
    
    return response;
  }

  // Fakülte yanıtı
  generateFacultyResponse(code, facultyName, complexity) {
    let response = `## 📚 ${code}. ${facultyName}\n\n`;
    
    response += `Bu fakültə Ukrayna universitetlərində mövcuddur. Hangi universitetdə bu fakültəni öyrənmək istəyirsiniz?\n\n`;
    
    // Bu fakültəni təklif edən universitetləri tap
    const universitiesWithFaculty = [];
    for (const [universityName, universityInfo] of Object.entries(ukraineUniversities)) {
      if (universityInfo.faculties && universityInfo.faculties.some(faculty => faculty.includes(code))) {
        universitiesWithFaculty.push(universityName);
      }
    }
    
    if (universitiesWithFaculty.length > 0) {
      response += `**Bu fakültəni təklif edən universitetlər:**\n`;
      universitiesWithFaculty.forEach(uni => {
        response += `• ${uni}\n`;
      });
    }
    
    return response;
  }

  // Genel Ukrayna üniversiteleri yanıtı
  generateGeneralUkraineResponse(complexity) {
    let response = `## 🇺🇦 Ukrayna Universitetləri\n\n`;
    
    if (complexity === 'low') {
      response += `Ukrayna universitetləri haqqında məlumat verə bilərəm! Hangi universitet haqqında bilgi almaq istəyirsiniz?\n\n`;
      
      response += `### 🎓 Əsas Universitetlər:\n`;
      response += `• **Ukrayna Dövlət Biotexnologiya Universiteti** - Biotexnologiya və biomühəndislik\n`;
      response += `• **Milli texniki universitet "Xarkov Politexnik institutu"** - Texniki elmlər\n`;
      response += `• **Dövlət mülki müdafiə universiteti (FHN)** - Fövqəladə hallar\n`;
      response += `• **Xarkov Milli Tibb Universiteti** - Tibb elmləri\n`;
      response += `• **Karazin adına Xarkov Milli Universiteti** - Ümumi elmlər\n`;
      response += `• **Milli Aerokosmik Universiteti** - Aviasiya və kosmik texnika\n\n`;
      
      response += `Hangi universitet haqqında ətraflı məlumat almaq istəyirsiniz?`;
      
    } else if (complexity === 'medium') {
      response += `Ukrayna universitetləri haqqında detallı məlumat verə bilərəm!\n\n`;
      
      response += `### 📊 Ümumi Məlumatlar:\n`;
      response += `• **Təhsil forması:** Əyani və qiyabi\n`;
      response += `• **Təhsil mərhələləri:** Bakalavr (4 il), Magistr (1.5-2 il)\n`;
      response += `• **Dillər:** Rus, Ukrayn və İngilis\n`;
      response += `• **Təhsil haqları:** $1000-2800 arası (fakültəyə görə)\n`;
      response += `• **Təhsil sığortası:** Təhsil haqqına əlavə\n\n`;
      
      response += `### 🎯 Populyar Fakültələr:\n`;
      response += `• **121. Proqram təminatı mühəndisliyi** - IT və proqramlaşdırma\n`;
      response += `• **122. Kompüter elmləri** - Kompüter texnologiyaları\n`;
      response += `• **185. Neft-qaz mühəndisliyi** - Enerji sahəsi\n`;
      response += `• **222. Müalicə işi** - Tibb\n`;
      response += `• **073. Menecment** - İdarəetmə\n\n`;
      
      response += `Hangi universitet və ya fakültə haqqında ətraflı məlumat almaq istəyirsiniz?`;
      
    } else {
      response += `Ukrayna universitetləri haqqında ətraflı analiz verə bilərəm!\n\n`;
      
      response += `### 🏛️ Universitet Növləri:\n`;
      response += `• **Dövlət universitetləri** - Ən çox seçilən\n`;
      response += `• **Milli universitetlər** - Yüksək status\n`;
      response += `• **Texniki universitetlər** - Mühəndislik\n`;
      response += `• **Tibbi universitetlər** - Tibb elmləri\n`;
      response += `• **İxtisas universitetləri** - Müəyyən sahələr\n\n`;
      
      response += `### 💰 Təhsil Haqları Analizi:\n`;
      response += `• **Ən baha:** Neft-qaz mühəndisliyi ($2600-2800)\n`;
      response += `• **Orta:** IT və texniki fakültələr ($2200-2500)\n`;
      response += `• **Ən ucuz:** Sosial elmlər ($1500-2000)\n`;
      response += `• **İngilis dili:** +$200-400 əlavə\n\n`;
      
      response += `### 🎯 Karyera Perspektivləri:\n`;
      response += `• **IT sahəsi:** Yüksək maaş və iş imkanları\n`;
      response += `• **Tibbi sahə:** Beynəlxalq tanınma\n`;
      response += `• **Mühəndislik:** Praktiki bacarıqlar\n`;
      response += `• **İqtisadiyyat:** Biznes və menecment\n\n`;
      
      response += `Hangi konkret universitet, fakültə və ya sahə haqqında ətraflı məlumat almaq istəyirsiniz?`;
    }
    
    return response;
  }

  // Data yanıtları
  generateDataLowResponse() {
    return `## 📊 Veri Analizi Başlangıç

Veri analizi konusunda size yardımcı olabilirim! Hangi konuda bilgi almak istersiniz?

### 📈 Temel Veri Analizi:
• **Veri Toplama** - Veri kaynakları ve toplama yöntemleri
• **Veri Temizleme** - Eksik ve hatalı verilerin düzeltilmesi
• **Veri Görselleştirme** - Grafikler ve çizelgeler
• **Temel İstatistikler** - Ortalama, medyan, standart sapma

### 🛠️ Araçlar:
• **Excel** - Temel veri analizi
• **Google Sheets** - Bulut tabanlı analiz
• **Tableau** - Görselleştirme
• **Power BI** - İş zekası

Hangi konuda detaylı bilgi almak istersiniz?`;
  }

  generateDataMediumResponse() {
    return `## ⚡ Orta Seviye Veri Analizi

Veri analizi konusunda detaylı bilgi verebilirim. Hangi teknoloji veya yöntem hakkında bilgi almak istersiniz?

### 🔬 Gelişmiş Teknikler:
• **Makine Öğrenmesi** - Tahminleme modelleri
• **İstatistiksel Analiz** - Hipotez testleri
• **Zaman Serisi Analizi** - Trend analizi
• **Korelasyon Analizi** - İlişki analizi

### 💻 Programlama Dilleri:
• **Python** - Pandas, NumPy, Matplotlib
• **R** - İstatistiksel analiz
• **SQL** - Veritabanı sorguları
• **JavaScript** - Web tabanlı görselleştirme

Hangi konuda detaylı bilgi almak istersiniz?`;
  }

  generateDataHighResponse() {
    return `## 🎯 Gelişmiş Veri Analizi

Gelişmiş veri analizi konularında size rehberlik edebilirim. Hangi özel alanda yardıma ihtiyacınız var?

### 🏗️ Büyük Veri ve Analitik:
• **Big Data** - Hadoop, Spark, Kafka
• **Veri Mimarisi** - Data Lake, Data Warehouse
• **Real-time Analytics** - Canlı veri analizi
• **Cloud Analytics** - AWS, Azure, GCP

### 🤖 AI ve ML:
• **Deep Learning** - Sinir ağları
• **NLP** - Doğal dil işleme
• **Computer Vision** - Görüntü analizi
• **Recommendation Systems** - Öneri sistemleri

Hangi özel konuda yardıma ihtiyacınız var?`;
  }

  // Security yanıtları
  generateSecurityLowResponse() {
    return `## 🔒 Siber Güvenlik Başlangıç

Siber güvenlik konusunda size yardımcı olabilirim! Hangi konuda bilgi almak istersiniz?

### 🛡️ Temel Güvenlik:
• **Parola Güvenliği** - Güçlü parola oluşturma
• **İki Faktörlü Kimlik Doğrulama** - 2FA
• **Antivirus Yazılımları** - Kötü amaçlı yazılım koruması
• **Firewall** - Ağ güvenliği

### 🔍 Güvenlik Türleri:
• **Web Güvenliği** - HTTPS, SSL/TLS
• **E-posta Güvenliği** - Phishing koruması
• **Mobil Güvenlik** - Uygulama güvenliği
• **Sosyal Mühendislik** - İnsan faktörü

Hangi konuda detaylı bilgi almak istersiniz?`;
  }

  generateSecurityMediumResponse() {
    return `## ⚡ Orta Seviye Siber Güvenlik

Siber güvenlik konusunda detaylı bilgi verebilirim. Hangi teknoloji veya yöntem hakkında bilgi almak istersiniz?

### 🔬 Güvenlik Testleri:
• **Penetration Testing** - Penetrasyon testleri
• **Vulnerability Assessment** - Güvenlik açığı değerlendirmesi
• **Security Auditing** - Güvenlik denetimi
• **Risk Assessment** - Risk değerlendirmesi

### 🛠️ Araçlar ve Teknolojiler:
• **Nmap** - Ağ tarama
• **Wireshark** - Ağ analizi
• **Metasploit** - Güvenlik testleri
• **Burp Suite** - Web güvenlik testleri

Hangi konuda detaylı bilgi almak istersiniz?`;
  }

  generateSecurityHighResponse() {
    return `## 🎯 Gelişmiş Siber Güvenlik

Gelişmiş siber güvenlik konularında size rehberlik edebilirim. Hangi özel alanda yardıma ihtiyacınız var?

### 🏗️ Güvenlik Mimarisi:
• **Zero Trust Architecture** - Sıfır güven mimarisi
• **Security Operations Center (SOC)** - Güvenlik operasyon merkezi
• **Incident Response** - Olay müdahalesi
• **Threat Intelligence** - Tehdit istihbaratı

### 🔬 İleri Seviye Teknikler:
• **Reverse Engineering** - Tersine mühendislik
• **Malware Analysis** - Kötü amaçlı yazılım analizi
• **Cryptography** - Kriptografi
• **Forensics** - Dijital adli tıp

Hangi özel konuda yardıma ihtiyacınız var?`;
  }

  // Cloud yanıtları
  generateCloudLowResponse() {
    return `## ☁️ Bulut Bilişim Başlangıç

Bulut bilişim konusunda size yardımcı olabilirim! Hangi bulut sağlayıcısı veya hizmeti hakkında bilgi almak istersiniz?

### 🚀 Popüler Bulut Sağlayıcıları:
• **AWS (Amazon Web Services)** - En geniş hizmet yelpazesi
• **Azure (Microsoft Azure)** - Microsoft ekosistemi entegrasyonu
• **GCP (Google Cloud Platform)** - Google'ın altyapısı ve AI hizmetleri

### 💡 Temel Bulut Hizmetleri:
• **IaaS (Infrastructure as a Service)** - Sanal makineler, depolama
• **PaaS (Platform as a Service)** - Uygulama geliştirme platformları
• **SaaS (Software as a Service)** - Hazır yazılım çözümleri

### 🛠️ Bulut Kavramları:
• **Sanallaştırma** - Kaynakların soyutlanması
• **Ölçeklenebilirlik** - İhtiyaca göre kaynak artırma/azaltma
• **Esneklik** - Farklı hizmet seçenekleri

Hangi bulut hizmeti hakkında detaylı bilgi almak istersiniz?`;
  }

  generateCloudMediumResponse() {
    return `## ⚡ Orta Seviye Bulut Bilişim

Bulut bilişim konusunda detaylı bilgi verebilirim. Hangi bulut teknolojisi veya konsept hakkında bilgi almak istersiniz?

### 🏗️ Bulut Mimarileri:
• **Serverless (Sunucusuz)** - Fonksiyon tabanlı hizmetler (Lambda, Functions)
• **Containers (Konteynerler)** - Uygulama paketleme (Docker, Kubernetes)
• **Microservices** - Küçük, bağımsız hizmetler
• **Hybrid Cloud** - Karma bulut (özel + genel)
• **Multi-cloud** - Çoklu bulut (birden fazla sağlayıcı)

### 🔒 Bulut Güvenliği:
• **Kimlik ve Erişim Yönetimi (IAM)** - Kullanıcı yetkilendirme
• **Veri Şifreleme** - Veri koruma
• **Ağ Güvenliği** - Güvenlik duvarları, VPN
• **Uyumluluk (Compliance)** - Standartlara uygunluk

### 📊 Maliyet Yönetimi:
• **FinOps** - Bulut maliyet optimizasyonu
• **Kaynak İzleme** - Kullanım takibi
• **Otomatik Ölçeklendirme** - Maliyet etkinliği

Hangi konuda detaylı bilgi almak istersiniz?`;
  }

  generateCloudHighResponse() {
    return `## 🎯 Gelişmiş Bulut Bilişim

Gelişmiş bulut bilişim konularında size rehberlik edebilirim. Hangi özel alanda yardıma ihtiyacınız var?

### 🚀 Bulut Optimizasyonu:
• **Cost Optimization** - Maliyet optimizasyonu stratejileri
• **Performance Tuning** - Performans ayarlamaları
• **Reliability Engineering** - Güvenilirlik mühendisliği
• **Disaster Recovery** - Felaket kurtarma planları
• **Site Reliability Engineering (SRE)** - Sistem güvenilirliği

### 🌐 Bulut ve DevOps:
• **CI/CD Pipelines** - Sürekli entegrasyon/dağıtım
• **Infrastructure as Code (IaC)** - Kod olarak altyapı (Terraform, CloudFormation)
• **Monitoring & Logging** - İzleme ve loglama (Prometheus, Grafana, ELK Stack)
• **Automation** - Otomasyon araçları

### 💡 İleri Seviye Bulut Hizmetleri:
• **Edge Computing** - Uç bilişim
• **Quantum Computing as a Service** - Bulut üzerinden kuantum bilişim
• **AI/ML Services** - Bulut tabanlı AI/ML platformları
• **Blockchain as a Service (BaaS)** - Bulut üzerinden Blockchain

Hangi özel konuda yardıma ihtiyacınız var?`;
  }

  // Mobile yanıtları
  generateMobileLowResponse() {
    return `## 📱 Mobil Uygulama Geliştirme Başlangıç

Mobil uygulama geliştirme konusunda size yardımcı olabilirim! Hangi platform veya teknoloji hakkında bilgi almak istersiniz?

### 🚀 Popüler Mobil Platformlar:
• **iOS (Apple)** - iPhone ve iPad uygulamaları
• **Android (Google)** - Çeşitli cihazlar için uygulamalar

### 💡 Geliştirme Yaklaşımları:
• **Native Development** - Platforma özel diller (Swift/Kotlin)
• **Cross-Platform Development** - Tek kod tabanı (React Native, Flutter)

### 🛠️ Temel Mobil Kavramlar:
• **UI/UX Tasarımı** - Kullanıcı arayüzü ve deneyimi
• **Performans Optimizasyonu** - Uygulama hızı ve verimliliği
• **Güvenlik** - Veri koruma ve yetkilendirme

Hangi mobil geliştirme yaklaşımı hakkında detaylı bilgi almak istersiniz?`;
  }

  generateMobileMediumResponse() {
    return `## ⚡ Orta Seviye Mobil Uygulama Geliştirme

Mobil uygulama geliştirme konusunda detaylı bilgi verebilirim. Hangi teknoloji veya framework hakkında bilgi almak istersiniz?

### 🎨 Cross-Platform Framework'ler:
• **React Native** - JavaScript ile mobil uygulama
• **Flutter** - Dart ile hızlı UI geliştirme
• **Xamarin** - C# ile mobil uygulama
• **Ionic** - Web teknolojileri ile mobil uygulama

### ⚙️ Native Teknolojiler:
• **Swift/Objective-C** - iOS geliştirme
• **Kotlin/Java** - Android geliştirme

### 📊 Mobil Veritabanları:
• **SQLite** - Yerel veritabanı
• **Realm** - Mobil için NoSQL veritabanı
• **Firebase** - Gerçek zamanlı bulut veritabanı

Hangi teknoloji hakkında detaylı bilgi almak istersiniz?`;
  }

  generateMobileHighResponse() {
    return `## 🎯 Gelişmiş Mobil Uygulama Geliştirme

Gelişmiş mobil uygulama geliştirme konularında size rehberlik edebilirim. Hangi özel alanda yardıma ihtiyacınız var?

### 🏗️ Mimari ve Tasarım Desenleri:
• **MVVM (Model-View-ViewModel)** - Android ve iOS'ta popüler
• **MVI (Model-View-Intent)** - Reaktif programlama için
• **Clean Architecture** - Test edilebilir ve sürdürülebilir kod
• **Modular Architecture** - Modüler yapı

### 🚀 Performans ve Optimizasyon:
• **Memory Management** - Bellek yönetimi
• **Battery Optimization** - Pil tüketimi optimizasyonu
• **Network Optimization** - Ağ istekleri optimizasyonu
• **UI Responsiveness** - Akıcı kullanıcı arayüzü

### 🔒 Güvenlik ve Best Practices:
• **Data Encryption** - Veri şifreleme
• **Secure Storage** - Güvenli veri saklama
• **Authentication** - Kimlik doğrulama
• **App Store Guidelines** - Mağaza kuralları

Hangi özel konuda yardıma ihtiyacınız var?`;
  }

  // Blockchain yanıtları
  generateBlockchainLowResponse() {
    return `## ⛓️ Blockchain Başlangıç

Blockchain konusunda size yardımcı olabilirim! Hangi konuda bilgi almak istersiniz?

### 🔗 Temel Kavramlar:
• **Blockchain Nedir?** - Dağıtık defter teknolojisi
• **Kripto Paralar** - Bitcoin, Ethereum
• **Mining** - Madencilik süreci
• **Wallet** - Cüzdan kullanımı

### 💡 Uygulama Alanları:
• **Fintech** - Finansal teknolojiler
• **Supply Chain** - Tedarik zinciri
• **Smart Contracts** - Akıllı sözleşmeler
• **NFT** - Non-fungible tokenlar

Hangi konuda detaylı bilgi almak istersiniz?`;
  }

  generateBlockchainMediumResponse() {
    return `## ⚡ Orta Seviye Blockchain

Blockchain konusunda detaylı bilgi verebilirim. Hangi teknoloji veya platform hakkında bilgi almak istersiniz?

### 🏗️ Blockchain Türleri:
• **Public Blockchain** - Açık blockchain
• **Private Blockchain** - Özel blockchain
• **Consortium Blockchain** - Konsorsiyum blockchain
• **Hybrid Blockchain** - Hibrit blockchain

### 💻 Geliştirme Platformları:
• **Ethereum** - Akıllı sözleşme platformu
• **Binance Smart Chain** - BSC
• **Polygon** - Layer 2 çözümü
• **Solana** - Yüksek performans blockchain

Hangi konuda detaylı bilgi almak istersiniz?`;
  }

  generateBlockchainHighResponse() {
    return `## 🎯 Gelişmiş Blockchain

Gelişmiş blockchain konularında size rehberlik edebilirim. Hangi özel alanda yardıma ihtiyacınız var?

### 🏗️ Blockchain Mimarisi:
• **Consensus Mechanisms** - Konsensüs mekanizmaları
• **Layer 2 Solutions** - İkinci katman çözümleri
• **Cross-chain Technology** - Zincirler arası teknoloji
• **DeFi Protocols** - Merkezi olmayan finans

### 🔬 İleri Seviye Konular:
• **Zero-Knowledge Proofs** - Sıfır bilgi kanıtları
• **Sharding** - Parçalama teknolojisi
• **Interoperability** - Birlikte çalışabilirlik
• **Governance Models** - Yönetişim modelleri

Hangi özel konuda yardıma ihtiyacınız var?`;
  }

  // Bağlam güncelleme
  updateContext(context, message) {
    this.contextHistory.push({
      context,
      message,
      timestamp: new Date().toISOString()
    });
    
    // Son 5 mesajı tut
    if (this.contextHistory.length > 5) {
      this.contextHistory.shift();
    }
  }
}

module.exports = IntelligentResponseEngine;
