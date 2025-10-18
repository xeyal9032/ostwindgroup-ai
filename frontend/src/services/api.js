import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Direct Gemini AI integration for frontend
const getGeminiResponse = async (message) => {
  try {
    const apiKey = process.env.REACT_APP_GOOGLE_AI_API_KEY;
    if (!apiKey) {
      throw new Error('Google AI API key not found');
    }
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = `Sen OstWindGroup AI, kullanıcılara yardımcı olan zeki bir asistansın. Her zaman Türkçe konuş ve yardımcı ol. Kullanıcı mesajı: "${message}"`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini AI error:', error);
    return `Üzgünüm, AI servisinde bir hata oluştu: ${error.message}. Lütfen tekrar deneyin.`;
  }
};

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
  // AI ile sohbet et
  sendMessage: async (conversationId, message) => {
    console.log('API call - sendMessage:', { conversationId, message });
    
    try {
      // Direct Gemini AI call
      const aiResponse = await getGeminiResponse(message);
      
      const response = {
        conversation_id: conversationId || 'conv-' + Date.now(),
        user_message: {
          id: 'user-' + Date.now(),
          conversation_id: conversationId || 'conv-' + Date.now(),
          role: 'user',
          content: message,
          timestamp: new Date().toISOString(),
        },
        assistant_message: {
          id: 'assistant-' + Date.now(),
          conversation_id: conversationId || 'conv-' + Date.now(),
          role: 'assistant',
          content: aiResponse,
          timestamp: new Date().toISOString(),
        },
      };
      
      console.log('API response:', response);
      return response;
    } catch (error) {
      console.error('Chat service error:', error);
      throw error;
    }
  },
};

export default api;
