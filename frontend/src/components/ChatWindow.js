import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Button } from './ui/Button';
import Message from './Message';
import { Send, Bot, AlertCircle } from 'lucide-react';
import { conversationService, chatService } from '../services/api';
import EmojiPickerButton from './EmojiPickerButton';
import { FileUploadButton, FilePreview } from './FileUpload';
import VoiceMessageButton from './VoiceMessageButton';
import ThemeToggle from './ThemeToggle';
import ThemeSelector from './ThemeSelector';
import { useNotifications } from './NotificationBell';
import { handleError, showErrorNotification, retryRequest } from '../utils/errorHandler';
import { useDebounce, usePerformanceMonitor } from '../utils/performance';

const ChatWindow = ({ conversationId, onNewConversation, onMessagesUpdate }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const messagesEndRef = useRef(null);
  const { showNotification } = useNotifications();
  
  // Performance monitoring
  const renderCount = usePerformanceMonitor('ChatWindow');
  
  // Debounced input for better performance
  const debouncedInputMessage = useDebounce(inputMessage, 300);

  useEffect(() => {
    if (conversationId) {
      loadMessages();
    } else {
      setMessages([]);
    }
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
      // Önce imported mesajları kontrol et
      const importedData = JSON.parse(localStorage.getItem('imported_messages') || '{}');
      if (importedData[conversationId]) {
        setMessages(importedData[conversationId]);
        onMessagesUpdate && onMessagesUpdate(importedData[conversationId]);
        setLoadingMessages(false);
        return;
      }

      // Retry mechanism ile API'den yükle
      const data = await retryRequest(
        () => conversationService.getMessages(conversationId),
        3,
        1000
      );
      
      setMessages(data);
      onMessagesUpdate && onMessagesUpdate(data);
      setRetryCount(0);
    } catch (error) {
      const errorInfo = handleError(error, 'loadMessages');
      setError(errorInfo);
      showErrorNotification(error, showNotification);
      
      // Fallback: local storage'dan yükle
      const localMessages = JSON.parse(localStorage.getItem('messages') || '{}');
      if (localMessages[conversationId]) {
        setMessages(localMessages[conversationId]);
        onMessagesUpdate && onMessagesUpdate(localMessages[conversationId]);
      }
    } finally {
      setLoadingMessages(false);
    }
  }, [conversationId, onMessagesUpdate, showNotification]);

  const handleSendMessage = useCallback(async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      conversation_id: conversationId,
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date().toISOString()
    };

    // Optimistic update
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      console.log('Sending message:', inputMessage.trim(), 'to conversation:', conversationId || 'new');
      
      // Retry mechanism ile mesaj gönder
      const response = await retryRequest(
        () => chatService.sendMessage(conversationId || 'new', inputMessage.trim()),
        2,
        2000
      );
      
      console.log('Received response:', response);
      
      // Update messages with server response
      setMessages(prev => {
        const filtered = prev.filter(msg => msg.id !== userMessage.id);
        return [...filtered, response.user_message, response.assistant_message];
      });

      // Show notification for new AI response
      showNotification('Yeni AI Yanıtı', {
        message: response.assistant_message.content.substring(0, 100) + '...',
        type: 'success'
      });

      // If this was a new conversation, trigger conversation list refresh
      if (!conversationId && response.conversation_id) {
        if (onNewConversation) {
          onNewConversation();
        }
        showNotification('Yeni Sohbet Başlatıldı', {
          message: 'Yeni sohbet başarıyla oluşturuldu',
          type: 'info'
        });
      }
      
      setError(null);
      setRetryCount(0);
    } catch (error) {
      const errorInfo = handleError(error, 'sendMessage');
      setError(errorInfo);
      showErrorNotification(error, showNotification);
      
      // Remove the optimistic message on error
      setMessages(prev => prev.filter(msg => msg.id !== userMessage.id));
      
      // Increment retry count
      setRetryCount(prev => prev + 1);
    } finally {
      setIsLoading(false);
    }
  }, [inputMessage, isLoading, conversationId, onNewConversation, showNotification]);

  const handleEmojiSelect = (emoji) => {
    setInputMessage(prev => prev + emoji);
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
  };

  const handleVoiceMessage = async (convertedText) => {
    if (convertedText) {
      setInputMessage(convertedText);
    } else {
      setInputMessage('🎤 Sesli mesaj gönderildi (Ses-metin çevirisi aktif değil)');
    }
  };

  const handleEditMessage = (messageId, newContent) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, content: newContent } : msg
    ));
    onMessagesUpdate && onMessagesUpdate(messages);
  };

  // Memoized time formatter
  const formatTime = useCallback((timestamp) => {
    return new Date(timestamp).toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }, []);

  // Memoized message list for better performance
  const memoizedMessages = useMemo(() => {
    return messages.map((message, index) => (
      <div key={message.id} className={`animate-fade-in-up animate-delay-${Math.min(index * 100, 500)}`}>
        <Message
          message={message}
          time={formatTime(message.timestamp)}
          onEdit={handleEditMessage}
        />
      </div>
    ));
  }, [messages, formatTime]);

  return (
    <div className="chatgpt-layout">
      {/* Desktop Header - Hidden on mobile */}
      <div className="hidden md:block chatgpt-header">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {conversationId ? 'AI Asistan' : 'Yeni Sohbet'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {conversationId ? 'Size yardımcı olmaya hazırım' : 'Hemen başlayalım'}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {conversationId && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">Çevrimiçi</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <ThemeToggle />
              <ThemeSelector />
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="chatgpt-messages">
        {loadingMessages ? (
          <div className="chatgpt-loading">
            <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <Bot className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-medium">Mesajlar yükleniyor...</span>
          </div>
        ) : error ? (
          <div className="chatgpt-empty-state">
            <div className="chatgpt-empty-icon bg-red-500">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="chatgpt-empty-title">
              Bağlantı Hatası
            </h3>
            <p className="chatgpt-empty-description">
              {error.message}
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setError(null);
                  loadMessages();
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Tekrar Dene
              </button>
              <button
                onClick={() => {
                  setError(null);
                  window.location.reload();
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
              >
                Sayfayı Yenile
              </button>
            </div>
            {retryCount > 0 && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Deneme sayısı: {retryCount}
              </p>
            )}
          </div>
        ) : messages.length === 0 ? (
          <div className="chatgpt-empty-state">
            <div className="chatgpt-empty-icon">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h3 className="chatgpt-empty-title">
              OstWindGroup AI'ya Hoş Geldiniz
            </h3>
            <p className="chatgpt-empty-description">
              Size nasıl yardımcı olabilirim? Aşağıya mesajınızı yazın ve akıllı sohbetimizi başlatalım.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">
                💡 Soru sorabilirsiniz
              </span>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                🚀 Projelerinizde yardım
              </span>
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                📚 Bilgi alabilirsiniz
              </span>
            </div>
          </div>
        ) : (
          memoizedMessages
        )}
        
        {isLoading && (
          <div className="chatgpt-loading">
            <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <Bot className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-medium">Yazıyor</span>
            <div className="chatgpt-loading-dots">
              <div className="chatgpt-loading-dot"></div>
              <div className="chatgpt-loading-dot"></div>
              <div className="chatgpt-loading-dot"></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="chatgpt-input-area">
        {selectedFile && (
          <div className="mb-4 max-w-2xl mx-auto">
            <FilePreview file={selectedFile} onRemove={handleFileRemove} />
          </div>
        )}
        
        <div className="chatgpt-input-container">
          <form onSubmit={handleSendMessage} className="relative">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Mesajınızı yazın..."
              disabled={isLoading}
              className="chatgpt-input"
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
            
            <div className="absolute right-2 top-2 flex items-center space-x-1">
              <VoiceMessageButton onVoiceMessage={handleVoiceMessage} disabled={isLoading} />
              <FileUploadButton onFileSelect={handleFileSelect} disabled={isLoading} />
              <EmojiPickerButton onEmojiSelect={handleEmojiSelect} />
            </div>
            
            <button 
              type="submit" 
              disabled={(!inputMessage.trim() && !selectedFile) || isLoading}
              className="chatgpt-send-button"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4 text-white" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

ChatWindow.displayName = 'ChatWindow';

export default ChatWindow;