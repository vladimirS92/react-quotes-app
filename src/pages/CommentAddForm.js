import { Box, TextField, FormControl, FormHelperText, Button, Typography } from '@mui/material';

const CommentAddForm = () => {
  return (
    <Box component='form' autoComplete='off'>
      <Typography variant='subtitle1' gutterBottom color='text.primary'>
        Add comment
      </Typography>
      <FormControl fullWidth sx={{ my: 1 }}>
        <TextField size='small' id='name' label='Your name' variant='outlined' />
        <FormHelperText id='name-helper-text'>We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl fullWidth sx={{ my: 1 }}>
        <TextField size='small' id='comment' label='Comment' variant='outlined' multiline maxRows={4} />
        <FormHelperText id='comment-helper-text'>We'll never share your email.</FormHelperText>
      </FormControl>
      <Button size='small' variant='outlined'>
        Add comment
      </Button>
      <Button size='small' variant='text' sx={{ ml: 2 }}>
        Cancel
      </Button>
    </Box>
  );
};

export default CommentAddForm;
