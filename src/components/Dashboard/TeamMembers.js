import React from "react";
import { withFirebase } from "../Firebase";

class TeamMembers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      team: null,
      members: [],
      loadingTeam: true
    };
  }

  componentWillMount() {
    const { firebase } = this.props;
    firebase.team("Team Awesome").on("value", async snapshot => {
      this.setState({ loadingTeam: true });
      await this.setState({ team: snapshot.val() });
      let members = [];
      await Object.entries(this.state.team).map(([key, value]) => {
        if (key.match(/mem\d/)) {
          if (value.length > 0) {
            members.push(value);
          }
        }
        this.setState({ members, loadingTeam: false });
        return members;
      });
    });
  }

  render() {
    const { team, loadingTeam } = this.state;
    return (
      <section id="dashboard_team-members">
        {loadingTeam && <h2>Team</h2>}
        {team && (
          <React.Fragment>
            <h2>Captain</h2>
            <p>{team.captain}</p>
            <h2>Members</h2>
            {this.state.members.length > 0 &&
              this.state.members.map(member => (
                <p className={member} key={member}>
                  {member}
                </p>
              ))}
          </React.Fragment>
        )}
      </section>
    );
  }
}

export default withFirebase(TeamMembers);
