import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    // *** Helper *** //

    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    // *** Firebase APIs *** //

    this.auth = app.auth();
    this.db = app.database();
    this.storage = app.storage();

    // *** Social Sign In Method Provider *** //

    this.googleProvider = new app.auth.GoogleAuthProvider();
  }

  // *** Auth API *** //

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT
    });

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once("value")
          .then(snapshot => {
            const dbUser = snapshot.val();

            // *** default empty roles ***  //
            if (!dbUser.roles) {
              dbUser.roles = [];
            }

            // *** merge auth and db user *** //
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** Competitors API *** //

  competitor = uid => this.db.ref(`competitors/${uid}`);

  competitors = () => this.db.ref(`competitors`);

  // *** Anomaly API *** //

  anomaly = aid => this.db.ref(`anomalies/${aid}`);

  anomalies = () => this.db.ref(`anomalies`);

  // *** Competition API *** //

  competition = cid => this.db.ref(`competitions/${cid}`);

  competitions = () => this.db.ref(`competitions/`);

  // *** Team API *** //

  team = tid => this.db.ref(`teams/${tid}`);

  teams = () => this.db.ref(`teams/`);

  // *** Reports API *** //

  report = rid => this.db.ref(`reports/${rid}`);

  reports = () => this.db.ref(`reports/`);
}

export default Firebase;
