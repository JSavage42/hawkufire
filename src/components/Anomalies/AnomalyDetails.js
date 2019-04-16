import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { Link } from "react-router-dom";
import "../../styles/components/AnomalyDetails.css";
class AnomalyDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anomaly: null
    };
    this.markCompleted = this.markCompleted.bind(this);
  }

  componentWillMount() {
    const { firebase } = this.props;
    const { tid, cid, aid } = this.props.match.params;
    firebase.anomaly(tid, cid, aid).on("value", snapshot => {
      this.setState({ anomaly: snapshot.val() });
    });
  }

  componentWillUnmount() {
    const { tid, cid, aid } = this.props.match.params;
    const { firebase } = this.props;
    firebase.anomaly(tid, cid, aid).off();
  }

  markCompleted = () => {
    const { firebase } = this.props;
    const { tid, cid, aid } = this.props.match.params;
    const completedTime = new Date();
    console.log(completedTime);
    firebase.anomaly(tid, cid, aid).update({ [`completed`]: completedTime });
  };

  render() {
    const { anomaly } = this.state;
    return (
      <main id="anomaly_details">
        <h2>Anomaly Details</h2>
        <article>
          <Link to={`${this.props.match.url}/edit`} className="btn">
            Edit the Anomaly
          </Link>
          <input
            onClick={this.markCompleted}
            className="btn"
            type="button"
            value="Mark As Completed"
          />
          {anomaly &&
            Object.entries(anomaly).map(([key, value]) => (
              <div key={key} className={key}>
                <h3>{key.charAt(0).toUpperCase() + key.substring(1)}</h3>
                <p className={value}>{value}</p>
              </div>
            ))}
        </article>
      </main>
    );
  }
}

export default withFirebase(AnomalyDetails);
