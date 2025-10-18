import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from './ui/Button';
import Message from './Message';
import { Send, Bot } from 'lucide-react';
import { conversationService, chatService } from '../services/api';
import EmojiPickerButton from './EmojiPickerButton';
import { FileUploadButton, FilePreview } from './FileUpload';
import VoiceMessageButton from './VoiceMessageButton';
import { useNotifications } from './NotificationBell';

const ChatWindow = ({ conversationId, onNewConversation, onMessagesUpdate }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const messagesEndRef = useRef(null);
  const { showNotification } = useNotifications();

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
    try {
      // Önce imported mesajları kontrol et
      const importedData = JSON.parse(localStorage.getItem('imported_messages') || '{}');
      if (importedData[conversationId]) {
        setMessages(importedData[conversationId]);
        onMessagesUpdate && onMessagesUpdate(importedData[conversationId]);
        setLoadingMessages(false);
        return;
      }

      // Yoksa normal API'den yükle
      const data = await conversationService.getMessages(conversationId);
      setMessages(data);
      onMessagesUpdate && onMessagesUpdate(data);
    } catch (error) {
      console.error('Mesajlar yüklenirken hata:', error);
    } finally {
      setLoadingMessages(false);
    }
  }, [conversationId, onMessagesUpdate]);

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
      console.log('API Base URL:', process.env.REACT_APP_API_URL || '/.netlify/functions/api');
      
      const response = await chatService.sendMessage(conversationId || 'new', inputMessage.trim());
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
    } catch (error) {
      console.error('Mesaj gönderilirken hata:', error);
      // Remove the optimistic message on error
      setMessages(prev => prev.filter(msg => msg.id !== userMessage.id));
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

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Desktop Header - Hidden on mobile */}
      <div className="hidden md:block p-6 glass-card border-b border-white/20 animate-fade-in-up">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-2xl flex items-center justify-center shadow-glow animate-float">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
              {conversationId ? 'AI Asistan' : 'Yeni Sohbet'}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {conversationId ? 'Size yardımcı olmaya hazırım' : 'Hemen başlayalım'}
            </p>
          </div>
          {conversationId && (
            <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">Çevrimiçi</span>
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-transparent via-transparent to-transparent">
        {loadingMessages ? (
          <div className="flex justify-center items-center h-32">
            <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-400">
              <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm font-medium">Mesajlar yükleniyor...</span>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4 animate-fade-in-up">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-3xl flex items-center justify-center shadow-glow-lg animate-float mb-6">
              <Bot className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-3">
              OstWindGroup AI'ya Hoş Geldiniz
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 max-w-md leading-relaxed">
              Size nasıl yardımcı olabilirim? Aşağıya mesajınızı yazın ve akıllı sohbetimizi başlatalım.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                💡 Soru sorabilirsiniz
              </span>
              <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-full text-sm">
                🚀 Projelerinizde yardım
              </span>
              <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm">
                📚 Bilgi alabilirsiniz
              </span>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div key={message.id} className={`animate-fade-in-up animate-delay-${Math.min(index * 100, 500)}`}>
              <Message
                message={message}
                time={formatTime(message.timestamp)}
                onEdit={handleEditMessage}
              />
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-400 animate-fade-in-up">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Yazıyor</span>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-6 glass-card border-t border-white/20 animate-fade-in-up">
        {selectedFile && (
          <div className="mb-4">
            <FilePreview file={selectedFile} onRemove={handleFileRemove} />
          </div>
        )}
        
        <form onSubmit={handleSendMessage} className="flex space-x-3">
          <div className="flex-1 relative">
            <div className="relative glass-card border border-white/20 rounded-2xl shadow-glow hover:shadow-glow-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-purple-500/50 focus-within:border-purple-500/50">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Mesajınızı yazın..."
                disabled={isLoading}
                className="w-full min-h-[56px] max-h-32 px-4 py-4 pr-16 bg-transparent border-0 rounded-2xl resize-none focus:outline-none placeholder:text-slate-500 dark:placeholder:text-slate-400 text-slate-900 dark:text-slate-100"
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
          </div>
          
          <Button 
            type="submit" 
            disabled={(!inputMessage.trim() && !selectedFile) || isLoading}
            className="h-14 w-14 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 shadow-glow hover:shadow-glow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed animate-scale-in"
            size="icon"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-5 h-5 text-white" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;