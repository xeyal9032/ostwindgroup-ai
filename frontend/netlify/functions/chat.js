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

    // Sadece çok spesifik durumlar için hızlı yanıtlar
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
            model: 'llama3-70b-8192',
            messages: [
              {
                role: 'system',
                content: 'Sen OstWindGroup AI asistanısın. Kullanıcıya yardımcı olan, detaylı ve faydalı yanıtlar veren bir asistansın. Türkçe yanıt ver. Kullanıcının önceki mesajlarını dikkate al ve konuşma bağlamını koru.'
              },
              {
                role: 'user',
                content: message
              }
            ],
            max_tokens: 1500,
            temperature: 0.8,
            stream: false
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