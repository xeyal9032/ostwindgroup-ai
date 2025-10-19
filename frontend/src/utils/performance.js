import React, { memo, useMemo, useCallback } from 'react';

// Memoized Message component for better performance
export const MemoizedMessage = memo(({ message, time, onEdit }) => {
  const handleEdit = useCallback((messageId, newContent) => {
    onEdit(messageId, newContent);
  }, [onEdit]);

  const formattedTime = useMemo(() => {
    return new Date(message.timestamp).toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }, [message.timestamp]);

  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
        message.role === 'user' 
          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
          : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700'
      }`}>
        <div className="message-text whitespace-pre-wrap break-words">
          {message.content}
        </div>
        <div className={`text-xs mt-2 ${
          message.role === 'user' ? 'text-purple-100' : 'text-slate-500 dark:text-slate-400'
        }`}>
          {formattedTime}
        </div>
      </div>
    </div>
  );
});

MemoizedMessage.displayName = 'MemoizedMessage';

// Virtual scrolling hook for large message lists
export const useVirtualScrolling = (items, itemHeight = 100, containerHeight = 400) => {
  const [scrollTop, setScrollTop] = React.useState(0);
  
  const visibleItems = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 1,
      items.length
    );
    
    return {
      startIndex,
      endIndex,
      items: items.slice(startIndex, endIndex),
      totalHeight: items.length * itemHeight,
      offsetY: startIndex * itemHeight
    };
  }, [items, itemHeight, containerHeight, scrollTop]);
  
  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);
  
  return {
    visibleItems,
    handleScroll,
    setScrollTop
  };
};

// Debounced search hook
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
};

// Intersection Observer hook for lazy loading
export const useIntersectionObserver = (ref, options = {}) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        ...options
      }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);
  
  return isIntersecting;
};

// Performance monitoring hook
export const usePerformanceMonitor = (componentName) => {
  const renderCount = React.useRef(0);
  const startTime = React.useRef(Date.now());
  
  React.useEffect(() => {
    renderCount.current += 1;
    const renderTime = Date.now() - startTime.current;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} rendered ${renderCount.current} times in ${renderTime}ms`);
    }
    
    startTime.current = Date.now();
  });
  
  return renderCount.current;
};

// Image lazy loading component
export const LazyImage = memo(({ src, alt, className, placeholder }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isInView, setIsInView] = React.useState(false);
  const imgRef = React.useRef();
  
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <div ref={imgRef} className={className}>
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
      {!isLoaded && placeholder && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded">
          {placeholder}
        </div>
      )}
    </div>
  );
});

LazyImage.displayName = 'LazyImage';

// Code splitting helper
export const lazyLoadComponent = (importFunc) => {
  return React.lazy(() => {
    return importFunc().catch((error) => {
      console.error('Failed to load component:', error);
      return {
        default: () => (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-red-600 text-lg font-semibold mb-2">
                Bileşen Yüklenemedi
              </div>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Sayfayı Yenile
              </button>
            </div>
          </div>
        )
      };
    });
  });
};

// Bundle size optimization utilities
export const optimizeBundle = {
  // Remove unused imports
  removeUnusedImports: () => {
    if (process.env.NODE_ENV === 'production') {
      // This would be handled by webpack/babel in production
      console.log('Unused imports removed in production build');
    }
  },
  
  // Tree shaking for large libraries
  useTreeShaking: (importPath) => {
    // Use specific imports instead of entire library
    // Example: import { debounce } from 'lodash/debounce' instead of import _ from 'lodash'
    return importPath;
  }
};

// Memory optimization utilities
export const memoryOptimization = {
  // Clear large objects from memory
  clearMemory: () => {
    if (typeof window !== 'undefined' && window.gc) {
      window.gc();
    }
  },
  
  // Monitor memory usage
  getMemoryUsage: () => {
    if (typeof window !== 'undefined' && window.performance && window.performance.memory) {
      return {
        used: Math.round(window.performance.memory.usedJSHeapSize / 1048576),
        total: Math.round(window.performance.memory.totalJSHeapSize / 1048576),
        limit: Math.round(window.performance.memory.jsHeapSizeLimit / 1048576)
      };
    }
    return null;
  }
};
