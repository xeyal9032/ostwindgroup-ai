# OstWindGroup AI Frontend

Modern React tabanlı AI chat uygulaması frontend'i.

## 🚀 Özellikler

- **Modern UI**: Tailwind CSS ve Shadcn/ui ile tasarlanmış
- **Responsive Design**: Mobil ve masaüstü uyumlu
- **Real-time Chat**: AI asistanı ile anlık sohbet
- **Sohbet Yönetimi**: Sohbet geçmişi ve yönetimi
- **Türkçe Destek**: Tam Türkçe arayüz

## 🛠️ Teknolojiler

- **React 18**: Modern React hooks ve functional components
- **React Router**: Sayfa yönlendirme
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: Modern UI bileşenleri
- **Axios**: HTTP istekleri
- **Lucide React**: Modern ikonlar

## 📦 Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Environment variables dosyasını oluşturun:
```bash
cp .env.example .env
```

3. `.env` dosyasını düzenleyin:
```env
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_APP_NAME=OstWindGroup AI
REACT_APP_APP_VERSION=1.0.0
REACT_APP_DEBUG=true
```

## 🚀 Çalıştırma

### Development
```bash
npm start
```
Uygulama http://localhost:3000 adresinde çalışacak.

### Production Build
```bash
npm run build
```

## 📁 Proje Yapısı

```
src/
├── components/          # React bileşenleri
│   ├── ui/             # Shadcn/ui bileşenleri
│   ├── ChatApp.js      # Ana chat uygulaması
│   ├── ChatList.js     # Sohbet listesi
│   ├── ChatWindow.js   # Chat penceresi
│   └── Message.js      # Mesaj bileşeni
├── services/           # API servisleri
│   └── api.js         # API client
├── lib/               # Utility fonksiyonları
│   └── utils.js       # Tailwind merge utility
├── hooks/             # Custom React hooks
├── utils/             # Genel utility fonksiyonları
├── App.js             # Ana uygulama bileşeni
├── index.js           # Uygulama giriş noktası
└── index.css          # Global stiller
```

## 🔧 API Entegrasyonu

Backend API ile iletişim için `services/api.js` dosyası kullanılır:

- **conversationService**: Sohbet yönetimi
- **chatService**: AI chat işlemleri

## 🎨 UI Bileşenleri

Shadcn/ui bileşenleri kullanılır:
- Button
- Input
- Card
- Ve daha fazlası...

## 📱 Responsive Design

- **Desktop**: Yan yana chat listesi ve chat penceresi
- **Mobile**: Tam ekran chat deneyimi
- **Tablet**: Uyarlanabilir layout

## 🔒 Güvenlik

- Environment variables ile API URL yönetimi
- CORS desteği backend ile uyumlu
- XSS koruması React ile sağlanır

## 🚀 Deployment

### Vercel
```bash
npm run build
# Vercel'e deploy edin
```

### Netlify
```bash
npm run build
# Netlify'e deploy edin
```

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje OstWindGroup tarafından geliştirilmiştir.