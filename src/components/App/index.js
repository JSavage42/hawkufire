import React from 'react';

// *** Constants *** //
import * as ROUTES from '../../constants/routes';

// *** Third-Party *** //
import { Route, Switch } from 'react-router-dom';

// *** Styles *** //
import '../../styles/base/App.css';

// *** HOC and Context *** //
import { withAuthentication } from '../Session';

// *** Components *** //
import HomePage from '../Home';
import Navigation from '../Navigation';
import SignInPage from '../SignIn';
import SignUpPage from '../SignUp';
import {
  CompetitionList,
  AddCompetition,
  EditCompetition,
  CompetitionDetails,
} from '../Competitions';
import { TeamList, AddTeam, EditTeam, TeamDetails } from '../Teams';
import {
  AnomalyList,
  AddAnomaly,
  EditAnomaly,
  AnomalyDetails,
} from '../Anomalies';
import {
  CompetitorList,
  AddCompetitor,
  EditCompetitor,
  CompetitorDetails,
} from '../Competitors';
import { ReportList, AddReport, EditReport, ReportDetails } from '../Reports';

const App = () => (
  <React.Fragment>
    <Navigation />
    <Switch>
      <Route exact path={ROUTES.HOME} component={HomePage} />
      <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
      {/* Competitions */}
      <Route exact path={ROUTES.COMPETITIONS} component={CompetitionList} />
      <Route exact path={ROUTES.ADD_COMPETITION} component={AddCompetition} />
      <Route exact path={ROUTES.EDIT_COMPETITION} component={EditCompetition} />
      <Route
        exact
        path={ROUTES.VIEW_COMPETITION}
        component={CompetitionDetails}
      />
      {/* Teams */}
      <Route exact path={ROUTES.TEAMS} component={TeamList} />
      <Route exact path={ROUTES.ADD_TEAM} component={AddTeam} />
      <Route exact path={ROUTES.EDIT_TEAM} component={EditTeam} />
      <Route exact path={ROUTES.VIEW_TEAM} component={TeamDetails} />
      {/* Anomalies */}
      <Route exact path={ROUTES.ANOMALIES} component={AnomalyList} />
      <Route exact path={ROUTES.ADD_ANOMALY} component={AddAnomaly} />
      <Route exact path={ROUTES.EDIT_ANOMALY} component={EditAnomaly} />
      <Route exact path={ROUTES.VIEW_ANOMALY} component={AnomalyDetails} />
      {/* Competitors */}
      <Route exact path={ROUTES.COMPETITORS} component={CompetitorList} />
      <Route exact path={ROUTES.ADD_COMPETITOR} component={AddCompetitor} />
      <Route exact path={ROUTES.EDIT_COMPETITOR} component={EditCompetitor} />
      <Route
        exact
        path={ROUTES.VIEW_COMPETITOR}
        component={CompetitorDetails}
      />

      {/* Reports */}
      <Route exact path={ROUTES.REPORTS} component={ReportList} />
      <Route exact path={ROUTES.ADD_REPORT} component={AddReport} />
      <Route exact path={ROUTES.EDIT_REPORT} component={EditReport} />
      <Route exact path={ROUTES.VIEW_REPORT} component={ReportDetails} />
    </Switch>
  </React.Fragment>
);

export default withAuthentication(App);
