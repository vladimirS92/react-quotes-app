import React from 'react';
import { AppBar, Box, Toolbar, Typography, Tabs, Tab } from '@mui/material';

const MainHeader = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Quotes
          </Typography>
          {/* <Button color='inherit'>All Quotes</Button>
          <Button color='inherit'>Add Quote</Button> */}
          <Tabs aria-label='basic tabs example'>
            <Tab label='All Quotes' />
            <Tab label='Add Quote' />
          </Tabs>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MainHeader;
