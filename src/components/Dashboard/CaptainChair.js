import React from "react";
import { Link } from "react-router-dom";
import { withFirebase } from "../Firebase";
import "../../styles/components/CaptainsChair.css";

class CaptainChair extends React.Component {
  state = {
    anomalies: [],
    loadingAnomalies: true
  };

  componentWillMount() {
    const { firebase } = this.props;
    this.setState({ loadingAnmonals: true });
    firebase
      .anomalies()
      .child("Team Awesome")
      .child("ARGONNEFall2018")
      .on("value", snapshot => {
        const anomaliesObject = snapshot.val();
        console.log(anomaliesObject);
        if (anomaliesObject !== null) {
          Object.entries(anomaliesObject).forEach(([key, value]) =>
            this.state.anomalies.push({ [key]: value })
          );
          this.setState({ loadingAnomalies: false });
        }
      });
  }

  render() {
    const { loadingAnomalies, anomalies } = this.state;
    return (
      <section id="captains-chair">
        <h3>Captain's Chair</h3>
        <h4>Anomalies</h4>
        {loadingAnomalies && <div>Loading Anomalies...</div>}
        {anomalies.length > 0 &&
          Object.values(
            anomalies.map(anomalies =>
              Object.values(anomalies).map(anomaly => {
                if (anomaly.completed) {
                  return (
                    <article key={`${anomaly.title}${anomaly.dueBy}`}>
                      <Link
                        to={`/anomaly/${anomaly.team}/${anomaly.competition}/${
                          anomaly.title
                        }`}
                        className="completed-anomaly"
                      >
                        {anomaly.title} -- {anomaly.assignedTo} ---{" "}
                        {anomaly.completed}
                      </Link>{" "}
                      <br />
                    </article>
                  );
                }
                return (
                  <article key={`${anomaly.title}${anomaly.dueBy}`}>
                    <Link
                      to={`/anomaly/${anomaly.team}/${anomaly.competition}/${
                        anomaly.title
                      }`}
                      className="not-completed"
                    >
                      {anomaly.title} -- {anomaly.assignedTo} --- Not Completed
                    </Link>
                    <br />
                  </article>
                );
              })
            )
          )}
      </section>
    );
  }
}

export default withFirebase(CaptainChair);
