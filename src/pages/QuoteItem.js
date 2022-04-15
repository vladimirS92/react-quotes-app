import React from 'react';

import { Card, CardContent, CardActionArea, Typography } from '@mui/material';

const QuoteItem = (props) => {
  return (
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
  );
};

export default QuoteItem;
