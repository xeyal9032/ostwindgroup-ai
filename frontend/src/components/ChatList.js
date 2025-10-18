import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card, CardContent } from './ui/Card';
import { Plus, MessageSquare, Trash2, Search, X, BarChart3, Activity, Download, Gamepad2 } from 'lucide-react';
import { cn } from '../lib/utils';
import ThemeToggle from './ThemeToggle';
import ThemeSelector from './ThemeSelector';
import ChatStats from './ChatStats';
import AnalyticsDashboard from './AnalyticsDashboard';
import NotificationBell from './NotificationBell';
import ExportImport from './ExportImport';
import AIGames from './AIGames';

const ChatList = ({
  conversations,
  currentConversationId,
  onNewConversation,
  onDeleteConversation,
  onSelectConversation,
  allMessages = []
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showStats, setShowStats] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showGames, setShowGames] = useState(false);
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
      <div className="p-3 md:p-4 border-b bg-gradient-to-r from-card to-card/95 backdrop-blur-sm shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">OstWindGroup AI</h1>
          <div className="flex items-center space-x-1">
            <NotificationBell />
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setShowStats(!showStats)}
              title="İstatistikler"
            >
              <BarChart3 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setShowExport(!showExport)}
              title="Export/Import"
            >
              <Download className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setShowGames(!showGames)}
              title="AI Oyunları"
            >
              <Gamepad2 className="w-4 h-4" />
            </Button>
            <ThemeSelector />
            <ThemeToggle />
          </div>
        </div>
        <Button
          onClick={onNewConversation}
          className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-sm hover:shadow-md transition-all duration-200"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Yeni Sohbet
        </Button>
        
        {/* Arama */}
        <div className="mt-3 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Sohbet ara..."
            className="pl-10 pr-8 text-sm"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6"
              onClick={() => setSearchTerm('')}
            >
              <X className="w-3 h-3" />
            </Button>
          )}
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto p-2">
        {showGames ? (
          <AIGames currentConversationId={currentConversationId} />
        ) : showExport ? (
          <ExportImport conversations={conversations} currentConversationId={currentConversationId} />
        ) : showStats ? (
          <ChatStats conversations={conversations} messages={allMessages} />
        ) : conversations.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Henüz sohbet yok</p>
            <p className="text-sm">Yeni bir sohbet başlatın</p>
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Sonuç bulunamadı</p>
            <p className="text-sm">"{searchTerm}" için sohbet bulunamadı</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredConversations.map((conversation) => (
              <Card
                key={conversation.id}
                className={cn(
                  "cursor-pointer transition-colors hover:bg-accent",
                  currentConversationId === conversation.id && "bg-accent"
                )}
                onClick={() => onSelectConversation(conversation.id)}
              >
                <CardContent className="p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">
                        {conversation.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(conversation.created_at)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteConversation(conversation.id);
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
