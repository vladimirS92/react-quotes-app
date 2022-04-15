import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Badge from '@mui/material/Badge';

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
      <CardActions>
        <Badge badgeContent={0} color='secondary'>
          <Button variant='outlined' size='small' color='secondary'>
            Comments
          </Button>
        </Badge>
      </CardActions>
    </Card>
  );
};

export default QuoteItem;
