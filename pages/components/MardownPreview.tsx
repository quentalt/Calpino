import React from 'react';
import ReactMarkdown from 'react-markdown';
import Box from '@mui/material/Box';

interface MarkdownPreviewProps {
  content: string;
}

export const MarkdownPreview = ({ content }: MarkdownPreviewProps) => {
  return (
    <Box
      sx={{
        backgroundColor: '#ffffff',
        borderRadius: '4px',
        padding: '16px',
        overflowY: 'auto',
        maxHeight: '600px',
        border: '1px solid #e0e0e0',
      }}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </Box>
  );
};

