// netlify/functions/together-chat.js
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
    
    // Together AI - Ücretsiz tier
    const response = await fetch('https://api.together.xyz/inference', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your_free_api_key_here'
      },
      body: JSON.stringify({
        model: 'meta-llama/Llama-2-7b-chat-hf',
        prompt: `Sen yardımcı bir AI asistanısın. Türkçe yanıt ver.\n\nKullanıcı: ${message}\nAsistan:`,
        max_tokens: 1000,
        temperature: 0.7,
        top_p: 0.9
      })
    });

    const data = await response.json();
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: data.output?.choices[0]?.text || 'Üzgünüm, şu anda yanıt veremiyorum.',
        model: 'Together AI Llama2',
        free: true
      })
    };

  } catch (error) {
    console.error('Together AI Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Together AI hatası: ' + error.message
      })
    };
  }
};