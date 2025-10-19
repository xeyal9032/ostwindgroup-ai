import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import MobileNavigation from './MobileNavigation';
import Footer from './Footer';
import ThemeToggle from './ThemeToggle';
import ThemeSelector from './ThemeSelector';
import ChatStats from './ChatStats';
import AnalyticsDashboard from './AnalyticsDashboard';
import ExportImport from './ExportImport';
import AIGames from './AIGames';
import { conversationService } from '../services/api';

const ChatApp = () => {
  const { conversationId } = useParams();
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(conversationId || null);
  const [loading, setLoading] = useState(true);
  const [allMessages, setAllMessages] = useState([]);
  const [showStats, setShowStats] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showGames, setShowGames] = useState(false);

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
    <div className="chatgpt-layout">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex chatgpt-sidebar">
        <ChatList
          conversations={conversations}
          currentConversationId={currentConversationId}
          onDeleteConversation={handleDeleteConversation}
          onSelectConversation={handleSelectConversation}
          allMessages={allMessages}
        />
      </div>

      {/* Main Chat Area */}
      <div className="chatgpt-main">
        {/* Mobile Header */}
        <div className="md:hidden chatgpt-header">
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
            <div className="flex items-center space-x-1">
              <ThemeToggle />
              <ThemeSelector />
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <ChatWindow
            conversationId={currentConversationId}
            onNewConversation={handleNewConversation}
            onMessagesUpdate={setAllMessages}
          />
          
          {/* Özellik Panelleri */}
          {showStats && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <ChatStats conversations={conversations} allMessages={allMessages} />
              </div>
            </div>
          )}
          
          {showAnalytics && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
                <AnalyticsDashboard conversations={conversations} messages={allMessages} />
              </div>
            </div>
          )}
          
          {showExport && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <ExportImport conversations={conversations} currentConversationId={currentConversationId} />
              </div>
            </div>
          )}
          
          {showGames && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <AIGames currentConversationId={currentConversationId} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer
        onNewConversation={handleNewConversation}
        onToggleStats={() => setShowStats(!showStats)}
        onToggleAnalytics={() => setShowAnalytics(!showAnalytics)}
        onToggleExport={() => setShowExport(!showExport)}
        onToggleGames={() => setShowGames(!showGames)}
        showStats={showStats}
        showAnalytics={showAnalytics}
        showExport={showExport}
        showGames={showGames}
      />
    </div>
  );
};

export default ChatApp;
