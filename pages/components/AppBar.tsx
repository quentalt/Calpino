import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useThemeContext } from '../_app';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { Button, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import NoteIcon from '@mui/icons-material/Note';
import { Note } from '../types/note';

interface MyAppBarProps {
    onDrawerToggle: () => void;
    notes: Note[];
    onSelectNote: (note: Note) => void;
}

export const MyAppBar = ({ onDrawerToggle, notes, onSelectNote }: MyAppBarProps) => {
    const { toggleTheme, isDarkMode } = useThemeContext();
    const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

    useEffect(() => {
        if (searchQuery) {
            setFilteredNotes(
                notes.filter(note =>
                    note.content.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        } else {
            setFilteredNotes([]);
        }
    }, [searchQuery, notes]);

    const handleSearchDialogOpen = () => {
        setIsSearchDialogOpen(true);
    };

    const handleSearchDialogClose = () => {
        setIsSearchDialogOpen(false);
        setSearchQuery(''); // Réinitialiser la recherche lorsque la modal se ferme
    };

    const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleNoteSelect = (note: Note) => {
        onSelectNote(note);
        handleSearchDialogClose();
    };

    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={onDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                        Notes
                    </Typography>
                    <IconButton color="inherit" onClick={handleSearchDialogOpen}>
                        <SearchIcon />
                    </IconButton>
                    <IconButton color="inherit" onClick={toggleTheme}>
                        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Dialog
                open={isSearchDialogOpen}
                onClose={handleSearchDialogClose}
                PaperProps={{
                    style: {
                        backdropFilter: 'blur(5px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    },
                }}
            >
                <DialogTitle>Search Notes</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter your search query below:
                    </DialogContentText>
                    <TextField
                        label="Search Notes"
                        variant="outlined"
                        value={searchQuery}
                        onChange={handleSearchQueryChange}
                        fullWidth
                        sx={{ backgroundColor: '#ffffff', borderRadius: '4px' }}
                    />
                    <List>
                        {filteredNotes.map(note => (
                            <ListItem button key={note.id} onClick={() => handleNoteSelect(note)}>
                                <ListItemIcon>
                                    <NoteIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={note.content.split('\n')[0]}
                                    secondary={new Date(note.date).toLocaleString()}
                                />
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSearchDialogClose}>Cancel</Button>
                    <Button onClick={handleSearchDialogClose} variant="contained" color="primary">
                        Search
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
