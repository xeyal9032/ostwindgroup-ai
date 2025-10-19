exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
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
      // Get all conversations
      const conversations = [
        {
          id: 'demo-1',
          title: 'Demo Sohbet',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      ];

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(conversations),
      };
    }

    if (event.httpMethod === 'POST') {
      // Create new conversation
      const newConversation = {
        id: `conv-${Date.now()}`,
        title: 'Yeni Sohbet',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(newConversation),
      };
    }

    if (event.httpMethod === 'DELETE') {
      // Delete conversation
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: 'Conversation deleted' }),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };

  } catch (error) {
    console.error('Conversations error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
