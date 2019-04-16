import React, { Component } from "react";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";
import { withFirebase } from "../Firebase";

class AnomalyList extends Component {
  state = {
    anomalies: [],
    loading: true
  };

  componentWillMount() {
    const { firebase } = this.props;
    this.setState({ loading: true });
    firebase.anomalies().child('Team Awesome').child('ARGONNEFall2018').on("value", snapshot => {
      const anomaliesObject = snapshot.val();
      console.log(anomaliesObject)
      if (anomaliesObject !== null) {
          Object.entries(anomaliesObject).forEach(([key, value]) =>
            this.state.anomalies.push({ [key]: value })
          );
        this.setState({ loading: false });
      }
    });
  }

  render() {
    const { anomalies, loading } = this.state;
    console.log(anomalies);
    return (
      <main id="anomaly_list">
        <h2>Anomalies</h2>
        <Link to={ROUTES.ADD_ANOMALY} className="btn">
          Add an Anomaly
        </Link>
        {loading && <div>Loading...</div>}
        {
          <article id="anomalies">
            {Object.values(
              anomalies.map(anomalies =>
                Object.values(anomalies).map(anomaly => (
                  <Link
                    to={`/anomaly/${anomaly.team}/${anomaly.competition}/${
                      anomaly.title
                    }`}
                    key={`${anomaly.title}${anomaly.dueBy}`}
                  >
                    <p>
                      {anomaly.title} -- {anomaly.team} - {anomaly.assignedTo}
                    </p>
                  </Link>
                ))
              )
            )}
          </article>
        }
      </main>
    );
  }
}

export default withFirebase(AnomalyList);
