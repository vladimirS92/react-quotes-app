import { useHistory } from 'react-router-dom';
import QuoteAddForm from './QuoteAddForm';

const NewQuote = () => {
  const history = useHistory();
  //   const params = useParams();

  const addQuoteHandler = (data) => {
    console.log(data);

    history.push('/');
  };

  return <QuoteAddForm onAddQuote={addQuoteHandler} />;
};

export default NewQuote;
