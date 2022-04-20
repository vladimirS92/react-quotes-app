import React, { Suspense, useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Skeleton } from '@mui/material';

import Quotes from './pages/Quotes';
import QuoteDetails from './pages/QuoteDetails';
// import Layout from './layout/Layout';
import MainNav from './components/MainNav';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import AuthContext from './store/auth.context';

const NewQuote = React.lazy(() => import('./pages/NewQuote'));

const App = () => {
  const authCtx = useContext(AuthContext);
  // const { render } = useMainNav();

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <MainNav />
      <Container maxWidth='md' sx={{ pt: 8 }}>
        <Switch>
          <Route path='/' exact component={Auth} />
          {!authCtx.isLoggedIn && <Route path='/auth' component={Auth} />}
          {authCtx.isLoggedIn && <Route path='/profile' component={Profile} />}
          {authCtx.isLoggedIn && <Route path='/quotes' exact component={Quotes} />}
          {authCtx.isLoggedIn && <Route path='/quotes/:quoteId' component={QuoteDetails} />}
          {authCtx.isLoggedIn && (
            <Suspense fallback={<Skeleton variant='rectangular' sx={{ m: 2, height: 300 }} />}>
              <Route path='/add' component={NewQuote} />
            </Suspense>
          )}
          {/* {activeTab === 0 && <Route path='/quotes' exact component={Quotes} />}
          {activeTab === 1 && (
            <Suspense fallback={<Skeleton variant='rectangular' sx={{ m: 2, height: 300 }} />}>
              <Route path='/add' exact component={NewQuote} />
            </Suspense>
          )} */}
          <Route path='*'>
            <Redirect to='/' />
          </Route>
        </Switch>
      </Container>
    </ThemeProvider>
  );
};

export default App;
