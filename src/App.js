import CssBaseline from '@mui/material/CssBaseline';

import MainHeader from './components/MainHeader';
import Quotes from './pages/Quotes';
import QuoteAddForm from './pages/QuoteAddForm';
import QuoteDetails from './pages/QuoteDetails';

import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const App = () => {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <MainHeader />
      <Container maxWidth='md' sx={{ pt: 8 }}>
        <QuoteAddForm />
        <Quotes />
        <QuoteDetails />
      </Container>
    </ThemeProvider>
  );
};

export default App;
