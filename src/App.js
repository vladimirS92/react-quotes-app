import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import Quotes from './pages/Quotes';
import QuoteDetails from './pages/QuoteDetails';
// import Layout from './layout/Layout';
import MainNav from './components/MainNav';
import Auth from './pages/Auth';
import Profile from './pages/Profile';

const NewQuote = React.lazy(() => import('./pages/NewQuote'));

const App = () => {
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
          <Route path='/' exact>
            <Redirect to='/quotes' />
          </Route>
          <Route path='/auth' exact component={Auth} />
          <Route path='/profile' exact component={Profile} />
          <Route path='/quotes' exact component={Quotes} />
          <Route path='/quotes/:quoteId' component={QuoteDetails} />
          <Suspense fallback={<Skeleton variant='rectangular' sx={{ m: 2, height: 300 }} />}>
            <Route path='/add' component={NewQuote} />
          </Suspense>
          {/* {activeTab === 0 && <Route path='/quotes' exact component={Quotes} />}
          {activeTab === 1 && (
            <Suspense fallback={<Skeleton variant='rectangular' sx={{ m: 2, height: 300 }} />}>
              <Route path='/add' exact component={NewQuote} />
            </Suspense>
          )} */}
          <Route path='*'>
            <p>Page not found</p>
          </Route>
        </Switch>
      </Container>
    </ThemeProvider>
  );
};

export default App;
