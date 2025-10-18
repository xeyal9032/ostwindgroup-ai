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
      <div className="hidden md:block p-4 border-b bg-gradient-to-r from-background to-background/95 backdrop-blur-sm shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center shadow-sm">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              {conversationId ? 'AI Asistan' : 'Yeni Sohbet'}
            </h2>
          </div>
          {conversationId && (
            <div className="flex items-center space-x-2 px-3 py-1 bg-green-50 dark:bg-green-900/20 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">Çevrimiçi</span>
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 bg-gradient-to-b from-background via-background/98 to-background/95">
        {loadingMessages ? (
          <div className="flex justify-center items-center h-32">
            <div className="text-muted-foreground">Mesajlar yükleniyor...</div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <Bot className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground mb-4" />
            <h3 className="text-lg md:text-xl font-semibold mb-2">OstWindGroup AI'ya Hoş Geldiniz</h3>
            <p className="text-sm md:text-base text-muted-foreground mb-4 max-w-md">
              Size nasıl yardımcı olabilirim? Aşağıya mesajınızı yazın.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <Message
              key={message.id}
              message={message}
              time={formatTime(message.timestamp)}
              onEdit={handleEditMessage}
            />
          ))
        )}
        
        {isLoading && (
          <div className="flex items-center space-x-3 text-muted-foreground">
            <Bot className="w-5 h-5" />
            <div className="flex items-center space-x-2">
              <span className="text-sm">Yazıyor</span>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 md:p-6 border-t bg-gradient-to-t from-card to-card/95 backdrop-blur-sm shadow-lg">
        {selectedFile && (
          <div className="mb-4">
            <FilePreview file={selectedFile} onRemove={handleFileRemove} />
          </div>
        )}
        
        <form onSubmit={handleSendMessage} className="flex space-x-2 md:space-x-3">
          <div className="flex-1 relative">
            <div className="relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-xl md:rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Mesajınızı yazın..."
                disabled={isLoading}
                className="w-full min-h-[44px] max-h-24 md:max-h-32 px-3 md:px-4 py-2 md:py-3 pr-12 md:pr-16 bg-transparent border-0 rounded-xl md:rounded-2xl resize-none focus:outline-none placeholder:text-muted-foreground/70 text-sm md:text-base"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 96) + 'px';
                }}
              />
              
              <div className="absolute right-2 md:right-3 top-2 md:top-3 flex items-center space-x-1">
                <VoiceMessageButton onVoiceMessage={handleVoiceMessage} disabled={isLoading} />
                <FileUploadButton onFileSelect={handleFileSelect} disabled={isLoading} />
                <EmojiPickerButton onEmojiSelect={handleEmojiSelect} />
              </div>
            </div>
          </div>
          
          <Button 
            type="submit" 
            disabled={(!inputMessage.trim() && !selectedFile) || isLoading}
            className="h-11 md:h-12 w-11 md:w-12 rounded-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            size="icon"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;