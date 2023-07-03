import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router';
import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

function sortQuotes(quotes, ascending) {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.author > quoteB.author ? 1 : -1;
    } else {
      return quoteA.author < quoteB.author ? 1 : -1;
    }
  });
}

const QuoteList = props => {
  const history = useHistory();

  // hook for fetching the Query Parameters
  const location = useLocation();

  // Javascript object instance to convert the parameters from string to an object
  const queryParams = new URLSearchParams(location.search);

  const isAscending = queryParams.get('sort') === 'asc';

  const sortedQuotes = sortQuotes(props.quotes, isAscending);

  function changeSortHandler() {
    history.push({
      pathname: location.pathname,
      search: `?sort=${isAscending ? 'desc' : 'asc'}`,
    });

    // Another approach
    // history.push(`${location.pathname}?sort=${isAscending ? 'desc' : 'asc'}`);
  }

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortHandler}>
          Ordenar {isAscending ? 'Descendente' : 'Ascendente'}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map(quote => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
