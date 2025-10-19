import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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

  const renderCount = usePerformanceMonitor('ChatWindow');
  const debouncedInputMessage = useDebounce(inputMessage, 300);

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
      const importedData = JSON.parse(localStorage.getItem('imported_messages') || '{}');
      if (importedData[conversationId]) {
        setMessages(importedData[conversationId]);
        onMessagesUpdate && onMessagesUpdate(importedData[conversationId]);
        setLoadingMessages(false);
        return;
      }
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
      conversation_id: conversationId || 'new',
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    try {
      const response = await retryRequest(
        () => chatService.sendMessage(conversationId || 'new', inputMessage.trim()),
        2,
        2000
      );
      
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        conversation_id: response.conversation_id,
        role: 'assistant',
        content: response.message,
        timestamp: new Date().toISOString()
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
      setRetryCount(0);
    } catch (error) {
      const errorInfo = handleError(error, 'sendMessage');
      setError(errorInfo);
      showErrorNotification(error, showNotification);
      setMessages(prev => prev.filter(msg => msg.id !== userMessage.id));
      setRetryCount(prev => prev + 1);
    } finally {
      setIsLoading(false);
    }
  }, [inputMessage, isLoading, conversationId, onNewConversation, showNotification]);

  const handleEditMessage = useCallback((messageId, newContent) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, content: newContent } : msg
    ));
  }, []);

  const handleEmojiSelect = useCallback((emoji) => {
    setInputMessage(prev => prev + emoji);
  }, []);

  const handleFileSelect = useCallback((file) => {
    setSelectedFile(file);
  }, []);

  const handleFileRemove = useCallback(() => {
    setSelectedFile(null);
  }, []);

  const handleVoiceMessage = useCallback(async (audioBlob) => {
    try {
      const audioFile = new File([audioBlob], 'voice-message.webm', { type: 'audio/webm' });
      const response = await chatService.speechToText(audioFile);
      setInputMessage(prev => prev + response.text);
    } catch (error) {
      showErrorNotification(error, showNotification);
    }
  }, [showNotification]);

  const formatTime = useCallback((timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('tr-TR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }, []);

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
  }, [messages, formatTime, handleEditMessage]);

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {loadingMessages ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Bot className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-medium">Mesajlar yükleniyor...</span>
            </div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Bağlantı Hatası</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{error.message}</p>
            <div className="flex space-x-3">
              <button 
                onClick={() => { setError(null); loadMessages(); }} 
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Tekrar Dene
              </button>
              <button 
                onClick={() => { setError(null); window.location.reload(); }} 
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
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6">
              <Bot className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              OstWindGroup AI'ya Hoş Geldiniz
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md">
              Size nasıl yardımcı olabilirim? Aşağıya mesajınızı yazın ve akıllı sohbetimizi başlatalım.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                💡 Soru sorabilirsiniz
              </span>
              <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">
                🚀 Projelerinizde yardım
              </span>
              <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                📚 Bilgi alabilirsiniz
              </span>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {memoizedMessages}
          </div>
        )}
        
        {isLoading && (
          <div className="flex items-center space-x-3 p-4 max-w-4xl mx-auto">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <Bot className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-medium">Yazıyor</span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
        <div className="max-w-4xl mx-auto">
          {selectedFile && (
            <div className="mb-4">
              <FilePreview file={selectedFile} onRemove={handleFileRemove} />
            </div>
          )}
          
          <form onSubmit={handleSendMessage} className="relative">
            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Mesajınızı yazın..."
                  disabled={isLoading}
                  className="w-full min-h-[44px] max-h-32 px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
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
                
                <div className="absolute right-3 top-3 flex items-center space-x-1">
                  <VoiceMessageButton onVoiceMessage={handleVoiceMessage} disabled={isLoading} />
                  <FileUploadButton onFileSelect={handleFileSelect} disabled={isLoading} />
                  <EmojiPickerButton onEmojiSelect={handleEmojiSelect} />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={(!inputMessage.trim() && !selectedFile) || isLoading}
                className="flex-shrink-0 w-11 h-11 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-colors"
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
    </div>
  );
};

export default ChatWindow;