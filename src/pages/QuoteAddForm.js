import { Box, TextField, FormControl, FormHelperText, Button, Card, Typography } from '@mui/material';

const QuoteAddForm = () => {
  return (
    <Card sx={{ m: 2, p: 2 }}>
      <Box component='form' autoComplete='off'>
        <Typography variant='subtitle1' gutterBottom color='text.primary'>
          Add quote
        </Typography>
        <FormControl fullWidth sx={{ my: 1 }}>
          <TextField id='quote' label='Quote' variant='outlined' multiline maxRows={4} />
          <FormHelperText id='quote-helper-text'>We'll never share your email.</FormHelperText>
        </FormControl>
        <FormControl fullWidth sx={{ my: 1 }}>
          <TextField id='author' label='Author' variant='outlined' />
          <FormHelperText id='author-helper-text'>We'll never share your email.</FormHelperText>
        </FormControl>
        <Button variant='outlined'>Add quote</Button>
        <Button variant='text' sx={{ ml: 2 }}>
          Cancel
        </Button>
      </Box>
    </Card>
  );
};

export default QuoteAddForm;
