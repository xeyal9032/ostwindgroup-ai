import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { 
  MessageSquare, 
  Clock, 
  User, 
  Bot, 
  TrendingUp, 
  Activity,
  BarChart3,
  PieChart,
  Download,
  Filter
} from 'lucide-react';

const AnalyticsDashboard = ({ conversations, messages }) => {
  const [timeRange, setTimeRange] = useState('7d');
  const [filteredMessages, setFilteredMessages] = useState([]);

  useEffect(() => {
    const now = new Date();
    const filterDate = new Date();
    
    switch (timeRange) {
      case '1d':
        filterDate.setDate(now.getDate() - 1);
        break;
      case '7d':
        filterDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        filterDate.setDate(now.getDate() - 30);
        break;
      case '90d':
        filterDate.setDate(now.getDate() - 90);
        break;
      default:
        filterDate.setDate(now.getDate() - 7);
    }

    const filtered = messages.filter(msg => new Date(msg.timestamp) >= filterDate);
    setFilteredMessages(filtered);
  }, [messages, timeRange]);

  const stats = {
    totalConversations: conversations.length,
    totalMessages: filteredMessages.length,
    userMessages: filteredMessages.filter(msg => msg.role === 'user').length,
    assistantMessages: filteredMessages.filter(msg => msg.role === 'assistant').length,
    avgMessageLength: filteredMessages.length > 0 
      ? Math.round(filteredMessages.reduce((sum, msg) => sum + msg.content.length, 0) / filteredMessages.length)
      : 0,
    mostActiveHour: getMostActiveHour(filteredMessages),
    responseTime: calculateAvgResponseTime(filteredMessages),
    wordCount: filteredMessages.reduce((sum, msg) => sum + msg.content.split(' ').length, 0)
  };

  const conversationStats = conversations.map(conv => ({
    id: conv.id,
    title: conv.title,
    messageCount: filteredMessages.filter(msg => msg.conversation_id === conv.id).length,
    lastActivity: conv.updated_at || conv.created_at
  })).sort((a, b) => b.messageCount - a.messageCount);

  // const hourlyActivity = getHourlyActivity(filteredMessages);
  // const dailyActivity = getDailyActivity(filteredMessages);

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Analitik Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-1 border rounded-md text-sm"
          >
            <option value="1d">Son 1 Gün</option>
            <option value="7d">Son 7 Gün</option>
            <option value="30d">Son 30 Gün</option>
            <option value="90d">Son 90 Gün</option>
          </select>
          <Button size="sm" variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{stats.totalConversations}</p>
                <p className="text-xs text-muted-foreground">Toplam Sohbet</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{stats.totalMessages}</p>
                <p className="text-xs text-muted-foreground">Toplam Mesaj</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{stats.avgMessageLength}</p>
                <p className="text-xs text-muted-foreground">Ort. Mesaj Uzunluğu</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{stats.wordCount}</p>
                <p className="text-xs text-muted-foreground">Toplam Kelime</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Message Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center space-x-2">
              <PieChart className="w-4 h-4" />
              <span>Mesaj Dağılımı</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Kullanıcı Mesajları</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{stats.userMessages}</p>
                  <p className="text-xs text-muted-foreground">
                    {stats.totalMessages > 0 ? Math.round((stats.userMessages / stats.totalMessages) * 100) : 0}%
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-green-600" />
                  <span className="text-sm">AI Yanıtları</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{stats.assistantMessages}</p>
                  <p className="text-xs text-muted-foreground">
                    {stats.totalMessages > 0 ? Math.round((stats.assistantMessages / stats.totalMessages) * 100) : 0}%
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>En Aktif Sohbetler</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {conversationStats.slice(0, 5).map((conv, index) => (
                <div key={conv.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">#{index + 1}</span>
                    <span className="text-sm truncate max-w-32" title={conv.title}>
                      {conv.title}
                    </span>
                  </div>
                  <span className="text-sm font-medium">{conv.messageCount}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center space-x-2">
            <Activity className="w-4 h-4" />
            <span>Aktivite İstatistikleri</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-lg font-bold text-blue-600">{stats.mostActiveHour}</p>
              <p className="text-xs text-muted-foreground">En Aktif Saat</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-green-600">{stats.responseTime}ms</p>
              <p className="text-xs text-muted-foreground">Ort. Yanıt Süresi</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-purple-600">
                {stats.totalMessages > 0 ? Math.round(stats.totalMessages / 7) : 0}
              </p>
              <p className="text-xs text-muted-foreground">Günlük Ort. Mesaj</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper functions
function getMostActiveHour(messages) {
  const hourCounts = {};
  messages.forEach(msg => {
    const hour = new Date(msg.timestamp).getHours();
    hourCounts[hour] = (hourCounts[hour] || 0) + 1;
  });
  
  const mostActive = Object.entries(hourCounts).reduce((a, b) => 
    hourCounts[a[0]] > hourCounts[b[0]] ? a : b, ['0', 0]);
  
  return `${mostActive[0]}:00`;
}

function calculateAvgResponseTime(messages) {
  const responseTimes = [];
  for (let i = 0; i < messages.length - 1; i++) {
    if (messages[i].role === 'user' && messages[i + 1].role === 'assistant') {
      const userTime = new Date(messages[i].timestamp);
      const assistantTime = new Date(messages[i + 1].timestamp);
      responseTimes.push(assistantTime - userTime);
    }
  }
  
  return responseTimes.length > 0 
    ? Math.round(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length)
    : 0;
}

function getHourlyActivity(messages) {
  const hourly = Array(24).fill(0);
  messages.forEach(msg => {
    const hour = new Date(msg.timestamp).getHours();
    hourly[hour]++;
  });
  return hourly;
}

function getDailyActivity(messages) {
  const daily = {};
  messages.forEach(msg => {
    const date = new Date(msg.timestamp).toDateString();
    daily[date] = (daily[date] || 0) + 1;
  });
  return daily;
}

export default AnalyticsDashboard;
