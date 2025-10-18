# 🔍 Debug Kılavuzu

## ✅ **Mevcut Durum:**

### **Servisler Çalışıyor:**
- ✅ Backend: `http://localhost:8000` - Çalışıyor
- ✅ Frontend: `http://localhost:3000` - Çalışıyor
- ✅ API Test: `/api/chat` - 200 OK yanıt veriyor

### **Test Sonuçları:**
```bash
POST /api/chat
Body: {"message": "Merhaba", "conversation_id": "new"}
Response: 200 OK - Assistant yanıt verdi ✅
```

## 🎯 **Browser'da Test Etme:**

### **1. Uygulamayı Açın:**
```
http://localhost:3000
```

### **2. Yeni Sohbet Oluşturun:**
- Sol panelde "Yeni Sohbet" butonuna tıklayın
- Veya doğrudan mesaj yazmaya başlayın

### **3. Mesaj Gönderin:**
- Input alanına "Merhaba" yazın
- Enter'a basın veya Gönder butonuna tıklayın

### **4. Beklenen Sonuç:**
- Assistant cevap vermelidir
- Mesaj geçmişi görünmelidir

## 🔧 **Eğer Hala Çalışmıyorsa:**

### **Browser Console Kontrol:**
1. F12 tuşuna basın
2. Console sekmesine gidin
3. Hata mesajlarını kontrol edin

### **Network Kontrol:**
1. F12 tuşuna basın
2. Network sekmesine gidin
3. Mesaj gönderirken API çağrılarını kontrol edin

### **Olası Hatalar:**
- CORS hatası
- API bağlantı hatası
- JavaScript hatası

## 🚀 **Test Adımları:**

1. ✅ Backend çalışıyor (port 8000)
2. ✅ Frontend çalışıyor (port 3000)
3. ✅ API endpoint çalışıyor
4. 🔄 Browser'da test edin

## 📊 **Sonuç:**

Sistem tamamen hazır! Browser'da `http://localhost:3000` açıp test edin.
