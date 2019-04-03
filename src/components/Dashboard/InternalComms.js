import React from 'react';
import { withFirebase } from '../Firebase';

class InternalComms extends React.Component {
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
      <section id="internal-comms">
        <h3>Internal Comms</h3>
        <p>Internal Chat will be here.</p>
      </section>
    );
  }
};

export default withFirebase(InternalComms);