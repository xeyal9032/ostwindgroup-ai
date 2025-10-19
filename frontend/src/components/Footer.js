import React from 'react';
import { Button } from './ui/Button';
import { 
  Plus, 
  MessageSquare, 
  BarChart3, 
  Download, 
  Gamepad2, 
  Bell,
  Settings,
  HelpCircle,
  FileText,
  Activity
} from 'lucide-react';
import { useNotifications } from './NotificationBell';

const Footer = ({ 
  onNewConversation, 
  onToggleStats, 
  onToggleAnalytics,
  onToggleExport,
  onToggleGames,
  showStats,
  showAnalytics,
  showExport,
  showGames
}) => {
  const { unreadCount } = useNotifications();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-white/95 via-white/90 to-white/80 dark:from-slate-900/95 dark:via-slate-900/90 dark:to-slate-900/80 backdrop-blur-xl border-t border-white/20 dark:border-slate-700/20 shadow-2xl">
      <div className="px-4 py-3">
        {/* Ana Aksiyon Butonları */}
        <div className="flex items-center justify-center space-x-3 mb-3">
          <Button
            onClick={onNewConversation}
            className="h-12 px-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 shadow-glow hover:shadow-glow-lg text-white font-semibold"
            size="lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Yeni Sohbet Başlat
          </Button>
        </div>

        {/* Alt Butonlar */}
        <div className="flex items-center justify-center space-x-2">
          {/* Bildirimler */}
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 hover:bg-purple-100 dark:hover:bg-purple-900/30 relative"
            title="Bildirimler"
          >
            <Bell className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </Button>

          {/* İstatistikler */}
          <Button
            variant={showStats ? "default" : "ghost"}
            size="icon"
            onClick={onToggleStats}
            className="h-10 w-10 hover:bg-blue-100 dark:hover:bg-blue-900/30"
            title="İstatistikler"
          >
            <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </Button>

          {/* Analitik */}
          <Button
            variant={showAnalytics ? "default" : "ghost"}
            size="icon"
            onClick={onToggleAnalytics}
            className="h-10 w-10 hover:bg-green-100 dark:hover:bg-green-900/30"
            title="Analitik Dashboard"
          >
            <Activity className="w-5 h-5 text-green-600 dark:text-green-400" />
          </Button>

          {/* Export/Import */}
          <Button
            variant={showExport ? "default" : "ghost"}
            size="icon"
            onClick={onToggleExport}
            className="h-10 w-10 hover:bg-orange-100 dark:hover:bg-orange-900/30"
            title="Export/Import"
          >
            <Download className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </Button>

          {/* AI Oyunları */}
          <Button
            variant={showGames ? "default" : "ghost"}
            size="icon"
            onClick={onToggleGames}
            className="h-10 w-10 hover:bg-pink-100 dark:hover:bg-pink-900/30"
            title="AI Oyunları"
          >
            <Gamepad2 className="w-5 h-5 text-pink-600 dark:text-pink-400" />
          </Button>

          {/* Yardım */}
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 hover:bg-yellow-100 dark:hover:bg-yellow-900/30"
            title="Yardım"
          >
            <HelpCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          </Button>

          {/* Ayarlar */}
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 hover:bg-gray-100 dark:hover:bg-gray-900/30"
            title="Ayarlar"
          >
            <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </Button>
        </div>

        {/* Alt Bilgi */}
        <div className="text-center mt-2">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            OstWindGroup AI - Akıllı Asistan
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
