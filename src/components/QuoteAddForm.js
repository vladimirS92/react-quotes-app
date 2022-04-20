import React, { useState } from 'react';
import { Box, TextField, FormControl, FormHelperText, Button, Card, Typography, Skeleton } from '@mui/material';
import { Prompt, Link } from 'react-router-dom';

import useInput from '../hooks/use-input';

const QuoteAddForm = (props) => {
  //   const [quoteValue, setQuoteValue] = useState('');
  //   const [authorValue, setAuthorValue] = useState('');
  const [isFormFocused, setIsFormFocused] = useState(false);

  const {
    value: quoteValue,
    isValueValid: quoteValueIsValid,
    isError: quoteValueIsInvalid,
    valueChangeHandler: onChangeQuoteValue,
    valueBlurHandler: onBlurQuoteValue,
    reset: resetQuoteValue,
  } = useInput((valueData) => valueData.trim() !== '');

  const {
    value: authorValue,
    isValueValid: authorValueIsValid,
    isError: authorValueIsInvalid,
    valueChangeHandler: onChangeAuthorValue,
    valueBlurHandler: onBlurAuthorValue,
    reset: resetAuthorValue,
  } = useInput((valueData) => valueData.trim() !== '');

  //   const onChangeAuthorValue = (event) => {
  //     setAuthorValue(event.target.value);
  //   };

  //   const onChangeQuoteValue = (event) => {
  //     setQuoteValue(event.target.value);
  //   };

  let formIsValid = false;

  if (quoteValueIsValid && authorValueIsValid) {
    formIsValid = true;
  }

  const onSubmitAddQuoteHandler = (event) => {
    event.preventDefault();

    if (!quoteValueIsValid && !authorValueIsValid) {
      return;
    }

    props.onAddQuote({ text: quoteValue, author: authorValue });
    resetQuoteValue();
    resetAuthorValue();
  };

  const onFocusAddQuoteHandler = () => {
    setIsFormFocused(true);
  };

  return (
    <>
      {props.isLoading && <Skeleton variant='rectangular' sx={{ m: 2, height: 250 }} />}
      {!props.isLoading && (
        <Card sx={{ m: 2, p: 2 }}>
          <Prompt
            when={isFormFocused}
            message={(location) => {
              'Leave page?';
            }}
          />
          <Box component='form' autoComplete='off' onSubmit={onSubmitAddQuoteHandler} onFocus={onFocusAddQuoteHandler}>
            <Typography variant='subtitle1' gutterBottom color='text.primary'>
              Add quote
            </Typography>
            <FormControl fullWidth sx={{ my: 1 }}>
              <TextField
                id='quote'
                label='Quote'
                variant='outlined'
                multiline
                maxRows={4}
                value={quoteValue}
                onChange={onChangeQuoteValue}
                onBlur={onBlurQuoteValue}
                error={quoteValueIsInvalid}
              />
              {quoteValueIsInvalid && <FormHelperText id='quote-helper-text'>This field should not be empty.</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ my: 1 }}>
              <TextField
                id='author'
                label='Author'
                variant='outlined'
                value={authorValue}
                onChange={onChangeAuthorValue}
                onBlur={onBlurAuthorValue}
                error={authorValueIsInvalid}
              />
              {authorValueIsInvalid && <FormHelperText id='author-helper-text'>This field should not be empty.</FormHelperText>}
            </FormControl>
            <Button type='submit' disabled={!formIsValid} variant='outlined'>
              Add quote
            </Button>
            <Button sx={{ ml: 2 }} type='button' variant='text' component={Link} to='/quotes'>
              Cancel
            </Button>
          </Box>
        </Card>
      )}
    </>
  );
};

export default QuoteAddForm;
