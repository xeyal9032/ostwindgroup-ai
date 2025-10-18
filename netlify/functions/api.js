exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    const { httpMethod, path, body } = event;
    
    // Parse the path
    const pathParts = path.replace('/api', '').split('/').filter(Boolean);
    
    // Handle different endpoints
    if (httpMethod === 'GET' && pathParts[0] === 'conversations') {
      // Return mock conversations for demo
      return {
        statusCode: 200,
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          {
            id: 'demo-1',
            title: 'Demo Sohbet',
            created_at: new Date().toISOString(),
          }
        ]),
      };
    }
    
    if (httpMethod === 'POST' && pathParts[0] === 'chat') {
      const requestBody = JSON.parse(body || '{}');
      const { message } = requestBody;
      
      // Mock AI response
      const aiResponse = `Merhaba! "${message}" mesajınızı aldım. Bu bir demo yanıttır. Gerçek AI entegrasyonu için API anahtarı gerekli.`;
      
      const response = {
        conversation_id: 'demo-' + Date.now(),
        user_message: {
          id: 'user-' + Date.now(),
          conversation_id: 'demo-' + Date.now(),
          role: 'user',
          content: message,
          timestamp: new Date().toISOString(),
        },
        assistant_message: {
          id: 'assistant-' + Date.now(),
          conversation_id: 'demo-' + Date.now(),
          role: 'assistant',
          content: aiResponse,
          timestamp: new Date().toISOString(),
        },
      };
      
      return {
        statusCode: 200,
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(response),
      };
    }
    
    // Default response
    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'OstWindGroup AI API',
        status: 'running',
        endpoint: path,
        method: httpMethod,
      }),
    };
    
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message,
      }),
    };
  }
};
