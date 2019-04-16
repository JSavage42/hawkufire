import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { Link } from 'react-router-dom';

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
    firebase.team(match.params.tid).on("value", async snapshot => {
      await this.setState({ team: snapshot.val() });
      let members = [];
      await Object.entries(this.state.team).map(([key, value]) => {
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
    return (
      <main id="team_details">
        {team && (
          <React.Fragment>
            <h2>{team.name}</h2>
            <Link to={`${this.props.match.url}/edit`} className="btn">
              Edit the Team
            </Link>
            <h3>Team Captain</h3>
              <p>{team.captain}</p>
            <h3>Team Members</h3>
            {this.state.members.length > 0 &&
              this.state.members.map(member => (
                <p className={member} key={member}>{member}</p>
              ))}
          </React.Fragment>
        )}
      </main>
    );
  }
}

export default withFirebase(TeamDetails);
