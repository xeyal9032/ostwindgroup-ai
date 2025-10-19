# 🆓 Ücretsiz AI API Rehberi

## 🎯 **Amaç:**
Diğer kullanıcıların da ücretsiz olarak AI kullanabilmesi için çeşitli ücretsiz API seçenekleri.

## 🚀 **Ücretsiz AI API'leri:**

### **1. Hugging Face Inference API**
- **Ücretsiz**: ✅ Evet
- **API Key**: ❌ Gerekmez
- **Limit**: Günde 1000 istek
- **Model**: DialoGPT-medium
- **Hız**: Orta
- **Kalite**: İyi

```javascript
// Kullanım
const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    inputs: message,
    parameters: { max_length: 150, temperature: 0.7 }
  })
});
```

### **2. Groq API**
- **Ücretsiz**: ✅ Evet (sınırlı)
- **API Key**: ✅ Gerekir (ücretsiz)
- **Limit**: Dakikada 30 istek
- **Model**: Llama3-8b-8192
- **Hız**: Çok hızlı
- **Kalite**: Çok iyi

```javascript
// Kullanım
const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_FREE_API_KEY'
  },
  body: JSON.stringify({
    model: 'llama3-8b-8192',
    messages: [{ role: 'user', content: message }],
    max_tokens: 1000
  })
});
```

### **3. Together AI**
- **Ücretsiz**: ✅ Evet (sınırlı)
- **API Key**: ✅ Gerekir (ücretsiz)
- **Limit**: Aylık 1M token
- **Model**: Llama2-7b-chat
- **Hız**: Hızlı
- **Kalite**: İyi

```javascript
// Kullanım
const response = await fetch('https://api.together.xyz/inference', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_FREE_API_KEY'
  },
  body: JSON.stringify({
    model: 'meta-llama/Llama-2-7b-chat-hf',
    prompt: message,
    max_tokens: 1000
  })
});
```

### **4. Replicate API**
- **Ücretsiz**: ✅ Evet (sınırlı)
- **API Key**: ✅ Gerekir (ücretsiz)
- **Limit**: Aylık 1000 istek
- **Model**: Llama2-7b
- **Hız**: Orta
- **Kalite**: İyi

### **5. Cohere API**
- **Ücretsiz**: ✅ Evet (sınırlı)
- **API Key**: ✅ Gerekir (ücretsiz)
- **Limit**: Aylık 1000 istek
- **Model**: Command
- **Hız**: Hızlı
- **Kalite**: Çok iyi

## 🔧 **API Key Alma Rehberi:**

### **Groq API Key:**
1. https://console.groq.com/ adresine gidin
2. "Sign Up" ile kayıt olun
3. "API Keys" bölümüne gidin
4. "Create API Key" tıklayın
5. API key'i kopyalayın

### **Together AI API Key:**
1. https://api.together.xyz/ adresine gidin
2. "Sign Up" ile kayıt olun
3. "API Keys" bölümüne gidin
4. Yeni API key oluşturun

### **Replicate API Key:**
1. https://replicate.com/ adresine gidin
2. Kayıt olun
3. "Account" > "API Tokens"
4. Yeni token oluşturun

## 🎯 **Önerilen Strateji:**

### **1. Aşamalı Yaklaşım:**
```javascript
const freeApis = [
  { name: 'Hugging Face', priority: 1, noKey: true },
  { name: 'Groq', priority: 2, needsKey: true },
  { name: 'Together AI', priority: 3, needsKey: true },
  { name: 'Akıllı Fallback', priority: 4, noKey: true }
];
```

### **2. Fallback Sistemi:**
- **1. Önce** Hugging Face (API key gerektirmez)
- **2. Sonra** Groq (hızlı ve kaliteli)
- **3. Sonra** Together AI (güvenilir)
- **4. Son olarak** Akıllı Fallback (her zaman çalışır)

## 📊 **API Karşılaştırması:**

| API | Ücretsiz | Hız | Kalite | API Key | Limit |
|-----|----------|-----|--------|---------|-------|
| Hugging Face | ✅ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ❌ | 1000/gün |
| Groq | ✅ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ | 30/dakika |
| Together AI | ✅ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ | 1M/ay |
| Replicate | ✅ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ | 1000/ay |
| Cohere | ✅ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ | 1000/ay |

## 🚀 **Uygulama:**

### **Netlify Functions'da:**
```javascript
// chat.js içinde
const freeApis = [
  {
    name: 'Hugging Face',
    url: 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
    // ... konfigürasyon
  },
  {
    name: 'Groq',
    url: 'https://api.groq.com/openai/v1/chat/completions',
    // ... konfigürasyon
  }
];
```

### **Environment Variables:**
```bash
# Netlify'da ayarlayın
GROQ_API_KEY=your_groq_api_key
TOGETHER_API_KEY=your_together_api_key
REPLICATE_API_KEY=your_replicate_api_key
```

## 💡 **İpuçları:**

### **Performans Optimizasyonu:**
1. **Hugging Face** ilk deneyin (API key gerektirmez)
2. **Groq** en hızlı ve kaliteli
3. **Together AI** güvenilir fallback
4. **Akıllı Fallback** her zaman çalışır

### **Hata Yönetimi:**
```javascript
try {
  const response = await fetch(api.url, options);
  if (response.ok) {
    return await response.json();
  }
} catch (error) {
  console.error(`${api.name} hatası:`, error);
  // Sonraki API'yi dene
}
```

### **Rate Limiting:**
- **Hugging Face**: Günde 1000 istek
- **Groq**: Dakikada 30 istek
- **Together AI**: Aylık 1M token

## 🎯 **Sonuç:**

Bu sistemle:
- ✅ **Tüm kullanıcılar** ücretsiz AI kullanabilir
- ✅ **API key gerektirmez** (Hugging Face)
- ✅ **Hızlı yanıtlar** (Groq)
- ✅ **Güvenilir fallback** (Akıllı sistem)
- ✅ **Maliyet yok** (tamamen ücretsiz)

**Not**: API key'ler opsiyonel - Hugging Face API key gerektirmez!
