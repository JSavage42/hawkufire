import React, { Component } from "react";
import { withFirebase } from "../Firebase";

class EditTeam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      school: "",
      name: "",
      captain: "",
      mem1: "",
      mem2: "",
      mem3: "",
      mem4: "",
      mem5: "",
      mem6: "",
      mem7: "",
      mem8: "",
      members: ""
    };
  }

  componentDidMount() {
    const { firebase } = this.props;
    firebase
      .team(this.props.match.params.tid).on("value", async snapshot => {
        /* eslint-disable array-callback-return */
        await Object.entries(snapshot.val()).map(([key, value]) => {
          this.setState({ [key]: value });
        });
      });
  }

  onSubmit = e => {
    const { state, props } = this;
    const { firebase } = props;
    const { name } = state;
    e.preventDefault();
    const tid = `${name}`;
    console.log(state);
    firebase.competition(tid).set(state);

    this.setState({
      school: "",
      name: "",
      captain: "",
      mem1: "",
      mem2: "",
      mem3: "",
      mem4: "",
      mem5: "",
      mem6: "",
      mem7: "",
      mem8: "",
      members: ""
    });

    this.props.history.push("/team");
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { onSubmit, onChange } = this;
    const { name, school, captain, mem1, mem2, mem3, mem4, mem5, mem6, mem7, mem8 } = this.state;
    return (
      <main id="edit_team">
        <h1>Edit Team</h1>
        <article>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              onChange={onChange}
              value={school}
              name="school"
              placeholder="School Name"
            />
            <input
              type="text"
              onChange={onChange}
              value={name}
              name="name"
              placeholder="Team Name"
            />
            <input
              type="text"
              onChange={onChange}
              value={captain}
              name="captain"
              placeholder="Team Captain"
            />
            <input
              type="text"
              onChange={onChange}
              value={mem1}
              name="mem1"
              placeholder="Competitor 1"
            />
            <input
              type="text"
              onChange={onChange}
              value={mem2}
              name="mem2"
              placeholder="Competitor 2"
            />
            <input
              type="text"
              onChange={onChange}
              value={mem3}
              name="mem3"
              placeholder="Competitor 3"
            />
            <input
              type="text"
              onChange={onChange}
              value={mem4}
              name="mem4"
              placeholder="Competitor 4"
            />
            <input
              type="text"
              onChange={onChange}
              value={mem5}
              name="mem5"
              placeholder="Competitor 5"
            />
            <input
              type="text"
              onChange={onChange}
              value={mem6}
              name="mem6"
              placeholder="Competitor 6"
            />
            <input
              type="text"
              onChange={onChange}
              value={mem7}
              name="mem7"
              placeholder="Competitor 7"
            />
            <input
              type="text"
              onChange={onChange}
              value={mem8}
              name="mem8"
              placeholder="Competitor 8"
            />
            <input type="submit" value="Save" />
            <input type="reset" value="Reset" />
          </form>
        </article>
      </main>
    );
  }
}

export default withFirebase(EditTeam);
