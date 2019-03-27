import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";

class CompetitorList extends Component {
  state = {
    competitors: null,
    loading: true
  };

  componentWillMount() {
    const { firebase } = this.props;
    this.setState({ loading: true });
    firebase.competitors().on("value", snapshot => {
      const competitorsObject = snapshot.val();
      if (competitorsObject === null) {
        return;
      } else {
        const competitorsList = Object.keys(competitorsObject).map(key => ({
          ...competitorsObject[key],
          uid: key
        }));

        this.setState({
          competitors: competitorsList
        });

        this.setState({ loading: false });
      }
    });
  }

  render() {
    const { competitors, loading } = this.state;
    return (
      <main id="competitor_list">
        <h2>Competitors</h2>
        {loading && <div>Loading...</div>}
        <article>
          {competitors &&
            competitors.map(competitor => (
              <Link
                to={`${ROUTES.COMPETITORS}/${competitor.uid}`}
                key={competitor.uid}
              >
                <p>{competitor.username}</p>
              </Link>
            ))}
        </article>
      </main>
    );
  }
}

export default withFirebase(CompetitorList);
