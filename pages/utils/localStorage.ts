import { Note } from '../types/note';

const NOTES_KEY = 'notes';

export const saveNotes = (notes: Note[]) => {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
};

export const loadNotes = (): Note[] => {
  const notes = localStorage.getItem(NOTES_KEY);
  return notes ? JSON.parse(notes) : [];
};

export const sortNotesByDate = (notes: Note[]) => {
  return notes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
