import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import ThemeToggle from './ThemeToggle';
import { conversationService } from '../services/api';

const ChatApp = () => {
  const { conversationId } = useParams();
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(conversationId || null);
  const [loading, setLoading] = useState(true);
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    setCurrentConversationId(conversationId || null);
  }, [conversationId]);

  const loadConversations = async () => {
    try {
      const data = await conversationService.getConversations();
      setConversations(data);
    } catch (error) {
      console.error('Sohbetler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewConversation = async () => {
    try {
      const newConversation = await conversationService.createConversation();
      setConversations(prev => [newConversation, ...prev]);
      setCurrentConversationId(newConversation.id);
      await loadConversations();
    } catch (error) {
      console.error('Yeni sohbet oluşturulurken hata:', error);
    }
  };

  const handleDeleteConversation = async (id) => {
    try {
      await conversationService.deleteConversation(id);
      setConversations(prev => prev.filter(conv => conv.id !== id));
      if (currentConversationId === id) {
        setCurrentConversationId(null);
      }
    } catch (error) {
      console.error('Sohbet silinirken hata:', error);
    }
  };

  const handleSelectConversation = (id) => {
    setCurrentConversationId(id);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex sidebar">
        <ChatList
          conversations={conversations}
          currentConversationId={currentConversationId}
          onDeleteConversation={handleDeleteConversation}
          onSelectConversation={handleSelectConversation}
          allMessages={allMessages}
        />
      </div>

      {/* Main Chat Area */}
      <div className="main-content">
        {/* Mobile Header */}
        <div className="md:hidden chat-header">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                OstWindGroup AI
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Akıllı Asistan</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">Çevrimiçi</span>
            </div>
            <ThemeToggle />
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <ChatWindow
            conversationId={currentConversationId}
            onNewConversation={handleNewConversation}
            onMessagesUpdate={setAllMessages}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatApp;