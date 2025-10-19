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
    
    console.log('Message:', message);
    console.log('Conversation ID:', conversation_id);
    console.log('Message History Length:', messageHistory.length);

    // Groq API ile gerçek AI yanıtı al
    const groqApiKey = process.env.GROQ_API_KEY;
    
    if (!groqApiKey) {
      console.log('⚠️ GROQ_API_KEY not found, using fallback');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          conversation_id: conversation_id,
          message: "⚠️ AI servisi şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.",
          timestamp: new Date().toISOString(),
          used_api: 'fallback-no-key'
        }),
      };
    }

    // Groq API çağrısı
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

    console.log('🤖 Calling Groq API...');
    
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

    if (!groqResponse.ok) {
      const errorData = await groqResponse.json();
      console.error('❌ Groq API error:', errorData);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          conversation_id: conversation_id,
          message: "⚠️ AI servisi geçici olarak kullanılamıyor. Lütfen daha sonra tekrar deneyin.",
          timestamp: new Date().toISOString(),
          used_api: 'fallback-api-error'
        }),
      };
    }

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

  } catch (error) {
    console.error('❌ Function error:', error);
    
    // Hata durumunda fallback yanıt
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