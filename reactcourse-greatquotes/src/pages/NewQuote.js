import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import QuoteForm from '../components/quotes/QuoteForm';
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';

export default function NewQuote() {
  const { sendRequest, status } = useHttp(addQuote);
  const history = useHistory();

  useEffect(() => {
    if (status === 'completed') {
      /*
      Here we can use history.push() or history.replace()
      the difference between these two methods is that the first one will add a new navigation history to the stack, so the
      user will be able to go back with the chrome button ( <- )
      while replace() will replace the current history and the user won't be able to go back
    */
      history.push('/quotes');
    }
  }, [status, history]);

  async function addQuoteHandler(quoteData) {
    sendRequest(quoteData);
  }

  return (
    <>
      <QuoteForm
        isLoading={status === 'pending'}
        onAddQuote={addQuoteHandler}
      />
    </>
  );
}
