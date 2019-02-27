import React from "react";

// *** Constants *** //
import * as ROUTES from "../../constants/routes";

// *** Styles *** //

// *** Third-Party *** //
import { NavLink as Link } from "react-router-dom";

// *** HOC and Context *** //
import { AuthUserContext } from "../Session";

// *** Components *** //
import SignOutButton from "../SignOut";

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
  <header>
    <div id="logo-title">
      <h1>
        HAW<span id="air">KU</span>
      </h1>
    </div>
    <nav>
      <ul>
        <li>
          <Link to={ROUTES.HOME} exact activeClassName="selected">
            Home
          </Link>
        </li>
        <li>
          <Link to={ROUTES.COMPETITIONS} exact activeClassName="selected">
            Competitions
          </Link>
        </li>
        <li>
          <Link to={ROUTES.TEAMS} exact activeClassName="selected">
            Teams
          </Link>
        </li>
        <li>
          <Link to={ROUTES.ANOMALIES} exact activeClassName="selected">
            Anomalies
          </Link>
        </li>
        <li>
          <Link to={ROUTES.COMPETITORS} exact activeClassName="selected">
            Competitors
          </Link>
        </li>
        <li>
          <Link to={ROUTES.REPORTS} exact activeClassName="selected">
            Reports
          </Link>
        </li>
      </ul>
      <SignOutButton />
    </nav>
  </header>
);

const NavigationNonAuth = () => (
  <header>
    <h1>HAWKU</h1>
    <nav>
      <ul>
        <li>
          <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Navigation;
