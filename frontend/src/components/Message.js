import React, { useState } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Bot, User, Copy, Check, Edit2, Save, X } from 'lucide-react';
import { cn } from '../lib/utils';

const Message = ({ message, time, onEdit }) => {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Kopyalama başarısız:', err);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditContent(message.content);
  };

  const handleSave = () => {
    if (onEdit && editContent.trim()) {
      onEdit(message.id, editContent.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditContent(message.content);
  };

  return (
    <div className={`chatgpt-message ${isUser ? 'user' : 'assistant'}`}>
      {/* Avatar */}
      <div className={cn(
        "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center",
        isUser ? "bg-green-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
      )}>
        {isUser ? (
          <User className="w-3 h-3" />
        ) : (
          <Bot className="w-3 h-3" />
        )}
      </div>

      {/* Message Content */}
      <div className="flex-1 min-w-0">
        <div className="group relative">
          {isEditing ? (
            <div className="chatgpt-message-content">
              <input
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full mb-2 text-sm bg-transparent border-none outline-none resize-none"
                autoFocus
              />
              <div className="flex space-x-2">
                <button 
                  onClick={handleSave} 
                  className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded flex items-center space-x-1 transition-colors"
                >
                  <Save className="w-3 h-3" />
                  <span>Kaydet</span>
                </button>
                <button 
                  onClick={handleCancel} 
                  className="px-2 py-1 bg-gray-500 hover:bg-gray-600 text-white text-xs rounded flex items-center space-x-1 transition-colors"
                >
                  <X className="w-3 h-3" />
                  <span>İptal</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="chatgpt-message-content">
                <div className="message-text">
                  {message.content}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className={cn(
                "absolute top-1 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1",
                isUser ? "left-1" : "right-1"
              )}>
                <button
                  className="h-5 w-5 hover:bg-black/10 dark:hover:bg-white/10 rounded-full flex items-center justify-center transition-colors"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <Check className="w-3 h-3 text-green-500" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
                {isUser && onEdit && (
                  <button
                    className="h-5 w-5 hover:bg-black/10 dark:hover:bg-white/10 rounded-full flex items-center justify-center transition-colors"
                    onClick={handleEdit}
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
        
        {/* Time */}
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {time}
        </div>
      </div>
    </div>
  );
};

export default Message;
