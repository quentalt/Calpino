import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

interface MarkdownPreviewProps {
  content: string;
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content }) => {
    const theme = useTheme();

    return (
        <Box sx={{padding: theme.spacing(2)}}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </Box>
    );
}
