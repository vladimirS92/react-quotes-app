import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
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
            <Button variant='contained' component={Link} to={'/add'}>
              Add Quote
            </Button>
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
