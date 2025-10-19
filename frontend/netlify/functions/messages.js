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
    if (event.httpMethod === 'GET') {
      // Mesaj listesini getir
      const conversationId = event.queryStringParameters?.conversationId;
      
      if (!conversationId) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'conversationId is required' }),
        };
      }

      // Örnek mesajlar
      const messages = [
        {
          id: 'msg-1',
          conversationId: conversationId,
          role: 'assistant',
          content: 'Merhaba! Ben OstWindGroup AI asistanınızım. Size nasıl yardımcı olabilirim?',
          timestamp: new Date().toISOString()
        }
      ];

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(messages),
      };
    }

    if (event.httpMethod === 'POST') {
      // Yeni mesaj kaydet
      const body = JSON.parse(event.body || '{}');
      const { conversationId, role, content } = body;
      
      const newMessage = {
        id: `msg-${Date.now()}`,
        conversationId: conversationId,
        role: role,
        content: content,
        timestamp: new Date().toISOString()
      };

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(newMessage),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };

  } catch (error) {
    console.error('❌ Messages error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal Server Error',
        details: error.message,
      }),
    };
  }
};
