import { Box, Paper, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import Comments from './Comments';
import CommentAddForm from './CommentAddForm';

const QuoteDetails = () => {
  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Paper elevation={0} sx={{ p: 2 }}>
        <Typography variant='h5' gutterBottom color='text.primary'>
          “As he read, I fell in love the way you fall asleep: slowly, and then all at once.”
        </Typography>
        <Typography variant='h6' gutterBottom color='text.secondary'>
          John Green
        </Typography>
        <Box sc={{ mt: 3 }}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Button variant='outlined' size='small' color='primary' startIcon={<AddIcon />}>
              Add comment
            </Button>
            <CommentAddForm />
            <Comments />
          </Paper>
        </Box>
      </Paper>
    </Box>
  );
};

export default QuoteDetails;
