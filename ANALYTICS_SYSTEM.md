# 📊 OstWindGroup AI - Analytics & Kullanım İstatistikleri

## 🎯 Analytics Sistemi Özeti

OstWindGroup AI için kapsamlı analytics sistemi geliştirilmiştir. Bu sistem kullanıcı davranışlarını, model performansını ve sistem sağlığını izler.

## 📈 Analytics Bileşenleri

### 1. 👥 Kullanıcı Analytics

#### 📊 Kullanıcı Metrikleri
```javascript
// Kullanıcı davranışları
const userMetrics = {
  totalUsers: 0,
  activeUsers: 0,
  newUsers: 0,
  returningUsers: 0,
  sessionDuration: 0,
  messagesPerSession: 0,
  userRetention: 0
};
```

#### 🌍 Coğrafi Dağılım
```javascript
// Coğrafi analiz
const geographicData = {
  countries: {
    'TR': { users: 0, messages: 0 },
    'RU': { users: 0, messages: 0 },
    'US': { users: 0, messages: 0 },
    'DE': { users: 0, messages: 0 },
    'FR': { users: 0, messages: 0 }
  },
  languages: {
    'tr': { usage: 0, percentage: 0 },
    'ru': { usage: 0, percentage: 0 },
    'en': { usage: 0, percentage: 0 }
  }
};
```

### 2. 💬 Mesaj Analytics

#### 📝 Mesaj Metrikleri
```javascript
// Mesaj analizi
const messageMetrics = {
  totalMessages: 0,
  messagesPerDay: 0,
  averageMessageLength: 0,
  messageTypes: {
    questions: 0,
    requests: 0,
    commands: 0,
    casual: 0
  },
  responseTime: {
    average: 0,
    min: 0,
    max: 0,
    p95: 0
  }
};
```

#### 🎯 İçerik Analizi
```javascript
// İçerik analizi
const contentAnalysis = {
  topics: {
    'programming': { count: 0, percentage: 0 },
    'ai': { count: 0, percentage: 0 },
    'business': { count: 0, percentage: 0 },
    'education': { count: 0, percentage: 0 },
    'technology': { count: 0, percentage: 0 }
  },
  sentiment: {
    positive: 0,
    neutral: 0,
    negative: 0
  },
  complexity: {
    low: 0,
    medium: 0,
    high: 0
  }
};
```

### 3. 🤖 Model Performance Analytics

#### ⚡ Performans Metrikleri
```javascript
// Model performansı
const modelPerformance = {
  responseTime: {
    ollama: { average: 0, success: 0 },
    groq: { average: 0, success: 0 },
    fallback: { average: 0, success: 0 }
  },
  accuracy: {
    technical: 0,
    creative: 0,
    general: 0
  },
  usage: {
    ollama: 0,
    groq: 0,
    fallback: 0
  }
};
```

#### 🔄 API Health
```javascript
// API sağlık durumu
const apiHealth = {
  ollama: {
    status: 'active',
    uptime: 0,
    errorRate: 0,
    lastCheck: null
  },
  groq: {
    status: 'active',
    uptime: 0,
    errorRate: 0,
    lastCheck: null
  },
  netlify: {
    status: 'active',
    uptime: 0,
    errorRate: 0,
    lastCheck: null
  }
};
```

### 4. 🌐 Platform Analytics

#### 🖥️ Platform Kullanımı
```javascript
// Platform analizi
const platformUsage = {
  netlify: {
    visits: 0,
    uniqueVisitors: 0,
    pageViews: 0,
    bounceRate: 0
  },
  githubPages: {
    visits: 0,
    uniqueVisitors: 0,
    pageViews: 0,
    bounceRate: 0
  },
  ollamaHub: {
    downloads: 0,
    pulls: 0,
    ratings: 0
  }
};
```

#### 📱 Cihaz Analizi
```javascript
// Cihaz analizi
const deviceAnalysis = {
  desktop: { percentage: 0, users: 0 },
  mobile: { percentage: 0, users: 0 },
  tablet: { percentage: 0, users: 0 },
  browsers: {
    chrome: { percentage: 0, users: 0 },
    firefox: { percentage: 0, users: 0 },
    safari: { percentage: 0, users: 0 },
    edge: { percentage: 0, users: 0 }
  }
};
```

## 🔧 Analytics Implementation

### 1. 📊 Frontend Analytics

