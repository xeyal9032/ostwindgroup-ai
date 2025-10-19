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
      // Konuşma listesini getir
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify([
          {
            id: 'conv-1',
            title: 'Yeni Konuşma',
            lastMessage: 'Merhaba!',
            timestamp: new Date().toISOString()
          }
        ]),
      };
    }

    if (event.httpMethod === 'POST') {
      // Yeni konuşma oluştur
      const body = JSON.parse(event.body || '{}');
      const { title = 'Yeni Konuşma' } = body;
      
      const newConversation = {
        id: `conv-${Date.now()}`,
        title: title,
        lastMessage: '',
        timestamp: new Date().toISOString()
      };

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(newConversation),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };

  } catch (error) {
    console.error('❌ Conversations error:', error);
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
