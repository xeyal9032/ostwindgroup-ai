import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './components/NotificationBell';
import { ErrorBoundary } from './utils/errorHandler';
import './index.css';

// Lazy load components for better performance
const ChatApp = lazy(() => import('./components/ChatApp'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <div className="text-lg font-semibold text-slate-600 dark:text-slate-400">
        OstWindGroup AI Yükleniyor...
      </div>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <NotificationProvider>
          <Router>
            <div className="App">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<ChatApp />} />
                  <Route path="/chat/:conversationId?" element={<ChatApp />} />
                </Routes>
              </Suspense>
            </div>
          </Router>
        </NotificationProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
