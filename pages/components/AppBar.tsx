import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export const MyAppBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
        Mini Calpin
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

