import { useState, useEffect, useRef } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";
import { ScrollArea } from "./components/ui/scroll-area";
import { Separator } from "./components/ui/separator";
import { Send, Plus, MessageSquare, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ChatInterface = () => {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      const response = await axios.get(`${API}/conversations`);
      setConversations(response.data);
    } catch (error) {
      console.error("Error loading conversations:", error);
      toast.error("Konuşmalar yüklenemedi");
    }
  };

  const loadMessages = async (conversationId) => {
    try {
      const response = await axios.get(`${API}/conversations/${conversationId}/messages`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error loading messages:", error);
      toast.error("Mesajlar yüklenemedi");
    }
  };

  const selectConversation = (conversation) => {
    setCurrentConversation(conversation);
    loadMessages(conversation.id);
  };

  const startNewConversation = () => {
    setCurrentConversation(null);
    setMessages([]);
    setInput("");
  };

  const deleteConversation = async (conversationId, e) => {
    e.stopPropagation();
    try {
      await axios.delete(`${API}/conversations/${conversationId}`);
      setConversations(conversations.filter(c => c.id !== conversationId));
      if (currentConversation?.id === conversationId) {
        startNewConversation();
      }
      toast.success("Konuşma silindi");
    } catch (error) {
      console.error("Error deleting conversation:", error);
      toast.error("Konuşma silinemedi");
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(`${API}/chat`, {
        conversation_id: currentConversation?.id,
        message: userMessage
      });

      // Update messages
      setMessages([...messages, response.data.user_message, response.data.assistant_message]);

      // Update current conversation if new
      if (!currentConversation) {
        await loadConversations();
        const convId = response.data.conversation_id;
        const convs = await axios.get(`${API}/conversations`);
        const newConv = convs.data.find(c => c.id === convId);
        setCurrentConversation(newConv);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Mesaj gönderilemedi");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-container" data-testid="chat-container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`} data-testid="sidebar">
        <div className="sidebar-header">
          <h1 className="sidebar-title" data-testid="app-title">OstWindGroup AI</h1>
          <Button
            onClick={startNewConversation}
            className="new-chat-btn"
            data-testid="new-chat-btn"
          >
            <Plus className="icon" />
            Yeni Sohbet
          </Button>
        </div>

        <ScrollArea className="conversations-list" data-testid="conversations-list">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`conversation-item ${currentConversation?.id === conv.id ? 'active' : ''}`}
              onClick={() => selectConversation(conv)}
              data-testid={`conversation-item-${conv.id}`}
            >
              <MessageSquare className="icon" />
              <span className="conversation-title">{conv.title}</span>
              <Button
                variant="ghost"
                size="icon"
                className="delete-btn"
                onClick={(e) => deleteConversation(conv.id, e)}
                data-testid={`delete-conversation-${conv.id}`}
              >
                <Trash2 className="icon-sm" />
              </Button>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="main-chat" data-testid="main-chat">
        {messages.length === 0 ? (
          <div className="welcome-screen" data-testid="welcome-screen">
            <div className="welcome-content">
              <h2 className="welcome-title">OstWindGroup AI'a Hoş Geldiniz</h2>
              <p className="welcome-subtitle">Size nasıl yardımcı olabilirim?</p>
              <div className="feature-grid">
                <div className="feature-card">
                  <div className="feature-icon">💡</div>
                  <p>Akıllı Yanıtlar</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">🚀</div>
                  <p>Hızlı İşlem</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">🎯</div>
                  <p>Hassas Sonuçlar</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <ScrollArea className="messages-area" data-testid="messages-area">
            <div className="messages-container">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message ${msg.role}`}
                  data-testid={`message-${msg.role}-${msg.id}`}
                >
                  <div className="message-content">
                    <div className="message-avatar">
                      {msg.role === "user" ? "👤" : "🤖"}
                    </div>
                    <div className="message-text">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        )}

        {/* Input Area */}
        <div className="input-area" data-testid="input-area">
          <div className="input-container">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Bir mesaj yazın..."
              className="message-input"
              disabled={loading}
              data-testid="message-input"
            />
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="send-btn"
              data-testid="send-btn"
            >
              {loading ? (
                <Loader2 className="icon spin" />
              ) : (
                <Send className="icon" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ChatInterface />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;