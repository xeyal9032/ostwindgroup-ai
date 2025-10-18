import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import MobileNavigation from './MobileNavigation';
import { conversationService } from '../services/api';

const ChatApp = () => {
  const { conversationId } = useParams();
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(conversationId || null);
  const [loading, setLoading] = useState(true);
  const [allMessages, setAllMessages] = useState([]);
  const [showStats, setShowStats] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

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
      // Reload conversations to get updated list
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
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-80 glass-card border-r border-white/20 animate-slide-in-left">
        <ChatList
          conversations={conversations}
          currentConversationId={currentConversationId}
          onNewConversation={handleNewConversation}
          onDeleteConversation={handleDeleteConversation}
          onSelectConversation={handleSelectConversation}
          allMessages={allMessages}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 glass-card border-b border-white/20 animate-fade-in-up">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-glow animate-float">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                OstWindGroup AI
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-400">Akıllı Asistan</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-600 dark:text-green-400 font-medium">Çevrimiçi</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col md:pb-0 pb-20">
          <ChatWindow
            conversationId={currentConversationId}
            onNewConversation={handleNewConversation}
            onMessagesUpdate={setAllMessages}
          />
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation
        onNewConversation={handleNewConversation}
        onToggleStats={() => setShowStats(!showStats)}
        onToggleAnalytics={() => setShowAnalytics(!showAnalytics)}
        showStats={showStats}
        showAnalytics={showAnalytics}
      />
    </div>
  );
};

export default ChatApp;
