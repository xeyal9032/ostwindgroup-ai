import React, { useState } from 'react';
import { Bot, User, Copy, Check, Edit2, Save, X } from 'lucide-react';

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
      console.error('Kopyalama hatası:', err);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditContent(message.content);
  };

  const handleSave = () => {
    if (editContent.trim() && onEdit) {
      onEdit(message.id, editContent.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditContent(message.content);
  };

  return (
    <div className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
      }`}>
        {isUser ? (
          <User className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 min-w-0 ${isUser ? 'text-right' : 'text-left'}`}>
        <div className="group relative">
          {isEditing ? (
            <div className="message-bubble bg-card border border-border">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full mb-3 text-sm bg-transparent border-none outline-none resize-none text-foreground"
                rows={3}
                autoFocus
              />
              <div className="flex space-x-2">
                <button 
                  onClick={handleSave} 
                  className="modern-button-primary text-xs px-3 py-1"
                >
                  <Save className="w-3 h-3 mr-1" />
                  Kaydet
                </button>
                <button 
                  onClick={handleCancel} 
                  className="modern-button-secondary text-xs px-3 py-1"
                >
                  <X className="w-3 h-3 mr-1" />
                  İptal
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className={`message-bubble ${isUser ? 'message-user' : 'message-assistant'}`}>
                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </div>
              </div>

              {/* Action Buttons */}
              <div className={`absolute top-1 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1 ${
                isUser ? 'left-1' : 'right-1'
              }`}>
                <button 
                  onClick={handleCopy} 
                  className="action-button"
                >
                  {copied ? (
                    <Check className="w-3 h-3 text-green-500" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
                {isUser && onEdit && (
                  <button 
                    onClick={handleEdit} 
                    className="action-button"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        {/* Time */}
        <div className={`text-xs text-muted-foreground mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {time}
        </div>
      </div>
    </div>
  );
};

export default Message;