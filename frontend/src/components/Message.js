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
    <div className={cn(
      "flex items-start space-x-2 md:space-x-3",
      isUser && "flex-row-reverse space-x-reverse"
    )}>
      {/* Avatar */}
      <div className={cn(
        "flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center",
        isUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
      )}>
        {isUser ? (
          <User className="w-3 h-3 md:w-4 md:h-4" />
        ) : (
          <Bot className="w-3 h-3 md:w-4 md:h-4" />
        )}
      </div>

      {/* Message Content */}
      <div className={cn(
        "flex-1 min-w-0",
        isUser && "flex flex-col items-end"
      )}>
        <div className="group relative">
          {isEditing ? (
            <Card className={cn(
              "max-w-[85%] md:max-w-[80%]",
              isUser ? "bg-primary text-primary-foreground" : "bg-muted"
            )}>
              <CardContent className="p-2 md:p-3">
                <Input
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="mb-2 text-sm md:text-base"
                  autoFocus
                />
                <div className="flex space-x-2">
                  <Button size="sm" onClick={handleSave} className="text-xs md:text-sm">
                    <Save className="w-3 h-3 mr-1" />
                    Kaydet
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancel} className="text-xs md:text-sm">
                    <X className="w-3 h-3 mr-1" />
                    İptal
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card className={cn(
                "max-w-[85%] md:max-w-[80%] shadow-sm",
                isUser 
                  ? "bg-primary text-primary-foreground border-primary/20" 
                  : "bg-background/80 backdrop-blur-sm border-border/50"
              )}>
                <CardContent className="p-3 md:p-4">
                  <div className="message-text leading-relaxed text-sm md:text-base">
                    {message.content}
                  </div>
                </CardContent>
              </Card>
              
              {/* Action Buttons - Always visible on mobile */}
              <div className={cn(
                "absolute top-1 md:top-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex space-x-1",
                isUser ? "left-1 md:left-2" : "right-1 md:right-2"
              )}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 md:h-6 md:w-6"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <Check className="w-2 h-2 md:w-3 md:h-3" />
                  ) : (
                    <Copy className="w-2 h-2 md:w-3 md:h-3" />
                  )}
                </Button>
                {isUser && onEdit && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 md:h-6 md:w-6"
                    onClick={handleEdit}
                  >
                    <Edit2 className="w-2 h-2 md:w-3 md:h-3" />
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
        
        {/* Time */}
        <div className={cn(
          "text-xs text-muted-foreground mt-1",
          isUser && "text-right"
        )}>
          {time}
        </div>
      </div>
    </div>
  );
};

export default Message;
