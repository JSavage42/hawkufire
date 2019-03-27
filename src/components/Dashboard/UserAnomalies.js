import React from "react";
import { withFirebase } from "../Firebase";

class UserAnomalies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {}
    };
  }

  componentWillMount() {
    const { firebase } = this.props;
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    console.log(authUser.uid);
    firebase.competitor(authUser.uid).on("value", async snapshot => {
      const userInfo = snapshot.val();
      await this.setState({ userInfo });
    });
  }

  render() {
    const { userInfo } = this.state;
    console.log(userInfo);
    return (
      <article id="dashboard_user-anomalies">
        <h3>Anomalies</h3>
        {userInfo && (
          <React.Fragment>
            <p>{userInfo.email}</p> <p>{userInfo.username}</p>
          </React.Fragment>
        )}
      </article>
    );
  }
}

export default withFirebase(UserAnomalies);
