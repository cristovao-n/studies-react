import { Link, NavLink } from 'react-router-dom';
import classes from './MainNavigation.module.css';

export default function MainNavigation() {
  return (
    <header className={classes.header}>
      <Link className={classes['logo-link']} to="/quotes">
        <h1 className={classes.logo}>Great Quotes</h1>
      </Link>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink activeClassName={classes.active} to="/quotes">
              Citações
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/new-quote">
              Nova citação
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
