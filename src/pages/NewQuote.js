import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import QuoteAddForm from '../components/QuoteAddForm';
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';

const NewQuote = () => {
  const history = useHistory();
  const { sendRequest, status } = useHttp(addQuote);

  useEffect(() => {
    if (status === 'completed') {
      history.replace('/quotes');
    }
  }, [status, history]);

  const addQuoteHandler = (data) => {
    sendRequest(data);
  };

  return <QuoteAddForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler} />;
};

export default NewQuote;
