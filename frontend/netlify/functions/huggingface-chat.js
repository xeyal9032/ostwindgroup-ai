// netlify/functions/huggingface-chat.js
exports.handler = async (event, context) => {
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
    
    // Hugging Face Inference API - Ücretsiz
    const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Ücretsiz kullanım için API key gerekmez
      },
      body: JSON.stringify({
        inputs: message,
        parameters: {
          max_length: 150,
          temperature: 0.7
        }
      })
    });

    const data = await response.json();
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: data[0]?.generated_text || 'Üzgünüm, şu anda yanıt veremiyorum.',
        model: 'Hugging Face DialoGPT',
        free: true
      })
    };

  } catch (error) {
    console.error('Hugging Face API Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Hugging Face API hatası: ' + error.message
      })
    };
  }
};
