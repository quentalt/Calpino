import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import EmojiPicker from 'emoji-picker-react';

interface MarkdownEditorProps {
    content: string;
    setContent: (content: string) => void;
    category: string;
    setCategory: (category: string) => void;
    tags: string[];
    setTags: (tags: string[]) => void;
}

export const MarkdownEditor = ({
                                   content,
                                   setContent,
                                   category,
                                   setCategory,
                                   tags,
                                   setTags,
                               }: MarkdownEditorProps) => {
    const [tagInput, setTagInput] = useState('');
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);


    const handleDeleteTag = (tagToDelete: string) => {
        setTags(tags.filter(tag => tag !== tagToDelete));
    };

    const handleAddTag = () => {
        if (tagInput.trim() === '') {
            return;
        }
        setTags([...tags, tagInput.trim()]);
        setTagInput('');
    }

    return (
        <Box>
            <TextField
                label="Titre"
                variant="outlined"
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                sx={{ mb: 2 }}
            />
            <TextField
                label="Tags"
                variant="outlined"
                fullWidth
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleAddTag}>
                                <AddIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                sx={{ mb: 2 }}
            />
            <Box sx={{ mb: 2 }}>
                {tags.map(tag => (
                    <Chip
                        key={tag}
                        label={tag}
                        onDelete={() => handleDeleteTag(tag)}
                        sx={{ mr: 1, mb: 1 }}
                    />
                ))}
            </Box>
            <TextField
                label="Contenu"
                variant="outlined"
                fullWidth
                multiline
                value={content}
                onChange={(e) => setContent(e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setEmojiPickerVisible(!emojiPickerVisible)}>
                                {emojiPickerVisible ? <CloseIcon /> : <AddIcon />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <Box>
                {emojiPickerVisible && (
                    <Box sx={{ position: 'absolute', zIndex: 1 }}>
                        <EmojiPicker onEmojiClick={(emoji) => setContent(content + emoji.emoji)} />
                    </Box>
                )}
            </Box>
        </Box>

    );
};
