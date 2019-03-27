import React, { Component } from "react";
import { withFirebase } from "../Firebase";

class AddAnomaly extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      team: "",
      competition: "",
      assignedTo: "",
      description: "",
      dueBy: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    const { state, props } = this;
    const { firebase } = props;
    const { title, team, competition } = state;
    this.setState({ aid: `${title}${team}${competition}` });
    e.preventDefault();
    firebase.anomaly(team, competition, title).set(state);
    this.setState({
      title: "",
      team: "",
      competition: "",
      assignedTo: "",
      description: "",
      dueBy: ""
    });
    this.props.history.push("/anomaly");
  };

  render() {
    const {
      title,
      team,
      competition,
      assignedTo,
      description,
      dueBy
    } = this.state;
    const { onSubmit, onChange } = this;
    return (
      <main id="add_anomaly">
        <h2>Add an Anomaly</h2>
        <article>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              onChange={onChange}
              value={title}
              name="title"
              placeholder="Give the Anomaly A Title"
            />
            <input
              type="text"
              onChange={onChange}
              value={team}
              name="team"
              placeholder="Team Name"
            />
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
            <textarea
              onChange={onChange}
              value={description}
              name="description"
              placeholder="Description"
            />
            <input type="time" onChange={onChange} value={dueBy} name="dueBy" />
            <input type="submit" value="Add Anomaly" />
            <input type="reset" value="Reset" />
          </form>
        </article>
      </main>
    );
  }
}

export default withFirebase(AddAnomaly);
