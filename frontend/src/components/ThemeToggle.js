import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Sun, Moon, Monitor, Palette } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme, isDark, isLight } = useTheme();
  const [showOptions, setShowOptions] = useState(false);

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="w-4 h-4" />;
      case 'dark':
        return <Moon className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-all duration-200"
        onClick={() => setShowOptions(!showOptions)}
        title="Tema ayarları"
      >
        {getIcon()}
      </Button>

      {showOptions && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowOptions(false)}
          />
          <Card className="absolute top-10 right-0 z-50 w-64 shadow-lg border bg-background">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center space-x-2">
              <Palette className="w-4 h-4" />
              <span>Tema Ayarları</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={isLight ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setShowOptions(false);
                  if (!isLight) toggleTheme();
                }}
                className="flex items-center space-x-2"
              >
                <Sun className="w-3 h-3" />
                <span className="text-xs">Açık</span>
              </Button>
              
              <Button
                variant={isDark ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setShowOptions(false);
                  if (!isDark) toggleTheme();
                }}
                className="flex items-center space-x-2"
              >
                <Moon className="w-3 h-3" />
                <span className="text-xs">Koyu</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowOptions(false);
                  // Sistem temasını kullan
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  if (theme !== systemTheme) {
                    toggleTheme();
                  }
                }}
                className="flex items-center space-x-2"
              >
                <Monitor className="w-3 h-3" />
                <span className="text-xs">Sistem</span>
              </Button>
            </div>
            
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Mevcut tema:</span>
                <span className="font-medium capitalize">{theme}</span>
              </div>
            </div>
          </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default ThemeToggle;