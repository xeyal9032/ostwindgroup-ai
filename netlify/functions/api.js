exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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
    const { httpMethod, path, body, queryStringParameters } = event;
    
    console.log('API Request:', { httpMethod, path, body });
    
    // Parse the path
    const pathParts = path.replace('/.netlify/functions/api', '').split('/').filter(Boolean);
    console.log('Path parts:', pathParts);
    
    // Handle different endpoints
    if (httpMethod === 'GET' && pathParts[0] === 'conversations') {
      // Return mock conversations for demo
      const conversations = [
        {
          id: 'demo-1',
          title: 'Demo Sohbet',
          created_at: new Date().toISOString(),
        }
      ];
      
      return {
        statusCode: 200,
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(conversations),
      };
    }
    
    if (httpMethod === 'POST' && pathParts[0] === 'chat') {
      const requestBody = JSON.parse(body || '{}');
      const { message, conversation_id } = requestBody;
      
      console.log('Chat request:', { message, conversation_id });
      
      // Mock AI response
      const aiResponse = `Merhaba! "${message}" mesajınızı aldım. Bu bir demo yanıttır. Gerçek AI entegrasyonu için API anahtarı gerekli. Size nasıl yardımcı olabilirim?`;
      
      const conversationId = conversation_id || 'demo-' + Date.now();
      
      const response = {
        conversation_id: conversationId,
        user_message: {
          id: 'user-' + Date.now(),
          conversation_id: conversationId,
          role: 'user',
          content: message,
          timestamp: new Date().toISOString(),
        },
        assistant_message: {
          id: 'assistant-' + Date.now(),
          conversation_id: conversationId,
          role: 'assistant',
          content: aiResponse,
          timestamp: new Date().toISOString(),
        },
      };
      
      console.log('Chat response:', response);
      
      return {
        statusCode: 200,
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(response),
      };
    }
    
    if (httpMethod === 'POST' && pathParts[0] === 'conversations') {
      const requestBody = JSON.parse(body || '{}');
      const { title = 'Yeni Sohbet' } = requestBody;
      
      const newConversation = {
        id: 'conv-' + Date.now(),
        title: title,
        created_at: new Date().toISOString(),
      };
      
      return {
        statusCode: 200,
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newConversation),
      };
    }
    
    if (httpMethod === 'GET' && pathParts[0] === 'conversations' && pathParts[1] && pathParts[2] === 'messages') {
      const conversationId = pathParts[1];
      
      // Return mock messages
      const messages = [
        {
          id: 'msg-1',
          conversation_id: conversationId,
          role: 'user',
          content: 'Merhaba!',
          timestamp: new Date(Date.now() - 60000).toISOString(),
        },
        {
          id: 'msg-2',
          conversation_id: conversationId,
          role: 'assistant',
          content: 'Merhaba! Size nasıl yardımcı olabilirim?',
          timestamp: new Date().toISOString(),
        }
      ];
      
      return {
        statusCode: 200,
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messages),
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
        pathParts: pathParts,
      }),
    };
    
  } catch (error) {
    console.error('API Error:', error);
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