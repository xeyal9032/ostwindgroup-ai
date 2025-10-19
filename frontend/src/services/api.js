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
  sendMessage: async (conversationId, message) => {
    console.log('🎯 ChatService - sendMessage called:', { conversationId, message });
    console.log('🌐 API Base URL:', API_BASE_URL);
    
    try {
      const response = await api.post('/chat', {
        conversation_id: conversationId,
        message: message
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

export default api;