#### 🎯 Event Tracking
```javascript
// Event tracking sistemi
class AnalyticsTracker {
  constructor() {
    this.events = [];
    this.sessionId = this.generateSessionId();
  }

  track(event, data = {}) {
    const eventData = {
      event,
      data,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      userId: this.getUserId(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    this.events.push(eventData);
    this.sendToAnalytics(eventData);
  }

  // Chat events
  trackChatStart() {
    this.track('chat_start', {
      timestamp: new Date().toISOString()
    });
  }

  trackMessageSent(message, model) {
    this.track('message_sent', {
      messageLength: message.length,
      model: model,
      timestamp: new Date().toISOString()
    });
  }

  trackMessageReceived(response, model, responseTime) {
    this.track('message_received', {
      responseLength: response.length,
      model: model,
      responseTime: responseTime,
      timestamp: new Date().toISOString()
    });
  }

  trackModelSwitch(fromModel, toModel) {
    this.track('model_switch', {
      fromModel,
      toModel,
      timestamp: new Date().toISOString()
    });
  }

  trackError(error, context) {
    this.track('error', {
      error: error.message,
      context,
      timestamp: new Date().toISOString()
    });
  }
}
```

#### 📈 Performance Monitoring
```javascript
// Performance monitoring
class PerformanceMonitor {
  constructor() {
    this.metrics = {};
  }

  trackResponseTime(api, startTime, endTime) {
    const responseTime = endTime - startTime;
    
    if (!this.metrics[api]) {
      this.metrics[api] = {
        times: [],
        average: 0,
        min: Infinity,
        max: 0
      };
    }

    this.metrics[api].times.push(responseTime);
    this.metrics[api].min = Math.min(this.metrics[api].min, responseTime);
    this.metrics[api].max = Math.max(this.metrics[api].max, responseTime);
    this.metrics[api].average = this.calculateAverage(this.metrics[api].times);
  }

  trackMemoryUsage() {
    if (performance.memory) {
      return {
        used: performance.memory.usedJSHeapSize,
        total: performance.memory.totalJSHeapSize,
        limit: performance.memory.jsHeapSizeLimit
      };
    }
    return null;
  }

  trackPageLoad() {
    window.addEventListener('load', () => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      this.trackMetric('page_load_time', loadTime);
    });
  }
}
```

### 2. 🔧 Backend Analytics

#### 📊 Netlify Functions Analytics
```javascript
// Netlify Functions analytics
const analytics = {
  trackRequest: (event, context) => {
    const requestData = {
      method: event.httpMethod,
      path: event.path,
      userAgent: event.headers['user-agent'],
      ip: event.headers['x-forwarded-for'],
      timestamp: new Date().toISOString(),
      functionName: context.functionName
    };

    // Log to console (Netlify Functions)
    console.log('Analytics Request:', JSON.stringify(requestData));

    // Send to external analytics service
    sendToAnalyticsService(requestData);
  },

  trackResponse: (response, startTime) => {
    const responseData = {
      statusCode: response.statusCode,
      responseTime: Date.now() - startTime,
      timestamp: new Date().toISOString()
    };

    console.log('Analytics Response:', JSON.stringify(responseData));
    sendToAnalyticsService(responseData);
  },

  trackError: (error, context) => {
    const errorData = {
      error: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString()
    };

    console.log('Analytics Error:', JSON.stringify(errorData));
    sendToAnalyticsService(errorData);
  }
};
```

#### 🗄️ Data Storage
```javascript
// Analytics data storage
const analyticsStorage = {
  // Local storage for immediate data
  local: {
    save: (key, data) => {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (e) {
        console.error('Local storage error:', e);
      }
    },
    get: (key) => {
      try {
        return JSON.parse(localStorage.getItem(key));
      } catch (e) {
        console.error('Local storage error:', e);
        return null;
      }
    }
  },

  // External analytics service
  external: {
    send: async (data) => {
      try {
        await fetch('/.netlify/functions/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
      } catch (e) {
        console.error('External analytics error:', e);
      }
    }
  }
};
```

### 3. 📈 Dashboard & Reporting

