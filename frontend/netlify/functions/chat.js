exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { message, conversation_id, messageHistory = [], preferredModel = 'groq' } = body;
    
    console.log('Message:', message);
    console.log('Conversation ID:', conversation_id);
    console.log('Preferred Model:', preferredModel);

    // Önce Groq API'yi dene
    if (preferredModel === 'groq' || preferredModel === 'auto') {
      const groqApiKey = process.env.GROQ_API_KEY;
      
      if (groqApiKey) {
        try {
          console.log('🤖 Trying Groq API...');
          
          const groqMessages = [
            {
              role: 'system',
              content: 'Sen OstWindGroup AI asistanısın. Kullanıcıya yardımcı olan, detaylı ve faydalı yanıtlar veren bir asistansın. Türkçe yanıt ver. Kullanıcının önceki mesajlarını dikkate al ve konuşma bağlamını koru.'
            },
            ...messageHistory.map(msg => ({
              role: msg.role === 'user' ? 'user' : 'assistant',
              content: msg.content
            })),
            {
              role: 'user',
              content: message
            }
          ];

          const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${groqApiKey}`
            },
            body: JSON.stringify({
              model: 'llama3-70b-8192',
              messages: groqMessages,
              max_tokens: 2000,
              temperature: 0.8,
              stream: false
            })
          });

          if (groqResponse.ok) {
            const groqData = await groqResponse.json();
            const aiResponse = groqData.choices[0]?.message?.content || 'Yanıt alınamadı.';

            console.log('✅ Groq API response received');

            return {
              statusCode: 200,
              headers,
              body: JSON.stringify({
                conversation_id: conversation_id,
                message: aiResponse,
                timestamp: new Date().toISOString(),
                used_api: 'groq-llama3-70b'
              }),
            };
          }
        } catch (groqError) {
          console.log('⚠️ Groq API failed, trying Ollama...', groqError.message);
        }
      }
    }

    // Ollama Hub'ı dene (production için)
    if (preferredModel === 'ollama' || preferredModel === 'auto') {
      try {
        console.log('🦙 Trying Ollama Hub API...');
        
        // Ollama mesaj formatı
        const ollamaPrompt = messageHistory.length > 0 
          ? `${messageHistory.map(msg => `${msg.role === 'user' ? 'Kullanıcı' : 'Asistan'}: ${msg.content}`).join('\n')}\nKullanıcı: ${message}\nAsistan:`
          : message;

        const ollamaResponse = await fetch('https://ollama.com/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'xeyalcemilli9032/ostwindgroupai-multilingual',
            prompt: ollamaPrompt,
            stream: false,
            options: {
              temperature: 0.8,
              max_tokens: 2000
            }
          })
        });

        if (ollamaResponse.ok) {
          const ollamaData = await ollamaResponse.json();
          const aiResponse = ollamaData.response || 'Yanıt alınamadı.';

          console.log('✅ Ollama Hub API response received');

          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              conversation_id: conversation_id,
              message: aiResponse,
              timestamp: new Date().toISOString(),
              used_api: 'ollama-hub-multilingual'
            }),
          };
        }
      } catch (ollamaError) {
        console.log('⚠️ Ollama Hub API failed:', ollamaError.message);
      }
    }

    // Fallback yanıt
    console.log('⚠️ All APIs failed, using fallback');
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        conversation_id: conversation_id,
        message: "⚠️ AI servisleri şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.\n\nKullanılabilir servisler:\n🤖 Groq API (Cloud)\n🦙 Ollama (Local)\n\nLütfen GROQ_API_KEY'i kontrol edin veya Ollama'nın çalıştığından emin olun.",
        timestamp: new Date().toISOString(),
        used_api: 'fallback-all-failed'
      }),
    };

  } catch (error) {
    console.error('❌ Function error:', error);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        conversation_id: conversation_id || 'error',
        message: "⚠️ Bir hata oluştu. Lütfen tekrar deneyin.",
        timestamp: new Date().toISOString(),
        used_api: 'fallback-error'
      }),
    };
  }
};