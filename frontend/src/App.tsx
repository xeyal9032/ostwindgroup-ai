import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Settings, Zap, MessageSquare, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface OllamaModel {
  name: string;
  displayName: string;
  description: string;
  icon: React.ReactNode;
}

const ollamaModels: OllamaModel[] = [
  {
    name: 'xeyalcemilli9032/ostwindgroupai-web-expert',
    displayName: 'Web Expert',
    description: 'Node.js, JavaScript, Python web geliştirme uzmanı',
    icon: <Zap className="w-4 h-4" />
  },
  {
    name: 'xeyalcemilli9032/ostwindgroupai-ultra-professional',
    displayName: 'Ultra Professional',
    description: 'Kapsamlı profesyonel AI asistanı',
    icon: <Sparkles className="w-4 h-4" />
  },
  {
    name: 'xeyalcemilli9032/ostwindgroupai-multilingual',
    displayName: 'Multilingual',
    description: 'Çok dilli iletişim uzmanı',
    icon: <MessageSquare className="w-4 h-4" />
  },
  {
    name: 'xeyalcemilli9032/ostwindgroupai-professional',
    displayName: 'Professional',
    description: 'Profesyonel AI asistanı',
    icon: <Bot className="w-4 h-4" />
  }
];

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedModel, setSelectedModel] = useState(ollamaModels[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Ollama bağlantısını test et
    testOllamaConnection();
  }, []);

  const testOllamaConnection = async () => {
    try {
      const response = await fetch('http://localhost:11434/api/tags');
      if (response.ok) {
        setIsConnected(true);
        // Hoş geldin mesajı ekle
        setMessages([{
          id: '1',
          content: `Merhaba! Ben ${selectedModel.displayName} modeliyim. Size nasıl yardımcı olabilirim?`,
          role: 'assistant',
          timestamp: new Date()
        }]);
      }
    } catch (error) {
      console.error('Ollama bağlantı hatası:', error);
      setIsConnected(false);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: selectedModel.name,
          prompt: inputMessage,
          stream: false,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.response,
          role: 'assistant',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error('API hatası');
      }
    } catch (error) {
      console.error('Mesaj gönderme hatası:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.',
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="gradient-bg" style={{ minHeight: '100vh' }}>
      {/* Header */}
      <header className="glass-effect" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '2.5rem', height: '2.5rem', backgroundColor: '#3b82f6', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', margin: 0 }}>OstWindGroup AI</h1>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.8)', margin: 0 }}>Modern AI Chat Platform</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Model Selector */}
            <div style={{ position: 'relative' }}>
              <select
                value={selectedModel.name}
                onChange={(e) => {
                  const model = ollamaModels.find(m => m.name === e.target.value);
                  if (model) setSelectedModel(model);
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  color: 'white',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              >
                {ollamaModels.map((model) => (
                  <option key={model.name} value={model.name} style={{ backgroundColor: '#1e293b' }}>
                    {model.displayName}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Connection Status */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ 
                width: '0.5rem', 
                height: '0.5rem', 
                borderRadius: '50%', 
                backgroundColor: isConnected ? '#10b981' : '#ef4444' 
              }}></div>
              <span style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                {isConnected ? 'Bağlı' : 'Bağlantı Yok'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main style={{ maxWidth: '1024px', margin: '0 auto', padding: '1.5rem 1rem' }}>
        <div className="glass-effect" style={{ borderRadius: '1rem', height: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column' }}>
          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{ display: 'flex', justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start' }}
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '0.75rem', 
                  maxWidth: '80%',
                  flexDirection: message.role === 'user' ? 'row-reverse' : 'row'
                }}>
                  <div style={{ 
                    width: '2rem', 
                    height: '2rem', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: message.role === 'user' ? '#3b82f6' : 'rgba(255, 255, 255, 0.2)',
                    border: message.role === 'assistant' ? '1px solid rgba(255, 255, 255, 0.3)' : 'none'
                  }}>
                    {message.role === 'user' ? (
                      <User style={{ width: '1rem', height: '1rem', color: 'white' }} />
                    ) : (
                      <Bot style={{ width: '1rem', height: '1rem', color: 'white' }} />
                    )}
                  </div>
                  <div className={`chat-bubble ${message.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}`}>
                    <p style={{ fontSize: '0.875rem', lineHeight: '1.5', whiteSpace: 'pre-wrap', margin: 0 }}>
                      {message.content}
                    </p>
                    <p style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '0.25rem', margin: 0 }}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ 
                    width: '2rem', 
                    height: '2rem', 
                    borderRadius: '50%', 
                    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                    border: '1px solid rgba(255, 255, 255, 0.3)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <Bot style={{ width: '1rem', height: '1rem', color: 'white' }} />
                  </div>
                  <div className="chat-bubble chat-bubble-ai">
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      <div style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#94a3b8', borderRadius: '50%', animation: 'bounce 1s infinite' }}></div>
                      <div style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#94a3b8', borderRadius: '50%', animation: 'bounce 1s infinite 0.1s' }}></div>
                      <div style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#94a3b8', borderRadius: '50%', animation: 'bounce 1s infinite 0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.2)', padding: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`${selectedModel.displayName} ile konuşun...`}
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '0.75rem',
                    padding: '0.75rem 1rem',
                    color: 'white',
                    fontSize: '0.875rem',
                    outline: 'none',
                    resize: 'none',
                    minHeight: '3rem',
                    maxHeight: '7.5rem'
                  }}
                  rows={1}
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                style={{
                  backgroundColor: inputMessage.trim() && !isLoading ? '#3b82f6' : '#94a3b8',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.75rem',
                  border: 'none',
                  cursor: inputMessage.trim() && !isLoading ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  transition: 'background-color 0.2s'
                }}
              >
                <Send style={{ width: '1rem', height: '1rem' }} />
                <span>Gönder</span>
              </button>
            </div>
            
            {/* Model Info */}
            <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)' }}>
              {selectedModel.icon}
              <span>{selectedModel.displayName}: {selectedModel.description}</span>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0, -8px, 0);
          }
          70% {
            transform: translate3d(0, -4px, 0);
          }
          90% {
            transform: translate3d(0, -2px, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default App;