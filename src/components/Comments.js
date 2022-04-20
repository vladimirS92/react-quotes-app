import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { Box, Typography, Skeleton, Grid, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

import CommentItem from './CommentItem';
import CommentAddForm from './CommentAddForm';
import { getAllComments } from '../lib/api';
import useHttp from '../hooks/use-http';

// const TEST_COMMENT = [
//   {
//     id: 'c1',
//     text: 'so lovely..',
//     userName: 'Sam',
//   },
//   {
//     id: 'c2',
//     text: 'Could not said better myself!',
//     userName: 'Jonh Doe',
//   },
// ];

const Comments = (props) => {
  const [isCommentAddForm, setIsCommendAddForm] = useState(false);

  // const params = useParams();
  // const { quoteId } = params;

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(props.quoteId);
  }, [sendRequest, props.quoteId]);

  const addedCommentHandler = useCallback(() => {
    sendRequest(props.quoteId);
    hideCommentAddFormHandler();
  }, [sendRequest, props.quoteId]);

  const showCommentAddFormHandler = () => {
    setIsCommendAddForm(true);
  };

  const hideCommentAddFormHandler = () => {
    setIsCommendAddForm(false);
  };

  let comments;

  if (status === 'pending') {
    return (comments = (
      <Box>
        <Skeleton variant='rectangular' sx={{ m: 2, height: 100 }} />
        <Skeleton variant='rectangular' sx={{ m: 2, height: 100 }} />
      </Box>
    ));
  }

  if (status === 'completed' && (loadedComments || loadedComments.length > 0)) {
    const CommentsList = loadedComments.map((comment) => {
      return <CommentItem key={comment.id} commentText={comment.text} commentUser={comment.userName} />;
    });
    comments = CommentsList;
  }

  if (status === 'completed' && (!loadedComments || loadedComments.length === 0)) {
    comments = (
      <Box>
        <Typography variant='subtitle1' sx={{ mt: 4 }}>
          No comments added yet.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      {!isCommentAddForm && (
        <Grid container justify='flex-end'>
          <Box sx={{ flexGrow: 1 }}>
            <Button variant='outlined' size='small' color='primary' onClick={showCommentAddFormHandler} startIcon={<AddIcon />}>
              Add comment
            </Button>
          </Box>
          <IconButton variant='text' size='small' color='primary' component={Link} to={`/quotes/${props.quoteId}`}>
            <CloseIcon />
          </IconButton>
        </Grid>
      )}
      {isCommentAddForm && <CommentAddForm qId={props.quoteId} onAddedComment={addedCommentHandler} closeAddForm={hideCommentAddFormHandler} />}
      {comments}
    </>
  );
};
export default Comments;
