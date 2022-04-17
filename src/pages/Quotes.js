import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import QuoteItem from '../components/QuoteItem';

import { Button } from '@mui/material';

export const TEST_QUOTES = [
  {
    id: 'q1',
    text: 'As he read, I fell in love the way you fall asleep: slowly, and then all at once.',
    author: 'John Green',
  },
  {
    id: 'q2',
    text: 'Loved you yesterday, love you still, always have, always will.',
    author: 'Elaine Davis',
  },
  {
    id: 'q3',
    text: 'I saw that you were perfect, and so I loved you. Then I saw that you were not perfect and I loved you even more.',
    author: 'Angelita Lim',
  },
];

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const Quotes = (props) => {
  const history = useHistory();
  const location = useLocation();

  //////////////////////default js class
  const queryParams = new URLSearchParams(location.search);

  const isSortingAsc = queryParams.get('sort') === 'asc';

  const sortedQuotes = sortQuotes(TEST_QUOTES, isSortingAsc);

  const changeSortingHandler = () => {
    history.push('/quotes?sort=' + (isSortingAsc ? 'desc' : 'asc'));
  };

  const QuotesList = sortedQuotes.map((quote) => {
    return <QuoteItem key={quote.id} quoteId={quote.id} quoteText={quote.text} quoteAuthor={quote.author} />;
  });

  return (
    <>
      <Button variant='outlined' onClick={changeSortingHandler} sx={{ m: 2 }}>
        Sort {!isSortingAsc ? 'Ascending' : 'Descending'}
      </Button>
      {QuotesList}
    </>
  );
};
export default Quotes;
