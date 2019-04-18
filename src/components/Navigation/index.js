import React from "react";

// *** Constants *** //
import * as ROUTES from "../../constants/routes";

// *** Styles *** //
import "../../styles/components/Navigation.css";

// *** Third-Party *** //
import { NavLink } from "react-router-dom";

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
      <h1>HAWKU</h1>
      <SignOutButton />
    </div>
    <nav>
      <ul>
        <li>
          <NavLink to={ROUTES.HOME} exact activeClassName="selected">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={ROUTES.COMPETITIONS} activeClassName="selected">
            Competitions
          </NavLink>
        </li>
        <li>
          <NavLink to={ROUTES.TEAMS} activeClassName="selected">
            Teams
          </NavLink>
        </li>
        <li>
          <NavLink to={ROUTES.ANOMALIES} activeClassName="selected">
            Anomalies
          </NavLink>
        </li>
        <li>
          <NavLink to={ROUTES.COMPETITORS} activeClassName="selected">
            Competitors
          </NavLink>
        </li>
        <li>
          <NavLink to={ROUTES.REPORTS} activeClassName="selected">
            Reports
          </NavLink>
        </li>
        <li>
          <NavLink to={ROUTES.DASHBOARD} activeClassName="selected">
            Dashboard
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

const NavigationNonAuth = () => (
  <header>
    <h2>HAWKU</h2>
    <nav>
      <ul>
        <li>
          <NavLink to={ROUTES.SIGN_IN}>Sign In</NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Navigation;
