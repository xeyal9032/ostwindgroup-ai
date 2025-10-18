# 🤖 OstWindGroup AI - Modern Chat Uygulaması

Modern ve profesyonel AI chat uygulaması. Google AI (Gemini) ve OpenAI entegrasyonu ile güçlendirilmiş, React ve FastAPI ile geliştirilmiştir.

## ✨ Özellikler

### 🎨 **Modern UI/UX**
- **Dark/Light Mode** - Otomatik tema değiştirme
- **Custom Themes** - 6 farklı renk teması (Mavi, Yeşil, Mor, Turuncu, Pembe, Kırmızı)
- **Glassmorphism** - Modern cam efekti tasarım
- **Responsive Design** - Mobil ve masaüstü uyumlu
- **Smooth Animations** - Akıcı geçiş animasyonları

### 🤖 **AI Entegrasyonu**
- **Google AI (Gemini 2.5 Flash)** - Ana AI modeli
- **OpenAI (GPT)** - Fallback AI modeli
- **Demo Mode** - API anahtarı olmadan test
- **Speech-to-Text** - Sesli mesaj desteği
- **Multi-language** - Türkçe ve İngilizce destek

### 💬 **Chat Özellikleri**
- **Real-time Chat** - Anlık mesajlaşma
- **Message History** - Sohbet geçmişi
- **Message Editing** - Mesaj düzenleme
- **Message Copy** - Mesaj kopyalama
- **Emoji Picker** - Emoji seçici
- **File Upload** - Dosya yükleme
- **Voice Messages** - Sesli mesaj kaydı

### 📊 **Analytics & Statistics**
- **Chat Statistics** - Detaylı istatistikler
- **Analytics Dashboard** - Zaman filtreleri ile analiz
- **Message Trends** - Mesaj trend analizi
- **Activity Insights** - Aktivite öngörüleri
- **Export/Import** - JSON, PDF, TXT export

### 🎮 **AI Games**
- **Kelime Tahmin** - AI ile kelime oyunu
- **Matematik Quiz** - Matematik soruları
- **Hikaye Yaratma** - Yaratıcı hikaye oluşturma
- **Bilmece Oyunu** - Zeka soruları
- **Puan Sistemi** - Oyun skorları

### 🔔 **Notifications**
- **Browser Notifications** - Tarayıcı bildirimleri
- **In-app Panel** - Uygulama içi bildirim paneli
- **Sound Alerts** - Ses bildirimleri
- **Notification Settings** - Bildirim ayarları

### 📱 **Mobile Optimization**
- **Touch-friendly** - Dokunmatik uyumlu
- **Mobile Navigation** - Mobil navigasyon
- **Responsive Layout** - Uyumlu tasarım
- **Viewport Optimization** - Görüntü optimizasyonu

## 🛠️ Teknolojiler

### **Frontend**
- **React 18** - Modern React hooks
- **Tailwind CSS** - Utility-first CSS
- **Shadcn/ui** - Modern UI bileşenleri
- **React Router** - Sayfa yönlendirme
- **Axios** - HTTP client
- **Lucide React** - Modern ikonlar

### **Backend**
- **FastAPI** - Modern Python web framework
- **Motor** - Async MongoDB driver
- **Pydantic** - Veri validasyonu
- **Uvicorn** - ASGI server
- **Google AI** - Gemini API
- **OpenAI** - GPT API

### **Database**
- **MongoDB** - NoSQL veritabanı (opsiyonel)
- **In-memory** - Bellek tabanlı saklama (varsayılan)

## 🚀 Kurulum

### **Gereksinimler**
- **Node.js** v18+
- **Python** 3.8+
- **npm** v8+

### **Backend Kurulumu**
```bash
cd backend
pip install -r requirements.txt
python server.py
```

### **Frontend Kurulumu**
```bash
cd frontend
npm install
npm start
```

### **Environment Variables**
```bash
# Backend (.env)
GOOGLE_AI_API_KEY=your_google_ai_key
OPENAI_API_KEY=your_openai_key
MONGO_URL=mongodb://localhost:27017
DB_NAME=ostwindgroup_ai

# Frontend (.env)
REACT_APP_API_URL=http://localhost:8000/api
```

## 📱 Kullanım

1. **Backend'i başlatın**: `python server.py`
2. **Frontend'i başlatın**: `npm start`
3. **Tarayıcıda açın**: http://localhost:3000
4. **AI ile sohbet edin**!

## 🔗 API Endpoints

- `GET /api/` - API durumu
- `POST /api/chat` - AI ile sohbet
- `GET /api/conversations` - Sohbet listesi
- `POST /api/conversations` - Yeni sohbet
- `DELETE /api/conversations/{id}` - Sohbet sil
- `GET /api/conversations/{id}/messages` - Mesajları getir
- `POST /api/speech-to-text` - Ses-metin çevirisi

## 🎯 Özellik Detayları

### **Tema Sistemi**
- 6 farklı renk teması
- Otomatik tema algılama
- Local storage kayıt
- Smooth geçişler

### **AI Oyunları**
- 4 farklı oyun türü
- Puan sistemi
- Oyun geçmişi
- AI destekli içerik

### **Export/Import**
- JSON formatında export
- PDF formatında export
- TXT formatında export
- JSON import desteği

## 📊 Proje İstatistikleri

- **Backend**: 375+ satır Python
- **Frontend**: 15+ React bileşeni
- **Toplam dosya**: 25+ dosya
- **Dependencies**: 50+ paket
- **Features**: 15+ ana özellik

## 👨‍💻 Geliştirici

**Khayal Jamilli** - Web Designer & Developer
- **Company**: OstWind Group
- **Website**: [frontend.ostwind.az](https://frontend.ostwind.az/)
- **GitHub**: [@xeyal9032](https://github.com/xeyal9032)
- **Instagram**: [@xeyal9032](https://instagram.com/xeyal9032)
- **LinkedIn**: [in/khayaljamilli9032](https://linkedin.com/in/khayaljamilli9032)

## 📄 Lisans

Bu proje OstWind Group tarafından geliştirilmiştir.

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 İletişim

- **Email**: [İletişim için GitHub profili]
- **Website**: [OstWind Group](https://frontend.ostwind.az/)
- **GitHub**: [@xeyal9032](https://github.com/xeyal9032)

---

**🚀 Modern AI Chat Uygulaması - OstWindGroup AI**