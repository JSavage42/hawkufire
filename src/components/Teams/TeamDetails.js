import React, { Component } from "react";
import { withFirebase } from "../Firebase";

class TeamDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team: null,
      members: []
    };
  }

  componentWillMount() {
    const { firebase, match } = this.props;
    firebase.team(match.params.tid).on("value", snapshot => {
      this.setState({ team: snapshot.val() });
      let members = [];
      Object.entries(this.state.team).map(([key, value]) => {
        if (key.match(/mem\d/)) {
          if (value.length > 0) {
            members.push(value);
          }
        }
        this.setState({ members });
        return members;
      });
    });
  }

  editTeam = () => {
    const { history, match } = this.props;
    history.push(`${match.url}/edit`);
  };

  render() {
    const { team } = this.state;
    console.log(this.state);
    return (
      <main id="team_details">
        {team && (
          <>
            <h1>{team.name}</h1>
            <input
              type="button"
              value="Click here to edit the competitor"
              onClick={this.editTeam}
            />
            <h2>Team Captain</h2>
            <p>{team.captain}</p>
            <h2>Team Members</h2>
            {this.state.members.length > 0 &&
              this.state.members.map(member => <p key={member}>{member}</p>)}
          </>
        )}
      </main>
    );
  }
}

export default withFirebase(TeamDetails);
