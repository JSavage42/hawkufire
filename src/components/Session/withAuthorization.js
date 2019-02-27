import React from 'react';

// *** Constants *** //
import * as ROUTES from '../../constants/routes';

// *** Third-Party *** //
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

// *** HOC and Context *** //
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthorization = (condition) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      const { firebase, history } = this.props;
      this.listener = firebase.onAuthUserListener(
        (authUser) => {
          if (!condition(authUser)) {
            history.push(ROUTES.SIGN_IN);
          }
        },
        () => history.push(ROUTES.SIGN_IN),
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {(authUser) =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(
    withRouter,
    withFirebase,
  )(WithAuthorization);
};

export default withAuthorization;
