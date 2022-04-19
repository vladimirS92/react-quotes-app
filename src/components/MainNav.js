import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Route, Link } from 'react-router-dom';

const MainNav = () => {
  // const [activeTab, setActiveTab] = useState(0);

  // const tabHandler = (event, value) => {
  //   setActiveTab(value);
  // };
  return (
    <>
      <AppBar position='fixed'>
        <Toolbar>
          <Box component={Link} to='/' sx={{ flexGrow: 1, textDecoration: 0 }}>
            <Typography variant='h5' component='div' color='white'>
              Quotes
            </Typography>
          </Box>
          <Route path={'/add'} exact>
            <Button sx={{ mr: 2 }} component={Link} to={'/quotes'}>
              All Quotes
            </Button>
          </Route>
          <Route path={'/quotes/'} exact>
            <Button sx={{ mx: 4 }} variant='contained' component={Link} to={'/add'}>
              Add Quote
            </Button>
            <IconButton color='primary' aria-label='profile' component={Link} to={'/profile'}>
              <AccountCircleIcon />
            </IconButton>
          </Route>
          {/* <Tabs value={activeTab} onChange={tabHandler}>
              <Tab label='All Quotes' component={Link} to={'/quotes'} />
              <Tab label='Add Quote' component={Link} to={'/quotes/add'} />
            </Tabs> */}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default MainNav;