#### 🎛️ Analytics Dashboard
```javascript
// Analytics dashboard
class AnalyticsDashboard {
  constructor() {
    this.data = {};
    this.charts = {};
  }

  async loadData() {
    try {
      const response = await fetch('/.netlify/functions/analytics');
      this.data = await response.json();
      this.renderCharts();
    } catch (e) {
      console.error('Dashboard load error:', e);
    }
  }

  renderCharts() {
    this.renderUserChart();
    this.renderMessageChart();
    this.renderPerformanceChart();
    this.renderLanguageChart();
  }

  renderUserChart() {
    // User growth chart
    const userData = this.data.users || {};
    // Chart implementation
  }

  renderMessageChart() {
    // Message volume chart
    const messageData = this.data.messages || {};
    // Chart implementation
  }

  renderPerformanceChart() {
    // Performance metrics chart
    const performanceData = this.data.performance || {};
    // Chart implementation
  }

  renderLanguageChart() {
    // Language usage chart
    const languageData = this.data.languages || {};
    // Chart implementation
  }
}
```

## 📊 Analytics Metrikleri

### 1. 📈 KPI'lar (Key Performance Indicators)

#### 👥 Kullanıcı KPI'ları
- **Daily Active Users (DAU):** Günlük aktif kullanıcı sayısı
- **Monthly Active Users (MAU):** Aylık aktif kullanıcı sayısı
- **User Retention Rate:** Kullanıcı tutma oranı
- **Session Duration:** Ortalama oturum süresi
- **Messages per Session:** Oturum başına mesaj sayısı

#### 💬 Mesaj KPI'ları
- **Total Messages:** Toplam mesaj sayısı
- **Messages per Day:** Günlük mesaj sayısı
- **Average Response Time:** Ortalama yanıt süresi
- **Message Success Rate:** Mesaj başarı oranı
- **Error Rate:** Hata oranı

#### 🤖 Model KPI'ları
- **Model Usage Distribution:** Model kullanım dağılımı
- **Response Accuracy:** Yanıt doğruluğu
- **Response Quality Score:** Yanıt kalite skoru
- **Model Performance Score:** Model performans skoru
- **API Uptime:** API çalışma süresi

### 2. 📊 Detaylı Metrikler

#### 🌍 Coğrafi Metrikler
- **Country Distribution:** Ülke dağılımı
- **Language Usage:** Dil kullanımı
- **Timezone Analysis:** Saat dilimi analizi
- **Regional Performance:** Bölgesel performans

#### 📱 Platform Metrikler
- **Device Type Distribution:** Cihaz türü dağılımı
- **Browser Usage:** Tarayıcı kullanımı
- **OS Distribution:** İşletim sistemi dağılımı
- **Screen Resolution:** Ekran çözünürlüğü

#### ⚡ Performans Metrikler
- **Page Load Time:** Sayfa yükleme süresi
- **API Response Time:** API yanıt süresi
- **Memory Usage:** Bellek kullanımı
- **CPU Usage:** CPU kullanımı
- **Network Latency:** Ağ gecikmesi

## 🔄 Analytics Süreci

### 1. 📊 Veri Toplama
- **Real-time Tracking:** Gerçek zamanlı takip
- **Event-based Analytics:** Olay tabanlı analitik
- **Performance Monitoring:** Performans izleme
- **Error Tracking:** Hata takibi

### 2. 📈 Veri İşleme
- **Data Aggregation:** Veri toplama
- **Data Cleaning:** Veri temizleme
- **Data Transformation:** Veri dönüştürme
- **Data Validation:** Veri doğrulama

### 3. 📊 Raporlama
- **Daily Reports:** Günlük raporlar
- **Weekly Reports:** Haftalık raporlar
- **Monthly Reports:** Aylık raporlar
- **Custom Reports:** Özel raporlar

### 4. 🎯 Analiz
- **Trend Analysis:** Trend analizi
- **Performance Analysis:** Performans analizi
- **User Behavior Analysis:** Kullanıcı davranış analizi
- **Predictive Analysis:** Tahmine dayalı analiz

## 🚀 Analytics Roadmap

### Phase 1: Temel Analytics ✅
- [x] Event tracking
- [x] Basic metrics
- [x] Error tracking
- [x] Performance monitoring

### Phase 2: Gelişmiş Analytics 🔄
- [ ] Machine learning insights
- [ ] Predictive analytics
- [ ] Advanced segmentation
- [ ] Custom dashboards

### Phase 3: AI-Powered Analytics 🔮
- [ ] AI-driven insights
- [ ] Automated reporting
- [ ] Intelligent alerts
- [ ] Smart recommendations

---

**Analytics sistemi sürekli geliştirilmekte ve model kalitesi artırılmaktadır!** 📊✨
