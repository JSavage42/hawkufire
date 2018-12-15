import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navigation from "../Navigation";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import InstructorPage from "../Instructor";
import StudentPage from "../Student";
import {
  CreateTestBank,
  TakeTest,
  SelectTest,
  HostTest,
  TestPage
} from "../Tests";
import { NewQuestion } from "../Questions";

import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";
import "../../styles/base/App.css";

const App = () => (
  <Router>
    <div>
      <Navigation />
      <Switch>
        <Route exact path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
        <Route path={ROUTES.INSTRUCTOR} component={InstructorPage} />
        <Route path={ROUTES.STUDENT} component={StudentPage} />
        <Route path={ROUTES.CREATE_TEST} component={CreateTestBank} />
        <Route path={ROUTES.NEW_QUESTION} component={NewQuestion} />
        <Route path={ROUTES.SELECT_TEST} component={SelectTest} />
        <Route path={ROUTES.TESTS} component={TestPage} />
        <Route path={ROUTES.HOST_TEST} component={HostTest} />
        <Route path={ROUTES.TAKE_TEST} component={TakeTest} />
      </Switch>
    </div>
  </Router>
);

export default withAuthentication(App);