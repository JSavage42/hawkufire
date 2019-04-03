import React from 'react';
import { withFirebase } from '../Firebase';

class CaptainChair extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    const { firebase } = this.props;

    firebase.team('Team Awesome').on('value', snapshot => {
      console.log(snapshot.val());
    }
    )
  }

  render() {
    return (
      <section id="captains-chair">
        <h3>Captain's Chair</h3>
        <h4>Anomalies</h4>
        <h4>Issues</h4>
        <h5>Pending Issues</h5>
        <h5>In-progress Issues</h5>
        <h5>Completed Issues</h5>
      </section>
    );
  }
};

export default withFirebase(CaptainChair);