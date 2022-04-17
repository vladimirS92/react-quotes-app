import React, { useState } from 'react';
import { Box, TextField, FormControl, FormHelperText, Button, Card, Typography } from '@mui/material';
import { Prompt, Link } from 'react-router-dom';

const QuoteAddForm = (props) => {
  const [quoteValue, setQuoteValue] = useState('');
  const [authorValue, setAuthorValue] = useState('');
  const [isFormFocused, setIsFormFocused] = useState(false);

  const onChangeAuthorValue = (event) => {
    setAuthorValue(event.target.value);
  };

  const onChangeQuoteValue = (event) => {
    setQuoteValue(event.target.value);
  };

  const onSubmitAddQuoteHandler = (event) => {
    event.preventDefault();

    props.onAddQuote({ text: quoteValue, author: authorValue });
  };

  const onFocusAddQuoteHandler = () => {
    setIsFormFocused(true);
  };

  return (
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
          <TextField id='quote' label='Quote' variant='outlined' multiline maxRows={4} value={quoteValue} onChange={onChangeQuoteValue} />
          <FormHelperText id='quote-helper-text'>Enter quote.</FormHelperText>
        </FormControl>
        <FormControl fullWidth sx={{ my: 1 }}>
          <TextField id='author' label='Author' variant='outlined' value={authorValue} onChange={onChangeAuthorValue} />
          <FormHelperText id='author-helper-text'>Enter quote's author.</FormHelperText>
        </FormControl>
        <Button type='submit' variant='outlined'>
          Add quote
        </Button>
        <Button sx={{ ml: 2 }} type='button' variant='text' component={Link} to='/'>
          Cancel
        </Button>
      </Box>
    </Card>
  );
};

export default QuoteAddForm;
