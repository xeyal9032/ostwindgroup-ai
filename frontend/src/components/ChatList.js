import React, { useState } from 'react';
import { Input } from './ui/Input';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { MessageSquare, Search, X, Trash2 } from 'lucide-react';
import { cn } from '../lib/utils';

const ChatList = ({
  conversations,
  currentConversationId,
  onDeleteConversation,
  onSelectConversation,
  allMessages = []
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Bugün';
    if (diffDays === 2) return 'Dün';
    if (diffDays <= 7) return `${diffDays} gün önce`;
    return date.toLocaleDateString('tr-TR');
  };

  // Filtrelenmiş sohbetler
  const filteredConversations = conversations.filter(conversation =>
    conversation.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="sidebar-header">
        <div className="flex items-center space-x-3 mb-4">
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
        
        {/* New Chat Button */}
        <button className="modern-button-primary w-full">
          <MessageSquare className="w-4 h-4 mr-2" />
          Yeni Sohbet Başlat
        </button>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Sohbetlerinizi arayın..."
            className="w-full pl-10 pr-8 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          {searchTerm && (
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
              onClick={() => setSearchTerm('')}
            >
              <X className="w-3 h-3 text-gray-500" />
            </button>
          )}
        </div>
      </div>

      {/* Conversations List */}
      <div className="sidebar-content">
        {conversations.length === 0 ? (
          <div className="chatgpt-empty-state">
            <div className="chatgpt-empty-icon">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h3 className="chatgpt-empty-title">
              Henüz sohbet yok
            </h3>
            <p className="chatgpt-empty-description">
              İlk sohbetinizi başlatmak için yukarıdaki "Yeni Sohbet Başlat" butonuna tıklayın
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">
                💬 Soru sorabilirsiniz
              </span>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                🚀 Yardım alabilirsiniz
              </span>
            </div>
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="chatgpt-empty-state">
            <div className="chatgpt-empty-icon bg-red-500">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h3 className="chatgpt-empty-title">
              Sonuç bulunamadı
            </h3>
            <p className="chatgpt-empty-description">
              "{searchTerm}" için sohbet bulunamadı
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Aramayı temizle
            </button>
          </div>
        ) : (
          <div className="space-y-1">
            {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-accent hover:text-accent-foreground ${
                      currentConversationId === conversation.id ? 'bg-primary text-primary-foreground' : 'bg-card'
                    }`}
                onClick={() => onSelectConversation(conversation.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="conversation-title">
                      {conversation.title}
                    </h3>
                    <p className="conversation-date">
                      {formatDate(conversation.created_at)}
                    </p>
                  </div>
                  <button
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full flex items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteConversation(conversation.id);
                    }}
                  >
                    <Trash2 className="w-3 h-3 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
