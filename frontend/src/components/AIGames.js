import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { 
  Gamepad2, 
  Brain, 
  Calculator, 
  BookOpen, 
  Lightbulb,
  Trophy,
  Clock,
  Play,
  RotateCcw
} from 'lucide-react';
import { chatService } from '../services/api';
import { useNotifications } from './NotificationBell';

const AIGames = ({ currentConversationId }) => {
  const [activeGame, setActiveGame] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [gameHistory, setGameHistory] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useNotifications();

  const games = [
    {
      id: 'word-guess',
      title: 'Kelime Tahmin Oyunu',
      description: 'AI\'nın aklından geçen kelimeyi tahmin et',
      icon: <Brain className="w-5 h-5" />,
      color: 'text-blue-600'
    },
    {
      id: 'math-quiz',
      title: 'Matematik Quiz',
      description: 'Matematik sorularını çöz ve puan kazan',
      icon: <Calculator className="w-5 h-5" />,
      color: 'text-green-600'
    },
    {
      id: 'story-game',
      title: 'Hikaye Yaratma',
      description: 'AI ile birlikte hikaye yarat',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'text-purple-600'
    },
    {
      id: 'riddle-game',
      title: 'Bilmece Oyunu',
      description: 'AI\'nın bilmecelerini çöz',
      icon: <Lightbulb className="w-5 h-5" />,
      color: 'text-orange-600'
    }
  ];

  const startGame = async (gameId) => {
    if (!currentConversationId) {
      showNotification('Uyarı', {
        message: 'Oyun oynamak için bir sohbet seçin',
        type: 'warning'
      });
      return;
    }

    setIsLoading(true);
    setActiveGame(gameId);
    setGameData(null);
    setGameHistory([]);
    setScore(0);
    setUserInput('');

    try {
      let gamePrompt = '';
      
      switch (gameId) {
        case 'word-guess':
          gamePrompt = 'Kelime tahmin oyunu başlat. Aklından bir kelime geçir ve bana ipuçları ver. Ben tahmin etmeye çalışacağım. Oyun başladığında "🎮 Kelime Tahmin Oyunu Başladı! Aklımdan bir kelime geçiriyorum. İlk ipucu: [ipucu]" şeklinde başla.';
          break;
        case 'math-quiz':
          gamePrompt = 'Matematik quiz oyunu başlat. Bana 5 matematik sorusu sor. Her doğru cevap için 10 puan vereceğim. Başlamak için "🧮 Matematik Quiz Başladı! İlk soru: [soru]" şeklinde başla.';
          break;
        case 'story-game':
          gamePrompt = 'Hikaye yaratma oyunu başlat. Birlikte bir hikaye yaratacağız. Sen hikayeyi başlat ve benden devam etmemi iste. "📚 Hikaye Yaratma Oyunu Başladı! Hikayeyi başlıyorum: [hikaye başlangıcı] Sen de devam et!" şeklinde başla.';
          break;
        case 'riddle-game':
          gamePrompt = 'Bilmece oyunu başlat. Bana 5 bilmece sor. Her doğru cevap için 10 puan vereceğim. Başlamak için "💡 Bilmece Oyunu Başladı! İlk bilmece: [bilmece]" şeklinde başla.';
          break;
        default:
          throw new Error('Bilinmeyen oyun türü');
      }

      const response = await chatService.sendMessage(currentConversationId, gamePrompt);
      
      setGameData({
        gameId,
        gameState: 'playing',
        aiMessage: response.assistant_message.content,
        startTime: new Date()
      });
      
      setGameHistory([{
        type: 'ai',
        message: response.assistant_message.content,
        timestamp: new Date()
      }]);

      showNotification('Oyun Başladı!', {
        message: `${games.find(g => g.id === gameId)?.title} başlatıldı`,
        type: 'success'
      });

    } catch (error) {
      showNotification('Oyun Başlatma Hatası', {
        message: 'Oyun başlatılamadı: ' + error.message,
        type: 'error'
      });
      setActiveGame(null);
    } finally {
      setIsLoading(false);
    }
  };

  const sendGameMessage = async () => {
    if (!userInput.trim() || !activeGame || isLoading) return;

    const userMessage = userInput.trim();
    setUserInput('');
    setIsLoading(true);

    // Game history'ye ekle
    setGameHistory(prev => [...prev, {
      type: 'user',
      message: userMessage,
      timestamp: new Date()
    }]);

    try {
      const response = await chatService.sendMessage(currentConversationId, userMessage);
      
      // AI yanıtını history'ye ekle
      setGameHistory(prev => [...prev, {
        type: 'ai',
        message: response.assistant_message.content,
        timestamp: new Date()
      }]);

      // Oyun durumunu güncelle
      setGameData(prev => ({
        ...prev,
        aiMessage: response.assistant_message.content
      }));

      // Skor kontrolü (basit)
      if (response.assistant_message.content.includes('Doğru!') || 
          response.assistant_message.content.includes('Tebrikler!')) {
        setScore(prev => prev + 10);
      }

    } catch (error) {
      showNotification('Oyun Hatası', {
        message: 'Mesaj gönderilemedi: ' + error.message,
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const endGame = () => {
    setActiveGame(null);
    setGameData(null);
    setGameHistory([]);
    setScore(0);
    setUserInput('');
    setTimeLeft(0);
  };

  const getGameIcon = (gameId) => {
    return games.find(g => g.id === gameId)?.icon;
  };

  const getGameTitle = (gameId) => {
    return games.find(g => g.id === gameId)?.title;
  };

  if (activeGame) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center space-x-2">
              {getGameIcon(activeGame)}
              <span>{getGameTitle(activeGame)}</span>
            </CardTitle>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-sm">
                <Trophy className="w-4 h-4 text-yellow-600" />
                <span>{score} puan</span>
              </div>
              <Button
                onClick={endGame}
                variant="outline"
                size="sm"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Bitir
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Game History */}
          <div className="max-h-64 overflow-y-auto space-y-2 bg-muted/30 p-3 rounded-lg">
            {gameHistory.map((entry, index) => (
              <div key={index} className={`text-sm ${
                entry.type === 'user' ? 'text-right' : 'text-left'
              }`}>
                <div className={`inline-block p-2 rounded-lg max-w-[80%] ${
                  entry.type === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-background border'
                }`}>
                  {entry.message}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {entry.timestamp.toLocaleTimeString('tr-TR')}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex space-x-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Cevabınızı yazın..."
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  sendGameMessage();
                }
              }}
              disabled={isLoading}
            />
            <Button
              onClick={sendGameMessage}
              disabled={!userInput.trim() || isLoading}
              size="sm"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm flex items-center space-x-2">
          <Gamepad2 className="w-4 h-4" />
          <span>AI Oyunları</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {games.map((game) => (
            <Button
              key={game.id}
              onClick={() => startGame(game.id)}
              disabled={isLoading}
              className="h-auto p-4 justify-start"
              variant="outline"
            >
              <div className="flex items-center space-x-3">
                <div className={game.color}>
                  {game.icon}
                </div>
                <div className="text-left">
                  <div className="font-medium">{game.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {game.description}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>

        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
          <div className="text-xs text-muted-foreground">
            <p>• Oyunlar AI ile etkileşimli olarak oynanır</p>
            <p>• Her oyun farklı kurallara sahiptir</p>
            <p>• Puanlarınız kaydedilir</p>
            <p>• İstediğiniz zaman oyunu bitirebilirsiniz</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIGames;
