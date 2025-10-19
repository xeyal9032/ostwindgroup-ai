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

  // Tüm özelliklerin görünür olması için state'leri kontrol et
  const hasFeatures = {
    stats: typeof onToggleStats === 'function',
    analytics: typeof onToggleAnalytics === 'function',
    export: typeof onToggleExport === 'function',
    games: typeof onToggleGames === 'function'
  };

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
        <div className="flex items-center justify-center space-x-2 flex-wrap">
          {/* Bildirimler */}
          <Button
            variant="outline"
            size="sm"
            className="h-10 px-3 hover:bg-purple-100 dark:hover:bg-purple-900/30 relative border-purple-200 dark:border-purple-800"
            title="Bildirimler"
          >
            <Bell className="w-4 h-4 text-purple-600 dark:text-purple-400 mr-2" />
            <span className="text-xs">Bildirimler</span>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </Button>

          {/* İstatistikler */}
          {hasFeatures.stats && (
            <Button
              variant={showStats ? "default" : "outline"}
              size="sm"
              onClick={onToggleStats}
              className="h-10 px-3 hover:bg-blue-100 dark:hover:bg-blue-900/30 border-blue-200 dark:border-blue-800"
              title="İstatistikler"
            >
              <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" />
              <span className="text-xs">İstatistikler</span>
            </Button>
          )}

          {/* Analitik */}
          {hasFeatures.analytics && (
            <Button
              variant={showAnalytics ? "default" : "outline"}
              size="sm"
              onClick={onToggleAnalytics}
              className="h-10 px-3 hover:bg-green-100 dark:hover:bg-green-900/30 border-green-200 dark:border-green-800"
              title="Analitik Dashboard"
            >
              <Activity className="w-4 h-4 text-green-600 dark:text-green-400 mr-2" />
              <span className="text-xs">Analitik</span>
            </Button>
          )}

          {/* Export/Import */}
          {hasFeatures.export && (
            <Button
              variant={showExport ? "default" : "outline"}
              size="sm"
              onClick={onToggleExport}
              className="h-10 px-3 hover:bg-orange-100 dark:hover:bg-orange-900/30 border-orange-200 dark:border-orange-800"
              title="Export/Import"
            >
              <Download className="w-4 h-4 text-orange-600 dark:text-orange-400 mr-2" />
              <span className="text-xs">Export</span>
            </Button>
          )}

          {/* AI Oyunları */}
          {hasFeatures.games && (
            <Button
              variant={showGames ? "default" : "outline"}
              size="sm"
              onClick={onToggleGames}
              className="h-10 px-3 hover:bg-pink-100 dark:hover:bg-pink-900/30 border-pink-200 dark:border-pink-800"
              title="AI Oyunları"
            >
              <Gamepad2 className="w-4 h-4 text-pink-600 dark:text-pink-400 mr-2" />
              <span className="text-xs">Oyunlar</span>
            </Button>
          )}

          {/* Yardım */}
          <Button
            variant="outline"
            size="sm"
            className="h-10 px-3 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800"
            title="Yardım"
          >
            <HelpCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mr-2" />
            <span className="text-xs">Yardım</span>
          </Button>

          {/* Ayarlar */}
          <Button
            variant="outline"
            size="sm"
            className="h-10 px-3 hover:bg-gray-100 dark:hover:bg-gray-900/30 border-gray-200 dark:border-gray-800"
            title="Ayarlar"
          >
            <Settings className="w-4 h-4 text-gray-600 dark:text-gray-400 mr-2" />
            <span className="text-xs">Ayarlar</span>
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



