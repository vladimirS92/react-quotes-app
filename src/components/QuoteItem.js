import React from 'react';

import { Card, CardContent, CardActionArea, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const QuoteItem = (props) => {
  return (
    <Box component={Link} to={'/quotes/' + props.quoteId} sx={{ textDecoration: 0 }}>
      <Card sx={{ m: 2 }}>
        <CardActionArea>
          <CardContent>
            <Typography variant='subtitle1' gutterBottom color='text.primary'>
              {props.quoteText}
            </Typography>
            <Typography variant='body2' gutterBottom color='text.secondary'>
              {props.quoteAuthor}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default QuoteItem;
