import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Route, Link } from 'react-router-dom';
import AuthContext from '../store/auth.context';

const MainNav = () => {
  // const [activeTab, setActiveTab] = useState(0);

  // const tabHandler = (event, value) => {
  //   setActiveTab(value);
  // };
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <>
      <AppBar position='fixed'>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant='h5' color='white' component={Link} to='/' sx={{ textDecoration: 0 }}>
              Quotes
            </Typography>
          </Box>
          {isLoggedIn && (
            <Box>
              <Route path={'/add'} exact>
                <Button sx={{ mr: 2 }} component={Link} to={'/quotes'}>
                  All Quotes
                </Button>
              </Route>
              <Route path={'/quotes/'} exact>
                <Button sx={{ mx: 4 }} variant='contained' component={Link} to={'/add'}>
                  Add Quote
                </Button>
              </Route>
              <IconButton color='primary' aria-label='profile' component={Link} to={'/profile'}>
                <AccountCircleIcon />
              </IconButton>
            </Box>
          )}
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
