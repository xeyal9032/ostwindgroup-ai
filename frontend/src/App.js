import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './components/NotificationBell';
import ChatApp from './components/ChatApp';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<ChatApp />} />
              <Route path="/chat/:conversationId?" element={<ChatApp />} />
            </Routes>
          </div>
        </Router>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
