import { useEffect } from 'react';
import { Box, TextField, FormControl, FormHelperText, Button, Typography, Skeleton } from '@mui/material';

import useInput from '../hooks/use-input';
import useHttp from '../hooks/use-http';
import { addComment } from '../lib/api';

const CommentAddForm = (props) => {
  // add comment request
  const { sendRequest, status, error } = useHttp(addComment);

  const { onAddedComment } = props;

  useEffect(() => {
    if (status === 'completed' && !error) {
      // notify parent that comment is added
      onAddedComment();
    }
  }, [status, error, onAddedComment]);

  //validation
  const {
    value: nameValue,
    isValueValid: nameValueIsValid,
    isError: nameValueIsInvalid,
    valueChangeHandler: onChangeNameValue,
    valueBlurHandler: onBlurNameValue,
    reset: resetNameValue,
  } = useInput((valueData) => valueData.trim() !== '');

  const {
    value: commentValue,
    isValueValid: commentValueIsValid,
    isError: commentValueIsInvalid,
    valueChangeHandler: onChangeCommentValue,
    valueBlurHandler: onBlurCommentValue,
    reset: resetCommentValue,
  } = useInput((valueData) => valueData.trim() !== '');

  //form submit
  const submitFormHandler = (event) => {
    event.preventDefault();

    if (!nameValueIsValid && !commentValueIsValid) {
      return;
    }

    const enteredText = commentValue;
    const enteredName = nameValue;

    //send request
    sendRequest({ commentData: { text: enteredText, userName: enteredName }, quoteId: props.qId });
    // props.onAddedComment();
    // props.closeAddForm();

    resetNameValue();
    resetCommentValue();
  };

  return (
    <Box component='form' autoComplete='off' onSubmit={submitFormHandler}>
      {status === 'pending' && <Skeleton variant='rectangular' sx={{ m: 2, height: 300 }} />}
      <Typography variant='subtitle1' gutterBottom color='text.primary'>
        Add comment
      </Typography>
      <FormControl fullWidth sx={{ my: 1 }}>
        <TextField
          error={commentValueIsInvalid}
          size='small'
          id='comment'
          label='Comment'
          variant='outlined'
          multiline
          maxRows={4}
          value={commentValue}
          onChange={onChangeCommentValue}
          onBlur={onBlurCommentValue}
        />
        {commentValueIsInvalid && <FormHelperText id='comment-helper-text'>Could not be empty.</FormHelperText>}
      </FormControl>
      <FormControl fullWidth sx={{ my: 1 }}>
        <TextField
          error={nameValueIsInvalid}
          size='small'
          id='name'
          label='Your name'
          variant='outlined'
          value={nameValue}
          onChange={onChangeNameValue}
          onBlur={onBlurNameValue}
        />
        {nameValueIsInvalid && <FormHelperText id='name-helper-text'>Could not be empty.</FormHelperText>}
      </FormControl>
      <Button type='submit' size='small' variant='outlined'>
        Add comment
      </Button>
      <Button type='button' size='small' variant='text' onClick={props.closeAddForm} sx={{ ml: 2 }}>
        Cancel
      </Button>
    </Box>
  );
};

export default CommentAddForm;
