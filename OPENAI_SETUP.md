# OstWindGroup AI - OpenAI Entegrasyonu

## 🚀 Kurulum ve Çalıştırma

### 1. Frontend Başlatma
```bash
cd frontend
npm install
npm start
```

### 2. Backend Başlatma
```bash
cd backend
pip install -r requirements.txt
python server.py
```

## 🤖 OpenAI API Entegrasyonu

### Demo Modu (Varsayılan)
Uygulama varsayılan olarak demo modunda çalışır. OpenAI API anahtarı olmadan da çalışır.

### Gerçek AI Entegrasyonu
Gerçek AI yanıtları için OpenAI API anahtarı gerekli:

1. **OpenAI API Anahtarı Alın:**
   - https://platform.openai.com/account/api-keys adresine gidin
   - Yeni API anahtarı oluşturun

2. **Environment Variable Ayarlayın:**
   ```bash
   # Windows PowerShell
   $env:OPENAI_API_KEY="sk-your-actual-api-key-here"
   
   # Linux/Mac
   export OPENAI_API_KEY="sk-your-actual-api-key-here"
   ```

3. **Backend'i Yeniden Başlatın:**
   ```bash
   python server.py
   ```

### API Anahtarı Olmadan Test
API anahtarı olmadan test etmek için:
```bash
# API anahtarını kaldırın
$env:OPENAI_API_KEY=""
python server.py
```

## 🔧 Offline MongoDB Kurulumu (Opsiyonel)

MongoDB olmadan da çalışır (veriler bellekte saklanır). MongoDB kullanmak için:

1. **MongoDB Kurun:**
   - https://www.mongodb.com/try/download/community

2. **Environment Variables:**
   ```bash
   $env:MONGO_URL="mongodb://localhost:27017"
   $env:DB_NAME="ostwindgroup_ai"
   ```

## 📱 Kullanım

1. **Frontend:** http://localhost:3000
2. **Backend API:** http://localhost:8000/api

### API Endpoints:
- `GET /api/` - API durumu
- `POST /api/chat` - AI ile sohbet
- `GET /api/conversations` - Sohbet listesi
- `POST /api/conversations` - Yeni sohbet
- `DELETE /api/conversations/{id}` - Sohbet sil

## 🎯 Özellikler

### ✅ Çalışan Özellikler:
- Modern React UI
- Sohbet yönetimi
- Mesaj geçmişi
- Responsive tasarım
- Türkçe arayüz
- Demo AI yanıtları

### 🔄 OpenAI API ile:
- Gerçek AI yanıtları
- Konuşma bağlamı
- GPT-3.5-turbo modeli
- Türkçe sistem mesajları

## 🛠️ Teknik Detaylar

### Backend:
- **FastAPI** - Modern Python web framework
- **OpenAI API** - AI entegrasyonu
- **MongoDB** - Veri saklama (opsiyonel)
- **CORS** - Frontend-backend iletişimi

### Frontend:
- **React 18** - Modern UI framework
- **Tailwind CSS** - Styling
- **Shadcn/ui** - UI bileşenleri
- **Axios** - API iletişimi

## 🔒 Güvenlik

- API anahtarlarını environment variables'da saklayın
- `.env` dosyalarını git'e eklemeyin
- Production'da CORS ayarlarını sınırlayın

## 🚀 Deployment

### Vercel (Frontend):
```bash
npm run build
# Vercel'e deploy edin
```

### Railway/Heroku (Backend):
```bash
# requirements.txt ve Procfile hazır
# Environment variables'ları ayarlayın
```

## 📞 Destek

Sorunlar için:
1. Console loglarını kontrol edin
2. API anahtarınızı doğrulayın
3. Port çakışmalarını kontrol edin
4. Bağımlılıkları yeniden yükleyin
