import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import AddIcon from '@mui/icons-material/Add';

const MainHeader = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Quotes
          </Typography>
          <Button color='inherit' startIcon={<AddIcon />}>
            Add Quote
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MainHeader;
