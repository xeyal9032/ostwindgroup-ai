# 🤖 Ollama Entegrasyon Rehberi

## 📥 **1. Ollama Kurulumu**

### Windows için:
1. https://ollama.ai/download adresinden Ollama'yı indirin
2. Kurulum dosyasını çalıştırın
3. Kurulum tamamlandıktan sonra Ollama otomatik olarak başlayacak

### Kurulumu Test Edin:
```bash
ollama --version
```

## 🚀 **2. Model İndirme**

### Popüler Modeller:
```bash
# Llama 2 (7B) - Hızlı ve etkili
ollama pull llama2

# Llama 2 (13B) - Daha güçlü ama yavaş
ollama pull llama2:13b

# Code Llama - Kod yazma için özel
ollama pull codellama

# Mistral - Hızlı ve kaliteli
ollama pull mistral

# Gemma - Google'ın açık kaynak modeli
ollama pull gemma
```

### Model Boyutları:
- **7B modeller**: ~4GB RAM kullanır
- **13B modeller**: ~8GB RAM kullanır
- **70B modeller**: ~40GB RAM kullanır

## 🔧 **3. Ollama Servisini Başlatma**

### Manuel Başlatma:
```bash
ollama serve
```

### Otomatik Başlatma (Windows):
Ollama kurulumu sonrası otomatik olarak başlar. Eğer başlamazsa:
1. Windows Services'te "Ollama" servisini bulun
2. Servisi başlatın

## 🌐 **4. Web Projesi Entegrasyonu**

### Otomatik Entegrasyon:
Projenizde Ollama kontrol paneli otomatik olarak görünecek:
- ✅ **Yeşil nokta**: Ollama çalışıyor
- ❌ **Kırmızı nokta**: Ollama kapalı
- 🔄 **Model seçici**: İndirdiğiniz modelleri gösterir
- ☑️ **"Ollama Kullan"**: Ollama'yı aktif/pasif yapar

### Manuel Test:
```bash
# Ollama API'sini test edin
curl http://localhost:11434/api/tags

# Basit bir test
curl -X POST http://localhost:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{"model": "llama2", "prompt": "Merhaba!", "stream": false}'
```

## ⚡ **5. Performans Optimizasyonu**

### GPU Desteği (NVIDIA):
```bash
# CUDA kurulu olmalı
ollama pull llama2
# GPU otomatik olarak kullanılacak
```

### RAM Optimizasyonu:
- **8GB RAM**: 7B modeller için yeterli
- **16GB RAM**: 13B modeller için önerilen
- **32GB+ RAM**: 70B modeller için gerekli

### CPU Optimizasyonu:
```bash
# CPU thread sayısını ayarlayın
export OLLAMA_NUM_PARALLEL=4
export OLLAMA_MAX_LOADED_MODELS=2
```

## 🔒 **6. Güvenlik**

### Yerel Kullanım:
- Ollama sadece localhost'ta çalışır (127.0.0.1:11434)
- Dışarıdan erişim yok
- API anahtarı gerektirmez

### Firewall:
Windows Firewall Ollama'yı otomatik olarak izin verir.

## 🐛 **7. Sorun Giderme**

### Ollama Başlamıyor:
```bash
# Servis durumunu kontrol edin
ollama list

# Manuel başlatma
ollama serve
```

### Model İndirme Hatası:
```bash
# Disk alanını kontrol edin
ollama list

# Yeniden indirin
ollama pull llama2
```

### Yavaş Yanıtlar:
1. Daha küçük model kullanın (7B yerine 13B)
2. GPU desteğini kontrol edin
3. RAM kullanımını izleyin

### Web Projesi Bağlanamıyor:
1. Ollama'nın çalıştığını kontrol edin: `ollama list`
2. Port 11434'ün açık olduğunu kontrol edin
3. Browser console'da hata mesajlarını kontrol edin

## 📊 **8. Model Karşılaştırması**

| Model | Boyut | RAM | Hız | Kalite | Önerilen Kullanım |
|-------|-------|-----|-----|--------|-------------------|
| llama2:7b | 3.8GB | 4GB | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Genel kullanım |
| llama2:13b | 7.3GB | 8GB | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Daha kaliteli yanıtlar |
| codellama:7b | 3.8GB | 4GB | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Kod yazma |
| mistral:7b | 4.1GB | 4GB | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Hızlı ve kaliteli |
| gemma:7b | 5.4GB | 6GB | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Google kalitesi |

## 🎯 **9. Kullanım İpuçları**

### En İyi Deneyim İçin:
1. **İlk kurulum**: `llama2:7b` ile başlayın
2. **RAM yeterliyse**: `llama2:13b` kullanın
3. **Kod yazıyorsanız**: `codellama` kullanın
4. **Hız önemliyse**: `mistral` kullanın

### Prompt İpuçları:
- Türkçe sorular için: "Türkçe olarak yanıtla: [sorunuz]"
- Kod için: "Bu kodu açıkla: [kod]"
- Özet için: "Özetle: [metin]"

## 🚀 **10. Gelişmiş Özellikler**

### Özel Model Eğitimi:
```bash
# Kendi modelinizi oluşturun
ollama create mymodel -f Modelfile
```

### Batch İşlemler:
```bash
# Birden fazla modeli paralel çalıştırın
ollama pull llama2 codellama mistral
```

### API Entegrasyonu:
```javascript
// JavaScript ile Ollama API
const response = await fetch('http://localhost:11434/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'llama2',
    prompt: 'Merhaba!',
    stream: false
  })
});
```

---

## ✅ **Kurulum Tamamlandı!**

Artık web projenizde:
- 🤖 **Ollama kontrol paneli** görünecek
- 🔄 **Model seçimi** yapabileceksiniz  
- ⚡ **Yerel AI** kullanabileceksiniz
- 🔒 **API anahtarı gerektirmeyecek**
- 💰 **Tamamen ücretsiz** olacak

**Not**: Ollama sadece bilgisayarınızda çalışır. Başka kullanıcılar Ollama'nızı kullanamaz.
