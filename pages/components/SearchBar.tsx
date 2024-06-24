import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  return (
    <Box display="flex" justifyContent="center" my={2}>
      <TextField
        label="Search Notes"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
        sx={{ backgroundColor: '#ffffff', borderRadius: '4px' }}
        
      />
    </Box>

  );
};

