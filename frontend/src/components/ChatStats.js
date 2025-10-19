import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { MessageSquare, Clock, User, Bot } from 'lucide-react';

const ChatStats = ({ conversations, allMessages }) => {
  const totalConversations = conversations.length;
  const totalMessages = allMessages.length;
  const userMessages = allMessages.filter(msg => msg.role === 'user').length;
  const assistantMessages = allMessages.filter(msg => msg.role === 'assistant').length;
  
  // En aktif sohbet
  const conversationStats = conversations.map(conv => ({
    id: conv.id,
    title: conv.title,
    messageCount: allMessages.filter(msg => msg.conversation_id === conv.id).length
  })).sort((a, b) => b.messageCount - a.messageCount);

  const mostActiveConversation = conversationStats[0];

  // Ortalama mesaj uzunluğu
  const avgMessageLength = allMessages.length > 0 
    ? Math.round(allMessages.reduce((sum, msg) => sum + msg.content.length, 0) / allMessages.length)
    : 0;

  // Son 7 günün istatistikleri
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
  
  const recentMessages = allMessages.filter(msg => 
    new Date(msg.timestamp) >= lastWeek
  ).length;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5" />
            <span>Genel İstatistikler</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{totalConversations}</div>
              <div className="text-sm text-muted-foreground">Toplam Sohbet</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{totalMessages}</div>
              <div className="text-sm text-muted-foreground">Toplam Mesaj</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-xl font-semibold text-blue-600">{userMessages}</div>
              <div className="text-sm text-muted-foreground flex items-center justify-center">
                <User className="w-3 h-3 mr-1" />
                Kullanıcı Mesajları
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold text-green-600">{assistantMessages}</div>
              <div className="text-sm text-muted-foreground flex items-center justify-center">
                <Bot className="w-3 h-3 mr-1" />
                AI Yanıtları
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>Aktivite İstatistikleri</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-xl font-semibold text-orange-600">{recentMessages}</div>
              <div className="text-sm text-muted-foreground">Son 7 Gün</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold text-purple-600">{avgMessageLength}</div>
              <div className="text-sm text-muted-foreground">Ort. Mesaj Uzunluğu</div>
            </div>
          </div>
          
          {mostActiveConversation && (
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">En Aktif Sohbet</div>
              <div className="text-lg font-semibold truncate" title={mostActiveConversation.title}>
                {mostActiveConversation.title}
              </div>
              <div className="text-sm text-muted-foreground">
                {mostActiveConversation.messageCount} mesaj
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatStats;

