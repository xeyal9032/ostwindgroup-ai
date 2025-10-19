exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  // Handle preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    if (event.httpMethod === 'GET') {
      // Get messages for a conversation
      const { conversationId } = event.queryStringParameters || {};
      
      if (!conversationId) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Conversation ID is required' }),
        };
      }

      // Return demo messages
      const messages = [
        {
          id: 'msg-1',
          conversation_id: conversationId,
          role: 'assistant',
          content: 'Merhaba! Size nasıl yardımcı olabilirim?',
          timestamp: new Date(Date.now() - 60000).toISOString(),
        }
      ];

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(messages),
      };
    }

    if (event.httpMethod === 'POST') {
      // Create new message
      const { conversation_id, role, content } = JSON.parse(event.body);
      
      const newMessage = {
        id: `msg-${Date.now()}`,
        conversation_id,
        role,
        content,
        timestamp: new Date().toISOString(),
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
      body: JSON.stringify({ error: 'Method not allowed' }),
    };

  } catch (error) {
    console.error('Messages error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
