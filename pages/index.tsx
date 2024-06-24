import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSnackbar } from 'notistack';
import {SearchBar} from './components/SearchBar';
import { Note } from './types/note';
import { saveNotes, loadNotes, sortNotesByDate } from './utils/localStorage';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled, useTheme } from '@mui/material/styles';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { MarkdownEditor } from './components/MardownEditor';
import { MarkdownPreview } from './components/MardownPreview';
import { MyAppBar } from './components/AppBar';

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  content: string;
}


const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{ open?: boolean }>(
  ({ open }) => ({
    flexGrow: 1,
    padding: useTheme().spacing(3),
    transition: useTheme().transitions.create('margin', {
      easing: useTheme().transitions.easing.sharp,
      duration: useTheme().transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: useTheme().transitions.create('margin', {
        easing: useTheme().transitions.easing.easeOut,
        duration: useTheme().transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(true);  

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const savedNotes = loadNotes();
    setNotes(sortNotesByDate(savedNotes));
  }, []);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ open, onClose, onConfirm, title, content }) => (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="secondary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
  
  const handleSaveNote = () => {
    if (selectedNote) {
      setSelectedNote((prev: any) => prev ? { ...prev, date: new Date().toISOString() } : null);
      const noteIndex = notes.findIndex(note => note.id === selectedNote.id);
      if (noteIndex === -1) {
        setNotes([...notes, selectedNote]);
      } else {
        const updatedNotes = [...notes];
        updatedNotes[noteIndex] = selectedNote;
        setNotes(updatedNotes);
      }
      enqueueSnackbar('Note saved successfully', { variant: 'success' });
    }
  }


  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
  };

  const handleDeleteNote = (noteId: string) => {
    setNoteToDelete(noteId);
    setConfirmDialogOpen(true);
  };

  const confirmDeleteNote = () => {
    if (noteToDelete) {
      setNotes(prevNotes => prevNotes.filter(note => note.id !== noteToDelete));
      setNoteToDelete(null);
      enqueueSnackbar('Note deleted successfully', { variant: 'error' });
    }
    setConfirmDialogOpen(false);
  };

  const handleNewNote = () => {
    setSelectedNote({ id: uuidv4(), content: '', date: new Date().toISOString(), category: '', tags: [] });
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  const filteredNotes = notes.filter(note => note.content.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
    <MyAppBar onDrawerToggle={handleDrawerToggle} />
      <Drawer
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={handleDrawerToggle}>
            {drawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Box>
        <Divider />
        <List>
          <ListItem button onClick={handleNewNote}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="New Note" />
          </ListItem>
          <Divider />
          {filteredNotes.map(note => (
            <ListItem key={note.id} button onClick={() => handleSelectNote(note)}>
              <ListItemText primary={note.content.split('\n')[0]} />
              <IconButton onClick={() => handleDeleteNote(note.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      
    
      <Main open={selectedNote !== null} sx={{ m: 4 }}> 
    <Container>
        <Typography variant="h4" sx={{ my: 2 }}> Notes</Typography>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <MarkdownEditor
            content={selectedNote?.content || ''}
            setContent={(content: string) => setSelectedNote((prev: any) => prev ? { ...prev, content } : null)}
            category={selectedNote?.category || ''}
            setCategory={(category: string) => setSelectedNote((prev: any) => prev ? { ...prev, category } : null)}
            tags={selectedNote?.tags || []}
            setTags={(tags: string[]) => setSelectedNote((prev: any) => prev ? { ...prev, tags } : null)}
          />
        <MarkdownPreview content={selectedNote?.content || ''} />
          <Divider sx={{ my: 2 }} />
          <Button variant="contained" color="primary" onClick={handleSaveNote} sx={{ mb: 2 }}>Save</Button>
        </Container>

        <ConfirmDialog
          open={confirmDialogOpen}
          onClose={() => setConfirmDialogOpen(false)}
          onConfirm={confirmDeleteNote}
          title="Delete Note"
          content="Are you sure you want to delete this note?"
        />
      </Main>
    </>
  );
}


