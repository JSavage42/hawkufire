import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import '../../styles/components/EditAnomaly.css';

class EditAnomaly extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anomaly: null,
      title: '',
      team: '',
      competition: '',
      assignedTo: '',
      description: '',
      dueBy: '',
    };
  }

  componentDidMount() {
    const { firebase } = this.props;
    const { tid, cid, aid } = this.props.match.params;
    firebase.anomaly(tid, cid, aid).on('value', async snapshot => {
      /* eslint-disable array-callback-return */
      await Object.entries(snapshot.val()).map(([key, value]) => {
        this.setState({ [key]: value });
      });
    });
  }

  onSubmit = e => {
    const { state, props } = this;
    const { firebase } = props;
    const { team, competition, title } = state;
    e.preventDefault();
    firebase.anomaly(team, competition, title).set(state);

    this.setState({
      anomaly: null,
      title: '',
      team: '',
      competition: '',
      assignedTo: '',
      description: '',
      dueBy: '',
    });

    this.props.history.push('/anomaly');
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { onSubmit, onChange } = this;
    const { title, team, competition, assignedTo, description, dueBy } = this.state;
    return (
      <main id="edit_anomaly">
        <h2>Edit Anomaly</h2>
        <article className="edit">
          <form onSubmit={onSubmit} className="editForm">
            <input type="text" onChange={onChange} value={title} name="title" placeholder="Give the Anomaly A Title" />
            <input type="text" onChange={onChange} value={team} name="team" placeholder="Team Name" />
            <input
              type="text"
              onChange={onChange}
              value={competition}
              name="competition"
              placeholder="Competition ID"
            />
            <input
              type="text"
              onChange={onChange}
              value={assignedTo}
              name="assignedTo"
              placeholder="Member Assigned To"
            />
            <textarea onChange={onChange} value={description} name="description" placeholder="Description" />
            <input type="time" onChange={onChange} value={dueBy} name="dueBy" />
            <input type="submit" value="Save Anomaly" />
            <input type="reset" value="Reset" />
          </form>
        </article>
      </main>
    );
  }
}

export default withFirebase(EditAnomaly);
