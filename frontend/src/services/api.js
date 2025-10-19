import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 saniye timeout
});

// Request interceptor for error handling
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      console.error(`Server error ${status}:`, data);
      
      if (status === 401) {
        // Unauthorized - redirect to login or show auth error
        console.error('Unauthorized access');
      } else if (status === 429) {
        // Rate limited
        console.error('Rate limited - too many requests');
      } else if (status >= 500) {
        // Server error
        console.error('Server error');
      }
    } else if (error.request) {
      // Network error
      console.error('Network error - no response received');
    } else {
      // Other error
      console.error('Request setup error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// API servisleri
export const conversationService = {
  // Tüm sohbetleri getir
  getConversations: async () => {
    try {
      const response = await api.get('/conversations');
      return response.data;
    } catch (error) {
      console.error('Sohbetler alınamadı:', error);
      // Mock data döndür
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

  // Tek sohbet getir
  getConversation: async (conversationId) => {
    try {
      const response = await api.get(`/conversations/${conversationId}`);
      return response.data;
    } catch (error) {
      console.error('Sohbet alınamadı:', error);
      // Mock data döndür
      return {
        id: conversationId,
        title: 'Yeni Sohbet',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }
  },

  // Yeni sohbet oluştur
  createConversation: async (title = 'Yeni Sohbet') => {
    try {
      const response = await api.post('/conversations', { title });
      return response.data;
    } catch (error) {
      console.error('Sohbet oluşturulamadı:', error);
      // Mock data döndür
      return {
        id: 'conv-' + Date.now(),
        title: title,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }
  },

  // Sohbet sil
  deleteConversation: async (conversationId) => {
    try {
      const response = await api.delete(`/conversations/${conversationId}`);
      return response.data;
    } catch (error) {
      console.error('Sohbet silinemedi:', error);
      return { success: true };
    }
  },

  // Sohbet mesajlarını getir
  getMessages: async (conversationId) => {
    try {
      const response = await api.get(`/conversations/${conversationId}/messages`);
      return response.data;
    } catch (error) {
      console.error('Mesajlar alınamadı:', error);
      // Local storage'dan mesajları al
      const localMessages = JSON.parse(localStorage.getItem('messages') || '{}');
      return localMessages[conversationId] || [];
    }
  },

  // Mesaj kaydet
  saveMessage: async (messageData) => {
    try {
      const response = await api.post('/messages', messageData);
      return response.data;
    } catch (error) {
      console.error('Mesaj kaydedilemedi:', error);
      // Local storage'a kaydet
      const localMessages = JSON.parse(localStorage.getItem('messages') || '{}');
      if (!localMessages[messageData.conversation_id]) {
        localMessages[messageData.conversation_id] = [];
      }
      localMessages[messageData.conversation_id].push(messageData);
      localStorage.setItem('messages', JSON.stringify(localMessages));
      return messageData;
    }
  },
};

export const chatService = {
  // AI ile sohbet et - Backend üzerinden güvenli
  sendMessage: async (conversationId, message) => {
    console.log('API call - sendMessage:', { conversationId, message });
    
    try {
      const response = await api.post('/chat', {
        conversation_id: conversationId,
        message: message
      });
      
      console.log('API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Chat service error:', error);
      
      // Fallback error message
      if (error.code === 'ECONNABORTED') {
        throw new Error('İstek zaman aşımına uğradı. Lütfen tekrar deneyin.');
      } else if (error.response?.status === 429) {
        throw new Error('Çok fazla istek gönderildi. Lütfen biraz bekleyin.');
      } else if (error.response?.status >= 500) {
        throw new Error('Sunucu hatası. Lütfen daha sonra tekrar deneyin.');
      } else if (!error.response) {
        throw new Error('Backend sunucusu çalışmıyor. Lütfen daha sonra tekrar deneyin.');
      } else {
        throw new Error(error.response?.data?.detail || 'Bilinmeyen bir hata oluştu.');
      }
    }
  },

  // Speech-to-text servisi
  speechToText: async (audioFile) => {
    try {
      const formData = new FormData();
      formData.append('audio_file', audioFile);
      
      const response = await api.post('/speech-to-text', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000, // 60 saniye timeout for audio processing
      });
      
      return response.data;
    } catch (error) {
      console.error('Speech-to-text error:', error);
      throw new Error('Ses-metin çevirisi başarısız oldu. Lütfen tekrar deneyin.');
    }
  },
};

export default api;
