import classes from './QuoteItem.module.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

const QuoteItem = props => {
  const location = useLocation();

  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>"{props.text}"</p>
        </blockquote>
        <figcaption>{props.author}</figcaption>
      </figure>
      <Link to={`${location.pathname}/${props.id}`} className="btn">
        Ver detalhes
      </Link>
    </li>
  );
};

export default QuoteItem;
