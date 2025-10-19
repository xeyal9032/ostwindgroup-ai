import React, { useState } from 'react';
import { Input } from './ui/Input';
import { Card, CardContent } from './ui/Card';
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
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-50/50 to-slate-100/50 dark:from-slate-900/50 dark:to-slate-800/50">
      {/* Header */}
      <div className="p-6 glass-card border-b border-white/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-xl flex items-center justify-center shadow-glow animate-float">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                OstWindGroup AI
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-400">Akıllı Asistan</p>
            </div>
          </div>
        </div>
        
        {/* Arama */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-400 w-4 h-4" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Sohbetlerinizi arayın..."
            className="pl-10 pr-8 h-10 bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50 rounded-xl focus:ring-2 focus:ring-purple-500/50"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 hover:bg-red-100 dark:hover:bg-red-900/30"
              onClick={() => setSearchTerm('')}
            >
              <X className="w-3 h-3 text-red-500" />
            </Button>
          )}
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto p-4">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12 animate-fade-in-up">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-3xl flex items-center justify-center mb-6 animate-float">
              <MessageSquare className="w-10 h-10 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">
              Henüz sohbet yok
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm">
              İlk sohbetinizi başlatmak için yukarıdaki "Yeni Sohbet Başlat" butonuna tıklayın
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                💬 Soru sorabilirsiniz
              </span>
              <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-full text-sm">
                🚀 Yardım alabilirsiniz
              </span>
            </div>
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12 animate-fade-in-up">
            <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 rounded-3xl flex items-center justify-center mb-6 animate-float">
              <Search className="w-10 h-10 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">
              Sonuç bulunamadı
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              "{searchTerm}" için sohbet bulunamadı
            </p>
            <Button
              variant="outline"
              onClick={() => setSearchTerm('')}
              className="px-4 py-2 rounded-xl"
            >
              Aramayı temizle
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredConversations.map((conversation, index) => (
              <div
                key={conversation.id}
                className={`animate-fade-in-up animate-delay-${Math.min(index * 100, 500)}`}
              >
                <Card
                  className={cn(
                    "cursor-pointer transition-all duration-300 hover:shadow-glow hover:scale-[1.02] group",
                    currentConversationId === conversation.id 
                      ? "bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10 border-purple-500/30 shadow-glow" 
                      : "glass-card border-white/20 hover:border-purple-500/30"
                  )}
                  onClick={() => onSelectConversation(conversation.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                          <h3 className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                            {conversation.title}
                          </h3>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {formatDate(conversation.created_at)}
                          </p>
                          <div className="flex items-center space-x-1 text-xs text-slate-400 dark:text-slate-500">
                            <MessageSquare className="w-3 h-3" />
                            <span>{Math.floor(Math.random() * 10) + 1}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-100 dark:hover:bg-red-900/30"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteConversation(conversation.id);
                        }}
                      >
                        <Trash2 className="w-3 h-3 text-red-500" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
