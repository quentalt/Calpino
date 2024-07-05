/*
import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, IconButton, Menu, MenuItem, Divider, Box, Fab } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, ChevronLeft as ChevronLeftIcon, Send as SendIcon } from '@mui/icons-material';
import {Note} from "@/pages/types/note";
import {Folder} from "@/pages/types/Folder";
import FolderIcon from '@mui/icons-material/Folder';


interface DrawerContentProps {
    folders: Folder[];
    notes: Note[];
    filteredNotes: Note[];
    selectedFolderId: string;
    selectedNoteId: string;
    searchQuery: string;
    isDrawerOpen: boolean;
    handleSelectFolder: (folderId: string) => void;
    handleSelectNote: (note: Note) => void;
    handleDeleteNote: (noteId: string) => void;
    handleNewNote: (folderId: string) => void;
    handleDeleteFolder: (folderId: string) => void;
    handleSendNote: (noteId: string) => void;
}

export const DrawerContent: React.FC<DrawerContentProps> = ({
    folders,
    notes,
    filteredNotes,
    selectedFolderId,
    selectedNoteId,
    searchQuery,
    isDrawerOpen,
    handleSelectFolder,
    handleSelectNote,
    handleDeleteNote,
    handleNewNote,
    handleDeleteFolder,
    handleSendNote,
}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <List>
            <ListItem>
                <ChevronLeftIcon onClick={() => handleMenuClose()} />
                <ListItemText primary="Folders" />
                <IconButton edge="end" onClick={handleMenuOpen}>
                    <AddIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={() => handleNewNote('')}>
                        <ListItemIcon>
                            <AddIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="New Note" />
                    </MenuItem>
                    <Divider />
                    {folders.map(folder => (
                        <MenuItem key={folder.id} onClick={() => handleNewNote(folder.id)}>
                            <ListItemIcon>
                                <FolderIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={folder.name} />
                        </MenuItem>
                    ))}
                </Menu>
            </ListItem>
            {folders.map(folder => (
                <ListItem
                    key={folder.id}
                    button
                    selected={folder.id === selectedFolderId}
                    onClick={() => handleSelectFolder(folder.id)}
                >
                    <ListItemText primary={folder.name} />
                    <IconButton edge="end" onClick={() => handleDeleteFolder(folder.id)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItem>
            ))}
            <ListItem>
                <ListItemText primary="Notes" />
            </ListItem>
            {filteredNotes.map(note => (
                <ListItem
                    key={note.id}
                    button
                    selected={note.id === selectedNoteId}
                    onClick={() => handleSelectNote(note)}
                >
                    <ListItemText primary={note.content.split('\n')[0]} />
                    <IconButton edge="end" onClick={() => handleDeleteNote(note.id)}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton edge
                        onClick={() => handleSendNote(note.id)}
                    >
                        <SendIcon />
                    </IconButton>
                </ListItem>
            ))}
        </List>
    );
}
*/
