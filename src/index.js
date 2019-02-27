import React from 'react';
import * as serviceWorker from './serviceWorker';

// *** Third-Party *** //
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// *** Styles *** //
import './styles/base/index.css';
import './styles/base/settings.css';
import './styles/base/reset.css';

// *** Components *** //
import App from './components/App';
import Firebase, { FirebaseContext } from './components/Firebase';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <Router>
      <App />
    </Router>
  </FirebaseContext.Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
