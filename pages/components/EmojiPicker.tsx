import { Box, Button } from '@mui/material';
import React from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

interface EmojiPickerProps {
  onEmojiClick: (emoji: EmojiClickData) => void;
}

export const EmojiPickerComponent = ({ onEmojiClick }: EmojiPickerProps) => {
  return (
    <Box>
      <EmojiPicker onEmojiClick={onEmojiClick} />
    </Box>
  );
};

