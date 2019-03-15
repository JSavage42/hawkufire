import React, { Component } from "react";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";
import { withFirebase } from "../Firebase";

class TeamList extends Component {
  state = {
    teams: null,
    loading: true
  };

  componentWillMount() {
    const { firebase } = this.props;
    this.setState({ loading: true });
    firebase.teams().on("value", snapshot => {
      const teamsObject = snapshot.val();
      console.log(teamsObject);
      if (teamsObject === null) {
        return;
      } else {
        const teamsList = Object.keys(teamsObject).map(key => ({
          ...teamsObject[key],
          uid: key
        }));

        this.setState({
          teams: teamsList
        });

        this.setState({ loading: false });
      }
    });
  }

  render() {
    const { teams, loading } = this.state;
    return (
      <main id="team_list">
        <h2>Teams</h2>
        <Link to={ROUTES.ADD_TEAM}>Add Team</Link>
        {loading && <div>Loading...</div>}
        {teams && (
          <ul>
            {teams.map(team => (
              <Link to={`${ROUTES.TEAMS}/${team.name}`} key={team.name}>
                <li>{team.name}</li>
              </Link>
            ))}
          </ul>
        )}
      </main>
    );
  }
}

export default withFirebase(TeamList);
