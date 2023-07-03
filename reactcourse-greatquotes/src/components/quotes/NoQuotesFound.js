import { Link } from 'react-router-dom';
import classes from './NoQuotesFound.module.css';

const NoQuotesFound = () => {
  return (
    <div className={classes.noquotes}>
      <p>Nenhuma citação encontrada!</p>
      <Link to="/new-quote" className="btn">
        Adicione uma citação
      </Link>
    </div>
  );
};

export default NoQuotesFound;
