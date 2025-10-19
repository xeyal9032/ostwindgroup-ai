import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/.netlify/functions';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('🚀 API Request:', config.method?.toUpperCase(), config.url);
    console.log('📦 Request data:', config.data);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.config.url);
    console.log('📦 Response data:', response.data);
    return response;
  },
  (error) => {
    console.error('❌ Response error:', error);
    console.error('❌ Error details:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: error.config
    });
    return Promise.reject(error);
  }
);

export const conversationService = {
  getConversations: async () => {
    try {
      const response = await api.get('/conversations');
      return response.data;
    } catch (error) {
      console.error('Sohbetler alınamadı:', error);
      return [
        {
          id: 'conv-1',
          title: 'Yeni Sohbet',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
    }
  },

  createConversation: async (title = 'Yeni Sohbet') => {
    try {
      const response = await api.post('/conversations', { title });
      return response.data;
    } catch (error) {
      console.error('Sohbet oluşturulamadı:', error);
      return {
        id: 'conv-' + Date.now(),
        title: title,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }
  },

  deleteConversation: async (id) => {
    try {
      await api.delete(`/conversations/${id}`);
      return { success: true };
    } catch (error) {
      console.error('Sohbet silinemedi:', error);
      return { success: true };
    }
  },

  getMessages: async (conversationId) => {
    try {
      const response = await api.get(`/messages?conversationId=${conversationId}`);
      return response.data;
    } catch (error) {
      console.error('Mesajlar alınamadı:', error);
      return [];
    }
  },
};

export const chatService = {
  sendMessage: async (conversationId, message, messageHistory = []) => {
    console.log('🎯 ChatService - sendMessage called:', { conversationId, message, messageHistory: messageHistory.length });
    console.log('🌐 API Base URL:', API_BASE_URL);
    
    try {
      const response = await api.post('/chat', {
        conversation_id: conversationId,
        message: message,
        messageHistory: messageHistory
      });
      
      console.log('✅ ChatService - API response received:', response.data);
      console.log('📦 Response message content:', response.data.message);
      
      return {
        conversation_id: response.data.conversation_id,
        message: response.data.message,
        timestamp: response.data.timestamp
      };
    } catch (error) {
      console.error('❌ ChatService - API error:', error);
      console.error('❌ ChatService - Error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: error.config
      });
      
      // Daha detaylı hata mesajı
      if (error.response?.status === 500) {
        throw new Error('Sunucu hatası. Lütfen daha sonra tekrar deneyin.');
      } else if (error.response?.status === 404) {
        throw new Error('API endpoint bulunamadı.');
      } else if (error.code === 'ECONNABORTED') {
        throw new Error('İstek zaman aşımına uğradı. Lütfen tekrar deneyin.');
      } else {
        throw new Error(`Mesaj gönderilemedi: ${error.message}`);
      }
    }
  },
};

// Ollama servisi - yerel AI modeli için
export const ollamaService = {
  sendMessage: async (message, model = 'llama2') => {
    console.log('🤖 OllamaService - sendMessage called:', { message, model });
    
    try {
      // CSP uyumlu kontrol - sadece development'ta çalışır
      if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        throw new Error('Ollama sadece localhost\'ta kullanılabilir');
      }

      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: model,
          prompt: message,
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error(`Ollama API hatası: ${response.status}`);
      }

      const data = await response.json();
      
      console.log('✅ OllamaService - Response received:', data);
      
      return {
        message: data.response,
        model: model,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('❌ OllamaService - Error:', error);
      
      // Ollama çalışmıyorsa fallback mesaj
      if (error.message.includes('fetch')) {
        throw new Error('Ollama sunucusu çalışmıyor. Lütfen Ollama\'yı başlatın.');
      }
      
      throw new Error(`Ollama hatası: ${error.message}`);
    }
  },

  // Mevcut modelleri listele
  listModels: async () => {
    try {
      // CSP uyumlu kontrol - sadece development'ta çalışır
      if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        return [];
      }

      const response = await fetch('http://localhost:11434/api/tags');
      const data = await response.json();
      return data.models || [];
    } catch (error) {
      console.error('❌ OllamaService - Models list error:', error);
      return [];
    }
  },

  // Ollama durumunu kontrol et
  checkStatus: async () => {
    try {
      // CSP uyumlu kontrol - sadece development'ta çalışır
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const response = await fetch('http://localhost:11434/api/tags');
        return response.ok;
      }
      return false; // Production'da Ollama kullanılamaz
    } catch (error) {
      console.log('Ollama kontrol edilemedi (normal):', error.message);
      return false;
    }
  }
};

export default api;