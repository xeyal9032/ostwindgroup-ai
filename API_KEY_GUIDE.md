# OpenAI API Anahtarı Kurulum Rehberi

## 🔑 Gerçek OpenAI API Anahtarı Nasıl Alınır

### 1. OpenAI Hesabı Oluşturun
- https://platform.openai.com/ adresine gidin
- Hesap oluşturun veya giriş yapın

### 2. API Anahtarı Oluşturun
- https://platform.openai.com/account/api-keys adresine gidin
- "Create new secret key" butonuna tıklayın
- Anahtarı kopyalayın (bir daha gösterilmeyecek!)

### 3. API Anahtarını Ayarlayın

#### Windows PowerShell:
```powershell
$env:OPENAI_API_KEY="sk-your-actual-api-key-here"
cd "c:\Users\xeyal\Desktop\Ai\app\backend"
python server.py
```

#### Linux/Mac:
```bash
export OPENAI_API_KEY="sk-your-actual-api-key-here"
cd backend
python server.py
```

### 4. Test Edin
Backend başladıktan sonra terminal'de şu mesajı görmelisiniz:
```
OpenAI API key configured
```

## 💰 OpenAI API Ücretlendirme

- **GPT-3.5-turbo**: Çok uygun fiyatlı
- **İlk kullanım**: Genellikle ücretsiz kredi verilir
- **Fiyat**: ~$0.002 per 1K tokens (çok ucuz)

## 🔧 Sorun Giderme

### API Anahtarı Geçersiz Hatası
```
Error code: 401 - Incorrect API key provided
```

**Çözüm:**
1. API anahtarınızı kontrol edin
2. OpenAI hesabınızda kredi olduğundan emin olun
3. API anahtarının aktif olduğunu kontrol edin

### API Anahtarı Olmadan Çalıştırma
```powershell
# API anahtarını kaldırın
$env:OPENAI_API_KEY=""
python server.py
```

Demo modunda çalışacak ve şu mesajı verecek:
```
No OpenAI API key provided - using demo responses
```

## 🎯 Mevcut Durum

**Şu anda:** Demo modunda çalışıyor ✅
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- Chat özellikleri: Tam çalışır
- AI yanıtları: Demo yanıtlar

**Gerçek AI ile:**
- Gerçek OpenAI GPT-3.5-turbo yanıtları
- Akıllı konuşma
- Türkçe sistem mesajları
- Konuşma bağlamı korunur

## 🚀 Hızlı Başlangıç

1. **Demo Modunda Test:**
   ```bash
   # Frontend
   cd frontend
   npm start
   
   # Backend (demo modu)
   cd backend
   python server.py
   ```

2. **Gerçek AI ile:**
   ```bash
   # API anahtarı ayarlayın
   $env:OPENAI_API_KEY="sk-your-key"
   
   # Backend'i başlatın
   python server.py
   ```

3. **Tarayıcıda Test:**
   - http://localhost:3000 adresine gidin
   - Mesaj gönderin
   - AI yanıtını görün

## 📞 Destek

Sorun yaşıyorsanız:
1. Console loglarını kontrol edin
2. API anahtarınızı doğrulayın
3. OpenAI hesabınızda kredi olduğundan emin olun
4. Port çakışmalarını kontrol edin (3000, 8000)
