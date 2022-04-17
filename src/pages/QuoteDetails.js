import React, { useState } from 'react';
import { Route, useParams, useHistory } from 'react-router-dom';

import { Box, Paper, Typography, Button, IconButton, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CommentIcon from '@mui/icons-material/Comment';
import CloseIcon from '@mui/icons-material/Close';

import Comments from '../components/Comments';
import CommentAddForm from '../components/CommentAddForm';
import { TEST_QUOTES } from './Quotes';
import { Link } from 'react-router-dom';

const QuoteDetails = (props) => {
  const [isCommentAddForm, setIsCommendAddForm] = useState(false);

  const params = useParams();
  const history = useHistory();

  const quote = TEST_QUOTES.find((quote) => quote.id === params.quoteId);

  if (!quote) {
    return (
      <Typography variant='h4' component='div' color='text.secondary' sx={{ flexGrow: 1 }}>
        Quote is not found.
      </Typography>
    );
  }

  const showCommentAddFormHandler = () => {
    setIsCommendAddForm(true);
  };

  const hideCommentAddFormHandler = () => {
    setIsCommendAddForm(false);
  };

  const goBackHandler = () => {
    history.push('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Paper elevation={0} sx={{ p: 2 }}>
        <Box sx={{ my: 8 }}>
          <Typography variant='h5' gutterBottom color='text.primary'>
            {quote.text}
          </Typography>
          <Typography variant='h6' gutterBottom color='text.secondary'>
            {quote.author}
          </Typography>
        </Box>
        <Button variant='text' startIcon={<ArrowBackIcon />} onClick={goBackHandler}>
          Go back
        </Button>
        <Route path={`/quotes/${params.quoteId}`} exact>
          <Button variant='text' sx={{ mx: 2 }} startIcon={<CommentIcon />} component={Link} to={`/quotes/${params.quoteId}/comments`}>
            Open comments
          </Button>
        </Route>
        <Route path={`/quotes/${params.quoteId}/comments`} exact>
          <Paper elevation={1} sx={{ p: 2, mt: 3 }}>
            {!isCommentAddForm && (
              <Grid container justify='flex-end'>
                <Box sx={{ flexGrow: 1 }}>
                  <Button variant='outlined' size='small' color='primary' onClick={showCommentAddFormHandler} startIcon={<AddIcon />}>
                    Add comment
                  </Button>
                </Box>
                <IconButton variant='text' size='small' color='primary' component={Link} to={`/quotes/${params.quoteId}`}>
                  <CloseIcon />
                </IconButton>
              </Grid>
            )}
            {isCommentAddForm && <CommentAddForm closeAddForm={hideCommentAddFormHandler} />}
            <Comments />
          </Paper>
        </Route>
      </Paper>
    </Box>
  );
};

export default QuoteDetails;
