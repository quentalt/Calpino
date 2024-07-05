import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Box, Button, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FolderIcon from '@mui/icons-material/Folder';
import NoteIcon from '@mui/icons-material/Note';
import {SimpleTreeView, TreeItem} from "@mui/x-tree-view";

interface Note {
    id: string;
    title: string;
    content: string;
    tags: string[];
}

interface Folder {
    id: string;
    name: string;
    notes: Note[];
    folders: Folder[];
}

export const FolderTreeView = () => {
    const [folders, setFolders] = useState<Folder[]>([]);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [newFolderName, setNewFolderName] = useState('');
    const [newNoteTitle, setNewNoteTitle] = useState('');

    const handleAddFolder = () => {
        setFolders([
            ...folders,
            { id: uuidv4(), name: newFolderName, notes: [], folders: [] },
        ]);
        setNewFolderName('');
    };

    const handleAddNote = (folderId: string) => {
        const newNote: Note = {
            id: uuidv4(),
            title: newNoteTitle,
            content: '',
            tags: [],
        };
        const updateFolders = (folders: Folder[]): Folder[] =>
            folders.map((folder) =>
                folder.id === folderId
                    ? { ...folder, notes: [...folder.notes, newNote] }
                    : { ...folder, folders: updateFolders(folder.folders) }
            );
        setFolders(updateFolders(folders));
        setNewNoteTitle('');
    };

    const handleSelectNote = (note: Note) => {
        setSelectedNote(note);
    };

    const renderTree = (folder: Folder) => (
        <TreeItem key={folder.id} itemId={folder.id} label={folder.name}>
            {folder.notes.map((note) => (
                <TreeItem
                    key={note.id}
                    itemId={note.id}
                    label={note.title}
                    onClick={() => handleSelectNote(note)}
                />
            ))}
            {folder.folders.map((subfolder) => renderTree(subfolder))}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                    size="small"
                    placeholder="New Note Title"
                    value={newNoteTitle}
                    onChange={(e) => setNewNoteTitle(e.target.value)}
                    sx={{ mr: 1 }}
                />
                <IconButton onClick={() => handleAddNote(folder.id)}>
                    <AddIcon />
                </IconButton>
            </Box>
        </TreeItem>
    );

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TextField
                    placeholder="New Folder Name"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    sx={{ mr: 1 }}
                />
                <Button variant="contained" onClick={handleAddFolder}>
                    Add Folder
                </Button>
            </Box>
            <SimpleTreeView>
                {folders.map((folder) => renderTree(folder))}
            </SimpleTreeView>
        </Box>
    );
};
