import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Palette, Check } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSelector = () => {
  // const { theme, isDark } = useTheme();
  const [showThemes, setShowThemes] = useState(false);

  const themes = [
    { id: 'blue', name: 'Mavi', color: '#3b82f6', description: 'Klasik mavi tema' },
    { id: 'green', name: 'Yeşil', color: '#10b981', description: 'Doğal yeşil tema' },
    { id: 'purple', name: 'Mor', color: '#8b5cf6', description: 'Yaratıcı mor tema' },
    { id: 'orange', name: 'Turuncu', color: '#f97316', description: 'Enerjik turuncu tema' },
    { id: 'pink', name: 'Pembe', color: '#ec4899', description: 'Şık pembe tema' },
    { id: 'red', name: 'Kırmızı', color: '#ef4444', description: 'Güçlü kırmızı tema' },
  ];

  const applyTheme = (themeId) => {
    document.documentElement.setAttribute('data-theme', themeId);
    localStorage.setItem('custom-theme', themeId);
  };

  const getCurrentTheme = () => {
    return localStorage.getItem('custom-theme') || 'blue';
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-all duration-200"
        onClick={() => setShowThemes(!showThemes)}
        title="Tema renkleri"
      >
        <Palette className="w-4 h-4" />
      </Button>

      {showThemes && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowThemes(false)}
          />
          <Card className="absolute top-10 right-0 z-50 w-80 shadow-lg border bg-background">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center space-x-2">
              <Palette className="w-4 h-4" />
              <span>Renk Temaları</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {themes.map((themeOption) => (
                <Button
                  key={themeOption.id}
                  variant={getCurrentTheme() === themeOption.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    applyTheme(themeOption.id);
                    setShowThemes(false);
                  }}
                  className="h-auto p-3 flex flex-col items-center space-y-2 relative"
                >
                  {getCurrentTheme() === themeOption.id && (
                    <Check className="w-3 h-3 absolute top-1 right-1" />
                  )}
                  <div 
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: themeOption.color }}
                  />
                  <div className="text-center">
                    <div className="text-xs font-medium">{themeOption.name}</div>
                    <div className="text-xs text-muted-foreground">{themeOption.description}</div>
                  </div>
                </Button>
              ))}
            </div>
            
            <div className="mt-4 pt-3 border-t">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Mevcut tema:</span>
                <span className="font-medium capitalize">{getCurrentTheme()}</span>
              </div>
            </div>
          </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default ThemeSelector;
