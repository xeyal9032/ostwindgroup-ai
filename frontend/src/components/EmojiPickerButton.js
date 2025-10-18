import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Smile, X } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';

const EmojiPickerButton = ({ onEmojiSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiClick = (emojiData) => {
    onEmojiSelect(emojiData.emoji);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-7 w-7 hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Smile className="w-4 h-4" />
      </Button>
      
      {isOpen && (
        <div className="absolute bottom-10 left-0 z-50">
          <div className="relative">
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              width={300}
              height={400}
              searchDisabled={false}
              skinTonesDisabled={false}
              previewConfig={{
                showPreview: true,
                defaultEmoji: '1f60a',
                defaultCaption: 'Emoji seçin'
              }}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPickerButton;
