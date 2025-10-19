// netlify/functions/ollama-chat.js
exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }

  try {
    const { message } = JSON.parse(event.body);
    
    // Ollama API'sine istek gönder
    const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama2', // veya kullandığınız model
        prompt: message,
        stream: false
      })
    });

    const data = await ollamaResponse.json();
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: data.response,
        model: 'llama2'
      })
    };

  } catch (error) {
    console.error('Ollama API Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Ollama API hatası: ' + error.message
      })
    };
  }
};
