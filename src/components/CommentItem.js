import { Box, Typography, Divider } from '@mui/material';

const CommentItem = (props) => {
  return (
    <Box>
      <Divider sx={{ my: 2 }} />
      <Typography variant='subtitle2' gutterBottom color='text.secondary'>
        {props.commentUser}
      </Typography>
      <Typography variant='body1' gutterBottom color='text.primary'>
        {props.commentText}
      </Typography>
    </Box>
  );
};

export default CommentItem;
