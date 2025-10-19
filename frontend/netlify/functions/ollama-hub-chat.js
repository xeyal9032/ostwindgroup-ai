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
    const { message, conversation_id, messageHistory = [] } = body;
    
    console.log('🦙 Ollama Hub Function - Message:', message);
    console.log('🦙 Ollama Hub Function - Conversation ID:', conversation_id);

    // Ollama Hub API çağrısı (Production için)
    const ollamaHubUrl = 'https://ollama.com/api/generate';
    
    // Ollama mesaj formatı
    const ollamaPrompt = messageHistory.length > 0 
      ? `${messageHistory.map(msg => `${msg.role === 'user' ? 'Kullanıcı' : 'Asistan'}: ${msg.content}`).join('\n')}\nKullanıcı: ${message}\nAsistan:`
      : message;

    console.log('🦙 Calling Ollama Hub API...');
    
    const ollamaResponse = await fetch(ollamaHubUrl, {
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

    if (!ollamaResponse.ok) {
      console.error('❌ Ollama Hub API error:', ollamaResponse.status);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          conversation_id: conversation_id,
          message: "⚠️ Ollama Hub servisi şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.",
          timestamp: new Date().toISOString(),
          used_api: 'ollama-hub-error'
        }),
      };
    }

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

  } catch (error) {
    console.error('❌ Ollama Hub Function error:', error);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        conversation_id: conversation_id || 'error',
        message: "⚠️ Ollama Hub servisi ile bağlantı kurulamadı. Lütfen daha sonra tekrar deneyin.",
        timestamp: new Date().toISOString(),
        used_api: 'ollama-hub-fallback'
      }),
    };
  }
};
