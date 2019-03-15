import React, { Component } from "react";
import { withFirebase } from "../Firebase";

class AnomalyDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anomaly: null
    };
    this.editAnomaly = this.editAnomaly.bind(this);
  }

  componentWillMount() {
    const { firebase } = this.props;
    const { tid, cid, aid } = this.props.match.params;
    firebase
      .anomaly(tid, cid, aid)
      .on("value", snapshot => {
        this.setState({ anomaly: snapshot.val() });
      });
  }

  editAnomaly = () => {
    const { history, match } = this.props;
    history.push(`${match.url}/edit`);
  };

  render() {
    const { anomaly } = this.state;
    console.log(this.state);
    return (
      <main id="competition_details">
        <h2>Anomaly Details</h2>
        <article>
          <input
            type="button"
            value="Click here to edit the anomaly"
            onClick={this.editAnomaly}
          />
          {anomaly &&
            Object.entries(anomaly).map(([key, value]) => (
              <p key={key}>
                {key.charAt(0).toUpperCase() + key.substring(1)}: {value}
              </p>
            ))}
        </article>
      </main>
    );
  }
}

export default withFirebase(AnomalyDetails);
