import React from 'react';

import QuoteItem from './QuoteItem';

const TEST_QUOTES = [
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

const Quotes = () => {
  const QuotesList = TEST_QUOTES.map((quote) => {
    return <QuoteItem key={quote.id} quoteText={quote.text} quoteAuthor={quote.author} />;
  });

  return <>{QuotesList}</>;
};
export default Quotes;
