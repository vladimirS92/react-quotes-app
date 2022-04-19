import React, { useEffect } from 'react';
import { Route, useParams, useHistory, Link } from 'react-router-dom';

import { Box, Paper, Typography, Button, Skeleton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CommentIcon from '@mui/icons-material/Comment';

import Comments from '../components/Comments';
// import { TEST_QUOTES } from './Quotes';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';

const QuoteDetails = () => {
  const { sendRequest, status, data: loadedQuote, error } = useHttp(getSingleQuote, true);
  console.log(loadedQuote);
  const params = useParams();
  const history = useHistory();
  const { quoteId } = params;
  // const quote = TEST_QUOTES.find((quote) => quote.id === params.quoteId);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === 'pending') {
    return (
      <Box sx={{ m: 2, mt: 8 }}>
        <Skeleton />
        <Skeleton width='60%' />
      </Box>
    );
  }

  if (!loadedQuote.text) {
    return (
      <Typography variant='h4' component='div' color='text.secondary' sx={{ flexGrow: 1 }}>
        Quote is not found.
      </Typography>
    );
  }

  if (error) {
    //TBD
    return <p>{error.message}</p>;
  }

  const goBackHandler = () => {
    history.push('/');
  };

  return (
    <Box
      sx={{
        width: 1,
      }}
    >
      <Paper elevation={0} sx={{ p: 2 }}>
        <Box sx={{ my: 8 }}>
          <Typography variant='h5' gutterBottom color='text.primary'>
            {loadedQuote.text}
          </Typography>
          <Typography variant='h6' gutterBottom color='text.secondary'>
            {loadedQuote.author}
          </Typography>
        </Box>
        <Button variant='text' startIcon={<ArrowBackIcon />} onClick={goBackHandler}>
          Go back
        </Button>
        <Route path={`/quotes/${quoteId}`} exact>
          <Button variant='text' sx={{ mx: 2 }} startIcon={<CommentIcon />} component={Link} to={`/quotes/${quoteId}/comments`}>
            Open comments
          </Button>
        </Route>
        <Route path={`/quotes/${quoteId}/comments`} exact>
          <Paper elevation={1} sx={{ p: 2, mt: 3 }}>
            <Comments quoteId={quoteId} />
          </Paper>
        </Route>
      </Paper>
    </Box>
  );
};

export default QuoteDetails;
