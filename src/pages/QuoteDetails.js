import React, { useState, useEffect } from 'react';
import { Route, useParams, useHistory, Link } from 'react-router-dom';

import { Box, Paper, Typography, Button, IconButton, Grid, Skeleton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CommentIcon from '@mui/icons-material/Comment';
import CloseIcon from '@mui/icons-material/Close';

import Comments from '../components/Comments';
import CommentAddForm from '../components/CommentAddForm';
// import { TEST_QUOTES } from './Quotes';
import useHttp from '../hooks/use-http';
import { getSingleQuote, getAllComments } from '../lib/api';

const QuoteDetails = (props) => {
  const [isCommentAddForm, setIsCommendAddForm] = useState(false);
  const {
    sendRequest: getQuote,
    sendRequest: getComments,
    status: commentStatus,
    status: quoteStatus,
    data: loadedQuote,
    data: loadedComments,
    error: quoteError,
  } = useHttp(getSingleQuote, getAllComments, true);

  const params = useParams();
  const history = useHistory();

  // const quote = TEST_QUOTES.find((quote) => quote.id === params.quoteId);
  const { quoteId } = params;

  //get single quote
  useEffect(() => {
    getQuote(quoteId);
  }, [getQuote, quoteId]);

  //get all comments
  useEffect(() => {
    getComments(quoteId);
  }, [getComments, quoteId]);

  if (quoteStatus === 'pending') {
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

  if (quoteError) {
    //TBD
    return <p>{quoteError.message}</p>;
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

  let comments;
  const onAddedCommentHandler = () => {
    if (commentStatus === 'pending') {
      return (comments = <Skeleton variant='rectangular' sx={{ m: 2, height: 300 }} />);
    }

    if (commentStatus === 'completed' && (loadedComments || loadedComments.length > 0)) {
      comments = <Comments comments={loadedComments} />;
    }

    if (commentStatus === 'completed' && (!loadedComments || loadedComments.length === 0)) {
      comments = (
        <Box>
          <Typography variant='subtitle1'>No comments yet.</Typography>
        </Box>
      );
    }
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
            {!isCommentAddForm && (
              <Grid container justify='flex-end'>
                <Box sx={{ flexGrow: 1 }}>
                  <Button variant='outlined' size='small' color='primary' onClick={showCommentAddFormHandler} startIcon={<AddIcon />}>
                    Add comment
                  </Button>
                </Box>
                <IconButton variant='text' size='small' color='primary' component={Link} to={`/quotes/${quoteId}`}>
                  <CloseIcon />
                </IconButton>
              </Grid>
            )}
            {isCommentAddForm && <CommentAddForm quoteId={quoteId} onAddedComment={onAddedCommentHandler} closeAddForm={hideCommentAddFormHandler} />}
            {comments}
          </Paper>
        </Route>
      </Paper>
    </Box>
  );
};

export default QuoteDetails;
