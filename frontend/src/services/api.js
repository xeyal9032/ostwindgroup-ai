import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/.netlify/functions/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API servisleri
export const conversationService = {
  // Tüm sohbetleri getir
  getConversations: async () => {
    const response = await api.get('/conversations');
    return response.data;
  },

  // Yeni sohbet oluştur
  createConversation: async (title = 'Yeni Sohbet') => {
    const response = await api.post('/conversations', { title });
    return response.data;
  },

  // Sohbet sil
  deleteConversation: async (conversationId) => {
    const response = await api.delete(`/conversations/${conversationId}`);
    return response.data;
  },

  // Sohbet mesajlarını getir
  getMessages: async (conversationId) => {
    const response = await api.get(`/conversations/${conversationId}/messages`);
    return response.data;
  },

  // Mesaj kaydet
  saveMessage: async (messageData) => {
    const response = await api.post('/messages', messageData);
    return response.data;
  },
};

export const chatService = {
  // AI ile sohbet et
  sendMessage: async (conversationId, message) => {
    console.log('API call - sendMessage:', { conversationId, message });
    const response = await api.post('/chat', {
      message,
      conversation_id: conversationId,
    });
    console.log('API response:', response.data);
    return response.data;
  },
};

export default api;
