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
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-80 border-r bg-card">
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
      <div className="flex-1 flex flex-col md:pb-0 pb-16">
        <ChatWindow
          conversationId={currentConversationId}
          onNewConversation={handleNewConversation}
          onMessagesUpdate={setAllMessages}
        />
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
