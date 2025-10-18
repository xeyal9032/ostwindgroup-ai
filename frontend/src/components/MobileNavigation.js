import React, { useState } from 'react';
import { Button } from './ui/Button';
import { 
  Menu, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  X,
  Plus,
  Bell
} from 'lucide-react';
import { useNotifications } from './NotificationBell';

const MobileNavigation = ({ 
  onNewConversation, 
  onToggleStats, 
  onToggleAnalytics,
  showStats,
  showAnalytics 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { unreadCount } = useNotifications();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Mobile Navigation Bar */}
      <div className="md:hidden mobile-nav">
        <div className="flex items-center justify-around">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="h-12 w-12"
          >
            <Menu className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onNewConversation}
            className="h-12 w-12 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 relative"
            title="Bildirimler"
          >
            <Bell className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </Button>

          <Button
            variant={showStats ? "default" : "ghost"}
            size="icon"
            onClick={onToggleStats}
            className="h-12 w-12"
          >
            <BarChart3 className="w-6 h-6" />
          </Button>

          <Button
            variant={showAnalytics ? "default" : "ghost"}
            size="icon"
            onClick={onToggleAnalytics}
            className="h-12 w-12"
          >
            <MessageSquare className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="md:hidden mobile-overlay open"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div className={`md:hidden mobile-sidebar ${isMenuOpen ? 'open' : ''}`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold">OstWindGroup AI</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => {
                onNewConversation();
                toggleMenu();
              }}
              className="w-full justify-start"
            >
              <Plus className="w-4 h-4 mr-2" />
              Yeni Sohbet
            </Button>

            <Button
              variant="ghost"
              onClick={() => {
                onToggleStats();
                toggleMenu();
              }}
              className="w-full justify-start"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              İstatistikler
            </Button>

            <Button
              variant="ghost"
              onClick={() => {
                onToggleAnalytics();
                toggleMenu();
              }}
              className="w-full justify-start"
            >
              <Activity className="w-4 h-4 mr-2" />
              Analitik
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start"
            >
              <Settings className="w-4 h-4 mr-2" />
              Ayarlar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavigation;
