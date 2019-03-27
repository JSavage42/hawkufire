import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';
import '../../styles/components/AnomalyDetails.css';
class AnomalyDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anomaly: null,
    };
    this.editAnomaly = this.editAnomaly.bind(this);
  }

  componentWillMount() {
    const { firebase } = this.props;
    const { tid, cid, aid } = this.props.match.params;
    firebase.anomaly(tid, cid, aid).on('value', snapshot => {
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
      <main id="anomaly_details">
        <h2>Anomaly Details</h2>
        <article>
          <Link to={`${this.props.match.url}/edit`} className="btn">
            Edit the Anomaly
          </Link>
          {anomaly &&
            Object.entries(anomaly).map(([key, value]) => (
              <p key={key} className={key}>
                <h3>{key.charAt(0).toUpperCase() + key.substring(1)}</h3>
                <p className={value}>{value}</p>
              </p>
            ))}
        </article>
      </main>
    );
  }
}

export default withFirebase(AnomalyDetails);
