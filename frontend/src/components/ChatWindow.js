import React, { useState, useEffect, useRef, useCallback } from 'react';
import Message from './Message';
import { Send, Bot, AlertCircle } from 'lucide-react';
import { conversationService, chatService } from '../services/api';
import { useNotifications } from './NotificationBell';

const ChatWindow = ({ conversationId, onNewConversation, onMessagesUpdate }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const { showNotification } = useNotifications();

  useEffect(() => {
    loadMessages();
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadMessages = useCallback(async () => {
    if (!conversationId) return;
    setLoadingMessages(true);
    setError(null);
    try {
      const data = await conversationService.getMessages(conversationId);
      setMessages(data);
      onMessagesUpdate && onMessagesUpdate(data);
    } catch (error) {
      console.error('Mesajlar yüklenirken hata:', error);
      setError('Mesajlar yüklenemedi');
    } finally {
      setLoadingMessages(false);
    }
  }, [conversationId, onMessagesUpdate]);

  const handleSendMessage = useCallback(async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;
    
    const userMessage = {
      id: Date.now().toString(),
      conversation_id: conversationId || 'new',
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    try {
      console.log('🎯 ChatWindow - Sending message:', { conversationId, message: inputMessage.trim() });
      const response = await chatService.sendMessage(conversationId || 'new', inputMessage.trim());
      
      console.log('✅ ChatWindow - Response received:', response);
      
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        conversation_id: response.conversation_id,
        role: 'assistant',
        content: response.message,
        timestamp: response.timestamp
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      showNotification('Yeni AI Yanıtı', {
        message: 'AI asistanınız yanıt verdi',
        type: 'success',
        duration: 3000
      });
      
      if (!conversationId && response.conversation_id) {
        onNewConversation && onNewConversation(response.conversation_id);
      }
      
      setError(null);
    } catch (error) {
      console.error('❌ ChatWindow - Error sending message:', error);
      console.error('❌ ChatWindow - Error details:', {
        message: error.message,
        stack: error.stack,
        response: error.response?.data
      });

      // Hata durumunda da gerçek API'yi çağırmaya çalış
      try {
        console.log('🔄 Retrying with direct API call...');
        const directResponse = await fetch('/.netlify/functions/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            conversation_id: conversationId || 'new',
            message: inputMessage.trim()
          }),
        });

        if (directResponse.ok) {
          const directData = await directResponse.json();
          console.log('✅ Direct API call successful:', directData);
          
          const assistantMessage = {
            id: (Date.now() + 1).toString(),
            conversation_id: directData.conversation_id,
            role: 'assistant',
            content: directData.message,
            timestamp: directData.timestamp
          };

          setMessages(prev => [...prev, assistantMessage]);
          showNotification('AI Yanıtı', {
            message: 'AI asistanınız yanıt verdi',
            type: 'success',
            duration: 3000
          });
        } else {
          throw new Error(`HTTP ${directResponse.status}`);
        }
      } catch (retryError) {
        console.error('❌ Retry also failed:', retryError);
        
        // Son çare olarak demo mesajı
        const demoMessage = {
          id: (Date.now() + 1).toString(),
          conversation_id: conversationId || 'demo',
          role: 'assistant',
          content: `Merhaba! "${inputMessage.trim()}" mesajınızı aldım. Bu bir demo yanıttır. OstWindGroup AI asistanınız size yardımcı olmaya hazır!`,
          timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, demoMessage]);

        showNotification('Demo Yanıt', {
          message: 'Demo yanıt gönderildi',
          type: 'info',
          duration: 3000
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [inputMessage, isLoading, conversationId, onNewConversation, showNotification]);

  const handleEditMessage = useCallback((messageId, newContent) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, content: newContent } : msg
    ));
  }, []);

  const formatTime = useCallback((timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('tr-TR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="chat-messages">
        {loadingMessages ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <span className="text-muted-foreground">Mesajlar yükleniyor...</span>
            </div>
          </div>
        ) : error ? (
          <div className="empty-state">
            <div className="empty-icon bg-destructive/10">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <h3 className="empty-title">Bağlantı Hatası</h3>
            <p className="empty-description">{error}</p>
            <button 
              onClick={() => { setError(null); loadMessages(); }} 
              className="modern-button-primary"
            >
              Tekrar Dene
            </button>
          </div>
        ) : messages.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <Bot className="w-12 h-12 text-primary" />
            </div>
            <h2 className="empty-title">
              OstWindGroup AI'ya Hoş Geldiniz
            </h2>
            <p className="empty-description">
              Size nasıl yardımcı olabilirim? Aşağıya mesajınızı yazın ve akıllı sohbetimizi başlatalım.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">💡 Soru sorabilirsiniz</span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">🚀 Projelerinizde yardım</span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">📚 Bilgi alabilirsiniz</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="fade-in">
                <Message
                  message={message}
                  time={formatTime(message.timestamp)}
                  onEdit={handleEditMessage}
                />
              </div>
            ))}
          </div>
        )}
        
        {isLoading && (
          <div className="flex items-center space-x-3 p-4">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">Yazıyor</span>
            <div className="loading-dots">
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="chat-input-area">
        <form onSubmit={handleSendMessage} className="relative">
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Mesajınızı yazın..."
                disabled={isLoading}
                className="modern-input"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
                }}
              />
            </div>
            
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="modern-button-primary hover-lift disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;