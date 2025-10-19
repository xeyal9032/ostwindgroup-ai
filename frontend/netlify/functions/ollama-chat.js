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
    
    console.log('🦙 Ollama Function - Message:', message);
    console.log('🦙 Ollama Function - Conversation ID:', conversation_id);

    // Ollama API çağrısı
    const ollamaUrl = 'http://localhost:11434/api/generate';
    
    // Ollama mesaj formatı
    const ollamaPrompt = messageHistory.length > 0 
      ? `${messageHistory.map(msg => `${msg.role === 'user' ? 'Kullanıcı' : 'Asistan'}: ${msg.content}`).join('\n')}\nKullanıcı: ${message}\nAsistan:`
      : message;

    console.log('🦙 Calling Ollama API...');
    
    const ollamaResponse = await fetch(ollamaUrl, {
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
      console.error('❌ Ollama API error:', ollamaResponse.status);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          conversation_id: conversation_id,
          message: "⚠️ Ollama servisi şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.",
          timestamp: new Date().toISOString(),
          used_api: 'ollama-error'
        }),
      };
    }

    const ollamaData = await ollamaResponse.json();
    const aiResponse = ollamaData.response || 'Yanıt alınamadı.';

    console.log('✅ Ollama API response received');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        conversation_id: conversation_id,
        message: aiResponse,
        timestamp: new Date().toISOString(),
        used_api: 'ollama-multilingual'
      }),
    };

  } catch (error) {
    console.error('❌ Ollama Function error:', error);
    
    // Hata durumunda fallback yanıt
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        conversation_id: conversation_id || 'error',
        message: "⚠️ Ollama servisi ile bağlantı kurulamadı. Lütfen Ollama'nın çalıştığından emin olun.",
        timestamp: new Date().toISOString(),
        used_api: 'ollama-fallback'
      }),
    };
  }
};
