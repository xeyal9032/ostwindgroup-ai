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
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser 
          ? 'bg-green-500 text-white' 
          : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
      }`}>
        {isUser ? (
          <User className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 min-w-0 ${isUser ? 'flex flex-col items-end' : 'flex flex-col items-start'}`}>
        <div className="group relative">
          {isEditing ? (
            <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl p-4 max-w-md">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full mb-3 text-sm bg-transparent border-none outline-none resize-none text-gray-900 dark:text-white"
                rows={3}
                autoFocus
              />
              <div className="flex space-x-2">
                <button 
                  onClick={handleSave} 
                  className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded-lg flex items-center space-x-1 transition-colors"
                >
                  <Save className="w-3 h-3" />
                  <span>Kaydet</span>
                </button>
                <button 
                  onClick={handleCancel} 
                  className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white text-xs rounded-lg flex items-center space-x-1 transition-colors"
                >
                  <X className="w-3 h-3" />
                  <span>İptal</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className={`px-4 py-3 rounded-xl max-w-md ${
                isUser 
                  ? 'bg-green-500 text-white rounded-br-sm' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-sm'
              }`}>
                <div className="text-sm whitespace-pre-wrap break-words">
                  {message.content}
                </div>
              </div>

              {/* Action Buttons */}
              <div className={`absolute top-1 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1 ${
                isUser ? 'left-1' : 'right-1'
              }`}>
                <button 
                  onClick={handleCopy} 
                  className="w-6 h-6 hover:bg-black/10 dark:hover:bg-white/10 rounded-full flex items-center justify-center transition-colors"
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
                    className="w-6 h-6 hover:bg-black/10 dark:hover:bg-white/10 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        {/* Time */}
        <div className={`text-xs text-gray-500 dark:text-gray-400 mt-1 ${
          isUser ? 'text-right' : 'text-left'
        }`}>
          {time}
        </div>
      </div>
    </div>
  );
};

export default Message;