// Gelişmiş Akıllı Yanıt Motoru - OstWindGroup AI
const IntelligentResponseEngine = require('./intelligent-engine');

exports.handler = async (event, context) => {
  console.log('=== OSTWINDGROUP AI CHAT FUNCTION ===');
  console.log('Method:', event.httpMethod);
  console.log('Body:', event.body);
  
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const body = JSON.parse(event.body);
    const { conversation_id, message } = body;
    
    console.log('Message:', message);
    
    if (!message || !message.trim()) {
      return { 
        statusCode: 400, 
        headers, 
        body: JSON.stringify({ error: 'Message is required' }) 
      };
    }

    const lowerCaseMessage = message.toLowerCase();
    let aiResponse = '';

    // Özel durumlar için hızlı yanıtlar (En önce kontrol edilmeli)
    if (lowerCaseMessage.includes('saat') && (lowerCaseMessage.includes('kaç') || lowerCaseMessage.includes('ne'))) {
      const now = new Date();
      const timeString = now.toLocaleTimeString('tr-TR');
      aiResponse = `🕐 Şu an saat **${timeString}** (Türkiye saati)\n\nBaşka bir konuda yardıma ihtiyacınız var mı?`;
    } else if (lowerCaseMessage.includes('tarih') || lowerCaseMessage.includes('bugün')) {
      const now = new Date();
      const dateString = now.toLocaleDateString('tr-TR', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      aiResponse = `📅 Bugün **${dateString}**\n\nBaşka bir konuda yardıma ihtiyacınız var mı?`;
    } else if (lowerCaseMessage.includes('teşekkür') || lowerCaseMessage.includes('sağol') || lowerCaseMessage.includes('thanks')) {
      aiResponse = `😊 Rica ederim! Size yardımcı olabildiğim için mutluyum. Başka sorularınız varsa çekinmeden sorun!`;
    } else if (lowerCaseMessage.includes('hoşçakal') || lowerCaseMessage.includes('görüşürüz') || lowerCaseMessage.includes('bye')) {
      aiResponse = `👋 Hoşçakalın! Size yardımcı olabildiğim için mutluyum. Tekrar görüşmek üzere!`;
    } else if (lowerCaseMessage.includes('nasılsın') || lowerCaseMessage.includes('nasilsin') || lowerCaseMessage.includes('nasıl gidiyor')) {
      aiResponse = `😊 Teşekkürler, iyiyim! Size nasıl yardımcı olabilirim? Hangi konuda bilgi almak istersiniz?\n\nSize şu konularda yardımcı olabilirim:\n🤖 **Yapay Zeka & Makine Öğrenmesi**\n💻 **Programlama & Yazılım Geliştirme**\n🌐 **Web Geliştirme & Tasarım**\n📊 **Veri Analizi & Görselleştirme**\n🎨 **UI/UX Tasarım**\n💡 **Proje Yönetimi & Strateji**\n🇺🇦 **Ukrayna Üniversiteleri**\n\nHangi konuda detaylı bilgi almak istersiniz?`;
    } else if (lowerCaseMessage.includes('merhaba') || lowerCaseMessage.includes('selam') || lowerCaseMessage.includes('hello')) {
      aiResponse = `👋 Merhaba! OstWindGroup AI asistanınıza hoş geldiniz. Size nasıl yardımcı olabilirim?\n\nSize şu konularda yardımcı olabilirim:\n🤖 **Yapay Zeka & Makine Öğrenmesi**\n💻 **Programlama & Yazılım Geliştirme**\n🌐 **Web Geliştirme & Tasarım**\n📊 **Veri Analizi & Görselleştirme**\n🎨 **UI/UX Tasarım**\n💡 **Proje Yönetimi & Strateji**\n🇺🇦 **Ukrayna Üniversiteleri**\n\nHangi konuda bilgi almak istersiniz?`;
    } else if (lowerCaseMessage.includes('ne yapabilirsin') || lowerCaseMessage.includes('ne yapa biliyon') || lowerCaseMessage.includes('yeteneklerin')) {
      aiResponse = `🚀 Size şu konularda yardımcı olabilirim:\n\n🤖 **Yapay Zeka & Makine Öğrenmesi**\n• AI modelleri ve algoritmalar\n• Chatbot geliştirme\n• Veri analizi ve görselleştirme\n\n💻 **Kod Yazma & Programlama**\n• JavaScript, Python, Java, C#\n• Web geliştirme (React, Vue, Angular)\n• Mobil uygulama geliştirme\n• Veritabanı tasarımı\n\n🎨 **Tasarım & UI/UX**\n• Web ve mobil tasarım\n• Kullanıcı deneyimi optimizasyonu\n• Prototipleme ve wireframing\n\n📊 **Proje Yönetimi**\n• Proje planlama ve organizasyon\n• Teknik dokümantasyon\n• Test stratejileri\n\n🇺🇦 **Ukrayna Üniversiteleri**\n• Üniversite bilgileri ve fakülteler\n• Təhsil haqları ve şərtlər\n• Fakültə kodları ve açıqlamaları\n• Kariyer rehberliği\n\n💡 **İnovasyon & Fikirler**\n• Yeni proje fikirleri\n• Teknoloji trendleri\n• Çözüm önerileri\n\nHangi konuda detaylı bilgi almak istersiniz?`;
    } else if (lowerCaseMessage.includes('biotexnologiya') && lowerCaseMessage.includes('universitesi')) {
      aiResponse = '## 🎓 Ukrayna Dövlət Biotexnologiya Universiteti\n\n**Ukraynca adı:** Державний біотехнологічний університет\n\n**Statusu:** Dövlət\n**Akkreditasiyası:** IV\n**Təhsil forması:** əyani, qiyabi\n**Təhsil mərhələləri:** Bakalavr, Magistr\n**Təhsil müddəti əyani:** 4 il\n**Təhsil müddəti qiyabi:** 4 il\n\n### 💰 Təhsil Haqları\n\n**Bakalavr:**\n• Əyani təhsil:\n  - Rus/Ukrayn dilində: 1-ci il: 1600USD, 2-4-cü il: 1300USD\n  - İngilis dilində: 1-ci il: 1900USD, 2-4-cü il: 1600USD\n• Qiyabi təhsil:\n  - Rus/Ukrayn dilində: 1-ci il: 1300USD, 2-4-cü il: 1000USD\n  - İngilis dilində: 1-ci il: 1600USD, 2-4-cü il: 1300USD\n\n**Magistr:**\n• Əyani təhsil:\n  - Rus/Ukrayn dilində: 1-ci il: 1900USD, 2-ci yarım il: 950USD\n  - İngilis dilində: 1-ci il: 2100USD, 2-ci yarım il: 1050USD\n• Qiyabi təhsil:\n  - Rus/Ukrayn dilində: 1-ci il: 1900USD, 2-ci yarım il: 950USD\n  - İngilis dilində: 1-ci il: 1800USD, 2-ci yarım il: 900USD\n\n**Təhsil sığortası:** 4 illik təhsil sığortası: 300USD\n\n### 📚 Fakültələr\n\n• 051. İqtisadiyyat\n• 071. Mühasibat uçotu və vergi\n• 072. Maliyyə, bank və sığorta\n• 073. Menecment\n• 075. Marketinq\n• 076. Sahibkarlıq, ticarət və birja fəaliyyəti\n• 281. Dövlət idarəçiliyi və idarəetmə\n• 292. Beynəlxalq iqtisadi münasibətlər\n• 081. Hüquq\n• 101. Ekologiya\n• 131. Tətbiqi mexanika\n• 133. Sahə maşınqayırma\n• 141. Elektroenergetika, elektroavadanlıq və elektromexanika\n• 151. Avtomatlaşdırma və kompyuter-inteqrasiya texnologiyaları və robot texnologiyaları\n• 162. Biotexnologiya və biomühəndislik\n• 181. Qida texnologiyası\n• 192. Memarlıq, tikinti və mülki mühəndislik\n• 193. Geodeziyası və yer quruluşu\n• 201. Agronomiya\n• 202. Bitki karantini mühafizəsi\n• 204. Heyvandarlıq məhsullarının istehsalı və emalı texnologiyası\n• 205. Meşə təsərrüfatı\n• 206. Landşaft bağçılıq\n• 207. Su bioresursları və akvakultura\n• 208. Aqromühəndislik\n• 241. Otel və restoran biznesi\n• 274. Avtomobil nəqliyyatı\n• 275. Nəqliyyat texnologiyası\n• 211. Baytarlıq\n\nBu universitet haqqında daha ətraflı məlumat almaq istəyirsiniz?';
    } else if (lowerCaseMessage.includes('xarkov') && lowerCaseMessage.includes('politexnik')) {
      aiResponse = '## 🎓 Milli texniki universitet "Xarkov Politexnik institutu"\n\n**Ukraynca adı:** Національний технічний університет «Харківський політехнічний iнститут»\n**Qısa adı:** ХПІ\n\n**Statusu:** Dövlət\n**Yaranma tarixi:** 1885\n**Akkreditasiyası:** IV\n**Təhsil forması:** əyani, qiyabi\n**Təhsil mərhələləri:** Bakalavr, Magistr\n**Təhsil müddəti əyani:** 4 il\n**Təhsil müddəti qiyabi:** 4 il\n\n### 💰 Təhsil Haqları\n\n**Bakalavr:**\n• Əyani təhsil:\n  - Rus/Ukrayn dilində: 1-ci il: 2250USD, 2-4-cü il: 1650USD\n  - İngilis dilində: 1-ci il: 2300USD, 2-4-cü il: 1700USD\n• Qiyabi təhsil:\n  - Rus/Ukrayn dilində: 1-ci il: 1700USD, 2-4-cü il: 1100USD\n  - İngilis dilində: 1-ci il: 1800USD, 2-4-cü il: 1200USD\n\n**Magistr:**\n• Əyani təhsil:\n  - Rus/Ukrayn dilində: 1-ci il: 2500USD, 2-ci yarım il: 950USD\n  - İngilis dilində: 1-ci il: 2550USD, 2-ci yarım il: 975USD\n• Qiyabi təhsil:\n  - Rus/Ukrayn dilində: 1-ci il: 1600USD, 2-ci yarım il: 500USD\n  - İngilis dilində: 1-ci il: 1700USD, 2-ci yarım il: 550USD\n\n### 📚 Əsas Fakültələr\n\n• 121. Proqram təminatı mühəndisliyi\n• 122. Kompüter elmləri və informasiya texnologiyaları\n• 123. Kompüter mühəndisliyi\n• 125. Kiber təhlükəsizlik\n• 131. Tətbiqi mexanika\n• 133. Maşınqayırma sahəsi\n• 141. Elektroenerjisi, elektrotexnika və elektromekanika sənayesi\n• 151. Avtomatlaşdırma və kompüter inteqrasiya texnologiyaları\n• 161. Kimya texnologiyaları və mühəndisliyi\n• 162. Biotexnologiya və bioenerji\n• 171. Elektronika\n• 172. Telekommunikasiya və radiotexnika\n• 181. Qida texnologiyası\n• 185. Neft-qaz mühəndisliyi və texnologiyası\n• 051. İqtisadiyyat\n• 073. Menecment\n• 075. Marketinq\n• 076. Sahibkarlıq, ticarət və birja fəaliyyəti\n\nBu universitet haqqında daha ətraflı məlumat almaq istəyirsiniz?';
    } else if (lowerCaseMessage.includes('fhN') || lowerCaseMessage.includes('fövqəladə') || lowerCaseMessage.includes('mülki müdafiə')) {
      aiResponse = '## 🎓 Dövlət mülki müdafiə universiteti (FHN)\n\n**Ukraynca adı:** Національний університет цивільного захисту України\n**Qısa adı:** МЧС\n**Alternativ adı:** Fövqəladə hallar universiteti\n\n**Statusu:** Dövlət\n**Yaranma tarixi:** 1928\n**Akkreditasiyası:** IV\n**Təhsil forması:** əyani, qiyabi\n**Təhsil mərhələləri:** Bakalavr, Magistr\n**Təhsil müddəti əyani:** 4 il\n**Təhsil müddəti qiyabi:** 4 il\n\n### 💰 Təhsil Haqları\n\n**Bakalavr:**\n• Əyani təhsil: 1700USD\n• Qiyabi təhsil: 1500USD\n\n**Magistr:**\n• Əyani təhsil: 1.5 il - 3400USD\n• Qiyabi təhsil: 2 il - 4400USD\n\n### 📚 Fakültələr\n\n• 261. Yanğın təhlükəsizliyi\n• 263. Vətəndaş təhlükəsizliyi\n• 161. Kimya texnologiyaları və mühəndisliyi\n• 101. Ekologiya\n• 053. Psixologiya\n• 242. Turizm\n\nBu universitet haqqında daha ətraflı məlumat almaq istəyirsiniz?';
    } else if (lowerCaseMessage.includes('xarkov') && lowerCaseMessage.includes('tib')) {
      aiResponse = '## 🎓 Xarkov Milli Tibb Universiteti\n\n**Ukraynca adı:** Харьковский национальный медицинский университет\n**Qısa adı:** ХНМУ\n\n**Statusu:** Dövlət\n**Təhsil forması:** əyani, qiyabi\n**Təhsil mərhələləri:** Bakalavr, Magistr\n\n### 📚 Fakültələr\n\n• 221. Stomatalogiya\n• 222. Müalicə işi\n• 223. Qulluq (Nursing)\n• 226. Əczaçılıq\n\n### 📋 Əlavə Proqramlar\n\n• Tibbə qədərki hazırlıq kursu\n• Rezidentura\n\nBu universitet haqqında daha ətraflı məlumat almaq istəyirsiniz?';
    } else if (lowerCaseMessage.includes('karazin') || lowerCaseMessage.includes('karazina')) {
      aiResponse = '## 🎓 Karazin adına Xarkov Milli Universiteti\n\n**Ukraynca adı:** Харьковский национальный университет имени В. Н. Каразина\n\n**Statusu:** Dövlət\n**Təhsil forması:** əyani, qiyabi\n**Təhsil mərhələləri:** Bakalavr, Magistr\n\n### 📚 Əsas Fakültələr\n\n• 222. Tibb\n• 081. Hüquq\n• 293. Beynəlxalq hüquq\n• 032. Tarix və arxeologiya\n• 033. Fəlsəfə\n• 034. Kulturologiya\n• 035. Filologiya\n• 051. İqtisadiyyat\n• 052. Siyasiyyat\n• 053. Psixologiya\n• 054. Sosiologiya\n• 061. Jurnalistika\n• 071. Mühasibat uçotu və vergi\n• 072. Maliyyə, bank və sığorta\n• 073. Menecment\n• 075. Marketinq\n• 076. Sahibkarlıq, ticarət və birja fəaliyyəti\n• 091. Biologiya\n• 101. Ekologiya\n• 102. Kimya\n• 103. Geologiya\n• 104. Fizika və astronomiya\n• 111. Riyaziyyat\n• 113. Tətbiqi riyaziyyat\n• 122. Kompyuter elmləri\n• 125. Kiber təhlükəsizlik\n• 151. Avtomatlaşdırma və kompüter-inteqrasiya texnologiyaları\n• 153. Mikro və nanosistem mühəndisliyi\n• 231. Sosial iş\n• 241. Mehmanxana - restoran işi\n• 242. Turizm\n• 281. İctimai idarəetmə və administrasiya\n• 291. Beynəlxalq əlaqələr, sosial rabitə və regional araşdırmalar\n• 292. Beynəlxalq iqtisadi münasibətlər\n\nBu universitet haqqında daha ətraflı məlumat almaq istəyirsiniz?';
    } else if (lowerCaseMessage.includes('aerokosmik') || lowerCaseMessage.includes('aviasiya') || lowerCaseMessage.includes('hava')) {
      aiResponse = '## 🎓 Milli Aerokosmik Universiteti\n\n**Ukraynca adı:** Національний аерокосмічний університет ім. М.Є. Жуковського\n**Qısa adı:** ХАІ\n**Alternativ adı:** Aviasiya Universiteti\n\n**Statusu:** Dövlət\n**Təhsil forması:** əyani, qiyabi\n**Təhsil mərhələləri:** Bakalavr, Magistr\n\n### 📚 Əsas Fakültələr\n\n• 173. Avionka\n• 134. Aviasiya və raket-kosmik texnikası\n• 272. Aviasiya nəqliyyatı\n• 121. Proqram təminatı mühəndisliyi\n• 122. Kompüter elmləri\n• 123. Kompüter mühəndisliyi\n• 125. Kibertəhlükəsizlik\n• 131. Tətbiqi mexanika\n• 133. Sahə maşınqayırma\n• 141. Elektroenergetika, elektrotexnika və elektromexanika\n• 151. Avtomatlaşdırma və kompüter-inteqrasiya texnologiyaları\n• 163. Biyoloji-tibb mühəndisliyi\n• 172. Telekommunikasiya və radiotexnika\n• 193. Geodeziyası və yer quruluşu\n• 255. Silah və hərbi texnika\n• 274. Avtomobil nəqliyyatı\n• 051. İqtisadiyyat\n• 292. Beynəlxalq iqtisadi münasibətlər\n• 071. Uçot və vergitutma\n• 072. Maliyyə, bank işi və sığorta\n• 073. Menecment\n• 075. Marketinq\n• 076. Sahibkarlıq, ticarət və birja fəaliyyəti\n\nBu universitet haqqında daha ətraflı məlumat almaq istəyirsiniz?';
    } else if (lowerCaseMessage.includes('fiyat') || lowerCaseMessage.includes('qiymet') || lowerCaseMessage.includes('haqq') || lowerCaseMessage.includes('təhsil haqqı')) {
      aiResponse = '## 💰 Ukrayna Üniversiteleri Təhsil Haqları\n\n### 📊 **Təhsil Haqları Sıralaması:**\n\n**🏥 Tibb Fakültələri (Ən Bahalı):**\n• Xarkov Milli Tibb Universiteti: 2000-3000USD\n• Stomatologiya: 2500-3500USD\n• Əczaçılıq: 2000-2500USD\n\n**🔬 Texniki və Mühəndislik:**\n• Xarkov Politexnik: 1650-2500USD\n• Aerokosmik Universitet: 1500-2000USD\n• Biotexnologiya: 1300-1900USD\n\n**📚 Sosial və İqtisadi:**\n• Karazin Universiteti: 1500-2000USD\n• İqtisadiyyat: 1200-1800USD\n• Hüquq: 1500-2000USD\n\n**🛡️ Xüsusi Sahələr:**\n• Mülki müdafiə (МЧС): 1500-1700USD\n• Yanğın təhlükəsizliyi: 1500-1700USD\n\n### 💡 **Təhsil Haqları Detalları:**\n\n**Bakalavr:**\n• **1-ci il:** 1600-2500USD\n• **2-4-cü il:** 1300-2000USD\n\n**Magistr:**\n• **1-ci il:** 1900-3000USD\n• **2-ci yarım il:** 950-1500USD\n\n**Qiyabi Təhsil:**\n• **Bakalavr:** 1000-1600USD\n• **Magistr:** 1600-2500USD\n\n### 🌍 **Dil Seçimi:**\n• **Rus/Ukrayn dili:** Standart qiymət\n• **İngilis dili:** +200-400USD əlavə\n\n### 📋 **Əlavə Xərclər:**\n• **Təhsil sığortası:** 300USD (4 il)\n• **Yaşayış:** 200-500USD/ay\n• **Yemək:** 150-300USD/ay\n• **Nəqliyyat:** 50-100USD/ay\n\n### 💰 **Ümumi Bütçə (İl):**\n• **Minimum:** 3000-4000USD\n• **Orta:** 5000-7000USD\n• **Maksimum:** 8000-12000USD\n\nHangi universitetin konkret təhsil haqları haqqında məlumat almaq istəyirsiniz?';
    } else if (lowerCaseMessage.includes('fakulteler') || lowerCaseMessage.includes('fakulteler') || lowerCaseMessage.includes('bölümler') || lowerCaseMessage.includes('ixtisaslar')) {
      aiResponse = '## 📚 Ukrayna Üniversiteleri Fakültələri\n\n### 🎓 **Ən Populyar Fakültələr:**\n\n**💻 İT və Texnologiya:**\n• 121. Proqram təminatı mühəndisliyi\n• 122. Kompüter elmləri və informasiya texnologiyaları\n• 123. Kompüter mühəndisliyi\n• 125. Kiber təhlükəsizlik\n• 151. Avtomatlaşdırma və kompüter-inteqrasiya texnologiyaları\n\n**🏥 Tibb və Sağlamlıq:**\n• 221. Stomatalogiya\n• 222. Müalicə işi\n• 223. Qulluq (Nursing)\n• 226. Əczaçılıq\n• 211. Baytarlıq\n• 162. Biotexnologiya və biomühəndislik\n\n**⚖️ Hüquq və İctimai:**\n• 081. Hüquq\n• 293. Beynəlxalq hüquq\n• 281. Dövlət idarəçiliyi və idarəetmə\n• 231. Sosial iş\n\n**💰 İqtisadi və Biznes:**\n• 051. İqtisadiyyat\n• 071. Mühasibat uçotu və vergi\n• 072. Maliyyə, bank və sığorta\n• 073. Menecment\n• 075. Marketinq\n• 076. Sahibkarlıq, ticarət və birja fəaliyyəti\n\n**🔬 Texniki və Mühəndislik:**\n• 131. Tətbiqi mexanika\n• 133. Sahə maşınqayırma\n• 141. Elektroenergetika, elektrotexnika və elektromexanika\n• 171. Elektronika\n• 172. Telekommunikasiya və radiotexnika\n• 181. Qida texnologiyası\n• 192. Memarlıq, tikinti və mülki mühəndislik\n\n**✈️ Aviasiya və Kosmik:**\n• 173. Avionka\n• 134. Aviasiya və raket-kosmik texnikası\n• 272. Aviasiya nəqliyyatı\n• 255. Silah və hərbi texnika\n\n**🌱 Ağrar və Təbiət:**\n• 201. Agronomiya\n• 202. Bitki karantini mühafizəsi\n• 204. Heyvandarlıq məhsullarının istehsalı və emalı texnologiyası\n• 205. Meşə təsərrüfatı\n• 206. Landşaft bağçılıq\n• 207. Su bioresursları və akvakultura\n• 208. Aqromühəndislik\n\n**🎨 Sosial və Humanitar:**\n• 032. Tarix və arxeologiya\n• 033. Fəlsəfə\n• 034. Kulturologiya\n• 035. Filologiya\n• 052. Siyasiyyat\n• 053. Psixologiya\n• 054. Sosiologiya\n• 061. Jurnalistika\n• 091. Biologiya\n• 101. Ekologiya\n• 102. Kimya\n• 103. Geologiya\n• 104. Fizika və astronomiya\n• 111. Riyaziyyat\n• 113. Tətbiqi riyaziyyat\n\n**🛡️ Təhlükəsizlik:**\n• 261. Yanğın təhlükəsizliyi\n• 263. Vətəndaş təhlükəsizliyi\n\n**🏨 Xidmət:**\n• 241. Otel və restoran biznesi\n• 242. Turizm\n• 274. Avtomobil nəqliyyatı\n• 275. Nəqliyyat texnologiyası\n\nHangi konkret fakültə haqqında ətraflı məlumat almaq istəyirsiniz?';
    } else if (lowerCaseMessage.includes('en ucuz') || lowerCaseMessage.includes('en baha') || lowerCaseMessage.includes('karşılaştır') || lowerCaseMessage.includes('fark')) {
      aiResponse = '## 📊 Ukrayna Üniversiteleri Karşılaştırması\n\n### 💰 **Təhsil Haqlarına Görə Sıralama:**\n\n**🟢 ƏN UCUZ ÜNİVERSİTELER (1000-1500USD):**\n• **Sosial elmlər fakültələri**\n• **İqtisadiyyat** (bəzi universitetlərdə)\n• **Pedagogika**\n• **Filologiya**\n\n**🟡 ORTA QİYMƏTLİ (1500-2000USD):**\n• **Karazin Universiteti** (ümumi fakültələr)\n• **Aerokosmik Universitet** (texniki)\n• **Biotexnologiya** (ağır texniki)\n• **Mülki müdafiə** (МЧС)\n\n**🔴 ƏN BAHALI (2000-3000USD):**\n• **Xarkov Milli Tibb Universiteti**\n• **Xarkov Politexnik** (texniki)\n• **Stomatologiya**\n• **Əczaçılıq**\n\n### 🏆 **Populyarlığa Görə Sıralama:**\n\n**1. Karazin Universiteti**\n• ✅ Ən köhnə və prestijli\n• ✅ Geniş fakültə seçimi\n• ✅ Orta qiymət\n• ❌ Çox tələbə\n\n**2. Xarkov Politexnik**\n• ✅ Texniki keyfiyyət\n• ✅ İş imkanları\n• ❌ Bahalı\n• ❌ Çətin\n\n**3. Aerokosmik Universitet**\n• ✅ Unikal sahə\n• ✅ Yaxşı iş imkanları\n• ✅ Orta qiymət\n• ❌ Məhdud fakültələr\n\n**4. Biotexnologiya**\n• ✅ Müasir sahə\n• ✅ Praktiki təhsil\n• ✅ Ucuz\n• ❌ Az tanınır\n\n### 🎯 **Sahəyə Göre Tövsiyələr:**\n\n**💻 İT ve Texnologiya:**\n• 1. Xarkov Politexnik\n• 2. Aerokosmik Universitet\n• 3. Karazin Universiteti\n\n**🏥 Tibb:**\n• 1. Xarkov Milli Tibb Universiteti\n• 2. Karazin Universiteti\n\n**⚖️ Hüquq ve İqtisadiyyat:**\n• 1. Karazin Universiteti\n• 2. Biotexnologiya Universiteti\n\n**🔬 Texniki Mühəndislik:**\n• 1. Xarkov Politexnik\n• 2. Aerokosmik Universitet\n• 3. Biotexnologiya Universiteti\n\nHangi konkret universiteti müqayisə etmək istəyirsiniz?';
    } else if (lowerCaseMessage.includes('hangi') && lowerCaseMessage.includes('universiteler') && lowerCaseMessage.includes('var')) {
      aiResponse = '## 🎓 Ukrayna Üniversiteleri\n\nUkrayna\'da birçok kaliteli üniversite bulunmaktadır. İşte en popüler olanları:\n\n### 🏛️ **Xarkov Bölgesi Üniversiteleri:**\n\n**1. Karazin adına Xarkov Milli Universiteti**\n• En eski ve prestijli üniversitelerden biri\n• Geniş fakültə yelpazəsi (hüquq, tibb, iqtisadiyyat, texniki elmlər)\n• Təhsil haqları: 1500-2500USD\n\n**2. Milli texniki universitet "Xarkov Politexnik institutu" (ХПІ)**\n• 1885-ci ildə yaradılıb\n• Texniki ve mühəndislik fakültələri\n• Təhsil haqları: 1650-2500USD\n\n**3. Milli Aerokosmik Universiteti (ХАІ)**\n• Aviasiya ve kosmik texnologiyalar\n• Raket-kosmik texnikası\n• Təhsil haqları: 1500-2000USD\n\n**4. Ukrayna Dövlət Biotexnologiya Universiteti**\n• Biotexnologiya ve biomühəndislik\n• Aqrar ve qida texnologiyaları\n• Təhsil haqları: 1300-1900USD\n\n**5. Xarkov Milli Tibb Universiteti (ХНМУ)**\n• Tibb, stomatologiya, əczaçılıq\n• Rezidentura proqramları\n• Təhsil haqları: 2000-3000USD\n\n**6. Dövlət mülki müdafiə universiteti (МЧС)**\n• Yanğın təhlükəsizliyi\n• Vətəndaş təhlükəsizliyi\n• Təhsil haqları: 1500-1700USD\n\n### 💰 **Təhsil Haqları Ümumi Məlumat:**\n• **Ən ucuz:** 1000-1500USD (sosial elmlər)\n• **Orta:** 1500-2000USD (texniki fakültələr)\n• **Ən baha:** 2000-3000USD (tibb fakültələri)\n• **İngilis dili:** +200-400USD əlavə\n\n### 📋 **Ümumi Şərtlər:**\n• **Təhsil müddəti:** 4 il (bakalavr)\n• **Təhsil forması:** əyani ve qiyabi\n• **Təhsil sığortası:** 300USD\n• **Dil seçimi:** Rus, Ukrayn, İngilis\n\nHangi konkret universitet haqqında ətraflı məlumat almaq istəyirsiniz?';
    } else if (lowerCaseMessage.includes('telebe') || lowerCaseMessage.includes('telebe.biz.ua') || lowerCaseMessage.includes('telebe biz ua')) {
      aiResponse = '## 🎓 Telebe.Biz.Ua - Ukrayna\'da Təhsil\n\n[Telebe.Biz.Ua](https://telebe.biz.ua/) Ukrayna\'da təhsil üçün ən etibarlı platformadır!\n\n### 📞 **Əlaqə Məlumatları:**\n• **Telefon:** +380 96 258 00 00\n• **Telefon 2:** +380 97 258 00 00\n• **Email:** info@telebe.biz.ua\n• **Ünvan:** Bakı şəhəri, Rüstəm Rüstəmov 44, Neftçilər metrosunun yanı\n\n### 🎯 **Xidmətlər:**\n• **Universitetlər** - Bütün Ukrayna universitetləri\n• **İxtisaslar** - Geniş fakültə seçimi\n• **Bakalavriat** - 4 illik təhsil\n• **Magistratura** - Magistr dərəcəsi\n• **Rezidentura** - Tibb rezidenturası\n• **Qəbul sənədləri** - Sənəd hazırlığı\n\n### ✅ **2024/2025 Tədris İli:**\n• **Sənəd qəbulu başlayıb**\n• **Əyani və ya qiyabi** təhsil\n• **Attestatla** qəbul\n• **Kollec və ya texnikom diplomu ilə**\n• **Akademik arayışla**\n• **İmtahansız** qəbul\n• **Ukraynaya gəlmədən** qəbul\n• **Onlayn forma** ilə\n\n### 🏛️ **Populyar Universitetlər:**\n• **Karazin adına Xarkov Milli Universiteti**\n• **Xarkov Politexnik institutu**\n• **Xarkov Milli Tibb Universiteti**\n• **Aerokosmik Universiteti**\n• **Biotexnologiya Universiteti**\n• **Mülki müdafiə universiteti (МЧС)**\n• **Polis Akademiyası**\n• **FHN Akademiyası**\n\n### 💰 **Təhsil Xərcləri:**\n• **Bakalavr:** 1000-3000USD\n• **Magistr:** 1500-4000USD\n• **Rezidentura:** 2000-5000USD\n• **Təhsil sığortası:** 300USD\n\n### 📋 **Qəbul Sənədləri:**\n• **Attestat** (şəhadətnamə)\n• **Pasport**\n• **Foto** (3x4)\n• **Sağlamlıq arayışı**\n• **Akademik sertifikat** (köçürülmə üçün)\n\n### 🌟 **Xüsusiyyətlər:**\n• **İmtahansız qəbul**\n• **Attestatla təhsil**\n• **Onlayn qəbul**\n• **Akkreditasiya və Nostrifikasiya**\n• **Dövlət proqramı**\n• **ASAN xidmətlər**\n\n### 📚 **Məqalələr və Məlumatlar:**\n• **Ukraynada təhsil Onlayndır ya Distant?**\n• **Ümumvətəndaş pasportlarının verilməsi**\n• **Xaricdə necə təhsil ala bilərəm?**\n• **Magistratura üzrə tələb olunan sənədlər**\n• **Bakalavriat üzrə tələb olunan sənədlər**\n\n**Telebe.Biz.Ua** ilə Ukrayna\'da təhsil almaq çox asandır! Hangi konkret məlumat lazımdır?';
    } else if (lowerCaseMessage.includes('qəbul') || lowerCaseMessage.includes('qabul') || lowerCaseMessage.includes('kabul')) {
      aiResponse = '## 📋 Ukrayna Üniversitelerine Qəbul\n\n[Telebe.Biz.Ua](https://telebe.biz.ua/) ilə qəbul çox asandır!\n\n### ✅ **2024/2025 Tədris İli Qəbul:**\n• **Sənəd qəbulu başlayıb**\n• **İmtahansız qəbul**\n• **Attestatla qəbul**\n• **Onlayn forma** ilə\n• **Ukraynaya gəlmədən** qəbul\n\n### 📞 **Qəbul üçün Əlaqə:**\n• **Telefon:** +380 96 258 00 00\n• **Telefon 2:** +380 97 258 00 00\n• **Email:** info@telebe.biz.ua\n\n### 📋 **Tələb Olunan Sənədlər:**\n• **Attestat** (şəhadətnamə)\n• **Pasport**\n• **Foto** (3x4)\n• **Sağlamlıq arayışı**\n• **Akademik sertifikat** (köçürülmə üçün)\n\n### 🎯 **Qəbul Şərtləri:**\n• **Əyani və ya qiyabi** təhsil\n• **Kollec və ya texnikom diplomu ilə**\n• **Akademik arayışla**\n• **İmtahansız**\n\n### 🏛️ **Populyar Universitetlər:**\n• **Karazin Universiteti**\n• **Xarkov Politexnik**\n• **Tibb Universiteti**\n• **Aerokosmik Universitet**\n• **Biotexnologiya Universitet**\n• **МЧС Universitet**\n\nHangi universitetə qəbul olmaq istəyirsiniz?';
    } else if (lowerCaseMessage.includes('sənəd') || lowerCaseMessage.includes('senəd') || lowerCaseMessage.includes('belge')) {
      aiResponse = '## 📄 Qəbul Sənədləri\n\n[Telebe.Biz.Ua](https://telebe.biz.ua/) ilə sənəd hazırlığı çox asandır!\n\n### 📋 **Əsas Sənədlər:**\n• **Attestat** (şəhadətnamə) - orijinal və tərcümə\n• **Pasport** - orijinal və kopya\n• **Foto** (3x4) - 6 ədəd\n• **Sağlamlıq arayışı** - tibb müəssisəsindən\n• **Akademik sertifikat** - köçürülmə üçün\n\n### 📞 **Sənəd Yardımı:**\n• **Telefon:** +380 96 258 00 00\n• **Email:** info@telebe.biz.ua\n• **Ünvan:** Bakı şəhəri, Rüstəm Rüstəmov 44\n\n### 🔄 **Sənəd Prosesi:**\n• **Sənədləri göndərin** - e-poçt ilə\n• **Yoxlama** - Telebe.Biz.Ua tərəfindən\n• **Tərcümə** - lazım olduqda\n• **Apostil** - beynəlxalq tanınma\n• **Təsdiq** - universitet tərəfindən\n\n### ⚡ **Xidmətlər:**\n• **Akkreditasiya və Nostrifikasiya**\n• **Dövlət proqramı**\n• **ASAN xidmətlər**\n• **Leqalizachiya**\n\nHangi sənəd haqqında məlumat lazımdır?';
    } else if (lowerCaseMessage.includes('magistr') || lowerCaseMessage.includes('magistratura')) {
      aiResponse = '## 🎓 Magistratura\n\n[Telebe.Biz.Ua](https://telebe.biz.ua/) ilə magistratura təhsili!\n\n### 📚 **Magistratura Proqramları:**\n• **2 illik təhsil**\n• **Bakalavr diplomu ilə**\n• **İxtisaslaşma**\n• **Elmi iş**\n\n### 📋 **Magistratura üçün Sənədlər:**\n• **Bakalavr diplomu**\n• **Akademik arayış**\n• **Pasport**\n• **Foto** (3x4)\n• **Sağlamlıq arayışı**\n\n### 💰 **Magistratura Təhsil Haqları:**\n• **1-ci il:** 1900-3000USD\n• **2-ci yarım il:** 950-1500USD\n• **Qiyabi:** 1600-2500USD\n\n### 🏛️ **Magistratura Universitetləri:**\n• **Karazin Universiteti**\n• **Xarkov Politexnik**\n• **Tibb Universiteti**\n• **Aerokosmik Universitet**\n• **Biotexnologiya Universitet**\n\n### 📞 **Əlaqə:**\n• **Telefon:** +380 96 258 00 00\n• **Email:** info@telebe.biz.ua\n\nHangi universitetdə magistratura oxumaq istəyirsiniz?';
    } else if (lowerCaseMessage.includes('rezidentura') || lowerCaseMessage.includes('rezident')) {
      aiResponse = '## 🏥 Rezidentura\n\n[Telebe.Biz.Ua](https://telebe.biz.ua/) ilə tibb rezidenturası!\n\n### 🩺 **Rezidentura Proqramları:**\n• **Tibb ixtisasları**\n• **Stomatologiya**\n• **Əczaçılıq**\n• **Praktiki təhsil**\n\n### 📋 **Rezidentura üçün Sənədlər:**\n• **Tibb diplomu**\n• **Akademik arayış**\n• **Pasport**\n• **Foto** (3x4)\n• **Sağlamlıq arayışı**\n\n### 💰 **Rezidentura Təhsil Haqları:**\n• **Tibb:** 2000-5000USD\n• **Stomatologiya:** 2500-3500USD\n• **Əczaçılıq:** 2000-2500USD\n\n### 🏥 **Rezidentura Universitetləri:**\n• **Xarkov Milli Tibb Universiteti**\n• **Karazin Universiteti**\n• **Biotexnologiya Universitet**\n\n### 📞 **Əlaqə:**\n• **Telefon:** +380 96 258 00 00\n• **Email:** info@telebe.biz.ua\n\nHangi tibb ixtisasında rezidentura oxumaq istəyirsiniz?';
    } else if (lowerCaseMessage.includes('xarkov') || lowerCaseMessage.includes('harkov')) {
      aiResponse = '## 🏛️ Xarkov Universitetləri\n\n[Xarkov](https://telebe.biz.ua/) Ukrayna\'nın ən böyük təhsil mərkəzidir!\n\n### 🎓 **Əsas Universitetlər:**\n\n**1. Karazin adına Xarkov Milli Universiteti**\n• 1804-cü ildə yaradılıb\n• Ən köhnə universitet\n• Geniş fakültə yelpazəsi\n• Təhsil haqları: 1500-2500USD\n\n**2. Xarkov Politexnik institutu (ХПІ)**\n• 1885-ci ildə yaradılıb\n• Texniki və mühəndislik\n• Təhsil haqları: 1650-2500USD\n\n**3. Xarkov Milli Tibb Universiteti**\n• Tibb, stomatologiya\n• Rezidentura proqramları\n• Təhsil haqları: 2000-3000USD\n\n**4. Aerokosmik Universiteti (ХАІ)**\n• Aviasiya və kosmik\n• Raket-kosmik texnikası\n• Təhsil haqları: 1500-2000USD\n\n**5. Biotexnologiya Universiteti**\n• Biotexnologiya\n• Aqrar texnologiyalar\n• Təhsil haqları: 1300-1900USD\n\n**6. МЧС Universiteti**\n• Yanğın təhlükəsizliyi\n• Vətəndaş təhlükəsizliyi\n• Təhsil haqları: 1500-1700USD\n\n### 📞 **Xarkov Qəbul:**\n• **Telebe.Biz.Ua:** +380 96 258 00 00\n• **Email:** info@telebe.biz.ua\n\nHangi Xarkov universitetində oxumaq istəyirsiniz?';
    } else {
      // Ücretsiz AI API'leri dene (sırayla)
      const freeApis = [
        {
          name: 'Groq',
          url: 'https://api.groq.com/openai/v1/chat/completions',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
          },
          body: JSON.stringify({
            model: 'llama3-8b-8192',
            messages: [
              {
                role: 'system',
                content: 'Sen OstWindGroup AI asistanısın. Ukrayna üniversiteleri konusunda uzman bir asistansın. Türkçe yanıt ver.'
              },
              {
                role: 'user',
                content: message
              }
            ],
            max_tokens: 1000,
            temperature: 0.7
          }),
          parseResponse: (data) => data.choices[0]?.message?.content || ''
        },
        {
          name: 'Hugging Face',
          url: 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            inputs: message,
            parameters: {
              max_length: 150,
              temperature: 0.7
            }
          }),
          parseResponse: (data) => data[0]?.generated_text || ''
        }
      ];

      // Ücretsiz API'leri dene
      for (const api of freeApis) {
        try {
          console.log(`🤖 ${api.name} API deneniyor...`);
          const response = await fetch(api.url, {
            method: api.method,
            headers: api.headers,
            body: api.body
          });

          if (response.ok) {
            const data = await response.json();
            aiResponse = api.parseResponse(data);
            if (aiResponse) {
              console.log(`✅ ${api.name} yanıtı alındı:`, aiResponse);
              break;
            }
          } else {
            console.log(`❌ ${api.name} API hatası:`, response.status);
          }
        } catch (error) {
          console.error(`❌ ${api.name} API hatası:`, error);
        }
      }

      // Eğer ücretsiz API'ler çalışmadıysa akıllı fallback sistemi kullan
      if (!aiResponse) {
        console.log('🤖 Akıllı fallback sistemi kullanılıyor...');
        const engine = new IntelligentResponseEngine();
        aiResponse = engine.generateResponse(message, conversation_id);
      }
    }

    console.log('📤 Sending intelligent response:', aiResponse.substring(0, 100) + '...');
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        conversation_id: conversation_id || 'new',
        message: aiResponse,
        timestamp: new Date().toISOString(),
        systemType: 'intelligent-fallback'
      }),
    };

  } catch (error) {
    console.error('🔴 Function error:', error);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        conversation_id: 'error',
        message: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.',
        timestamp: new Date().toISOString(),
        error: error.message
      }),
    };
  }
};