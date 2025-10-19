import React from 'react';

// Error handling utilities
export class AppError extends Error {
  constructor(message, code = 'UNKNOWN_ERROR', statusCode = 500) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
    this.timestamp = new Date().toISOString();
  }
}

export const ErrorCodes = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  API_ERROR: 'API_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTH_ERROR: 'AUTH_ERROR',
  RATE_LIMIT_ERROR: 'RATE_LIMIT_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR'
};

export const ErrorMessages = {
  [ErrorCodes.NETWORK_ERROR]: 'İnternet bağlantınızı kontrol edin',
  [ErrorCodes.API_ERROR]: 'API hatası oluştu',
  [ErrorCodes.VALIDATION_ERROR]: 'Geçersiz veri gönderildi',
  [ErrorCodes.AUTH_ERROR]: 'Yetkilendirme hatası',
  [ErrorCodes.RATE_LIMIT_ERROR]: 'Çok fazla istek gönderildi. Lütfen bekleyin',
  [ErrorCodes.SERVER_ERROR]: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin',
  [ErrorCodes.TIMEOUT_ERROR]: 'İstek zaman aşımına uğradı',
  [ErrorCodes.UNKNOWN_ERROR]: 'Bilinmeyen bir hata oluştu'
};

export const handleError = (error, context = '') => {
  console.error(`Error in ${context}:`, error);
  
  let errorMessage = ErrorMessages[ErrorCodes.UNKNOWN_ERROR];
  let errorCode = ErrorCodes.UNKNOWN_ERROR;
  
  if (error instanceof AppError) {
    errorMessage = error.message;
    errorCode = error.code;
  } else if (error.response) {
    // API error
    const { status, data } = error.response;
    
    if (status === 401) {
      errorCode = ErrorCodes.AUTH_ERROR;
      errorMessage = 'Yetkilendirme hatası';
    } else if (status === 429) {
      errorCode = ErrorCodes.RATE_LIMIT_ERROR;
      errorMessage = 'Çok fazla istek gönderildi. Lütfen bekleyin';
    } else if (status >= 500) {
      errorCode = ErrorCodes.SERVER_ERROR;
      errorMessage = 'Sunucu hatası. Lütfen daha sonra tekrar deneyin';
    } else if (status >= 400) {
      errorCode = ErrorCodes.VALIDATION_ERROR;
      errorMessage = data?.detail || 'Geçersiz istek';
    }
  } else if (error.request) {
    // Network error
    errorCode = ErrorCodes.NETWORK_ERROR;
    errorMessage = 'İnternet bağlantınızı kontrol edin';
  } else if (error.code === 'ECONNABORTED') {
    // Timeout error
    errorCode = ErrorCodes.TIMEOUT_ERROR;
    errorMessage = 'İstek zaman aşımına uğradı';
  } else if (error.message) {
    errorMessage = error.message;
  }
  
  return {
    message: errorMessage,
    code: errorCode,
    originalError: error,
    context,
    timestamp: new Date().toISOString()
  };
};

export const showErrorNotification = (error, notificationService) => {
  const errorInfo = handleError(error);
  
  notificationService.showNotification('Hata', {
    message: errorInfo.message,
    type: 'error',
    duration: 5000
  });
  
  return errorInfo;
};

// Retry mechanism for failed requests
export const retryRequest = async (requestFn, maxRetries = 3, delay = 1000) => {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error;
      
      // Don't retry for certain error types
      if (error instanceof AppError && 
          [ErrorCodes.AUTH_ERROR, ErrorCodes.VALIDATION_ERROR].includes(error.code)) {
        throw error;
      }
      
      if (i < maxRetries - 1) {
        console.log(`Retry attempt ${i + 1}/${maxRetries} after ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; // Exponential backoff
      }
    }
  }
  
  throw lastError;
};

// Error boundary for React components
export const ErrorBoundary = ({ children, fallback, onError }) => {
  const [hasError, setHasError] = React.useState(false);
  const [error, setError] = React.useState(null);
  
  React.useEffect(() => {
    const handleError = (error, errorInfo) => {
      setHasError(true);
      setError(error);
      
      if (onError) {
        onError(error, errorInfo);
      }
      
      console.error('Error Boundary caught an error:', error, errorInfo);
    };
    
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleError);
    
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, [onError]);
  
  if (hasError) {
    return fallback || (
      <div className="flex items-center justify-center h-64 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
        <div className="text-center">
          <div className="text-red-600 dark:text-red-400 text-lg font-semibold mb-2">
            Bir hata oluştu
          </div>
          <div className="text-red-500 dark:text-red-300 text-sm">
            {error?.message || 'Bilinmeyen hata'}
          </div>
          <button 
            onClick={() => {
              setHasError(false);
              setError(null);
              window.location.reload();
            }}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Sayfayı Yenile
          </button>
        </div>
      </div>
    );
  }
  
  return children;
};
