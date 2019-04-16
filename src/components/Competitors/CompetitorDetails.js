import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { Link } from "react-router-dom";

class CompetitorsDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      competitor: null
    };
  }

  componentWillMount() {
    const { firebase, match } = this.props;
    firebase.competitor(match.params.uid).on("value", snapshot => {
      this.setState({ competitor: snapshot.val() });
    });
  }

  render() {
    const { competitor } = this.state;
    return (
      <main id="competition_details">
        {competitor && (
          <article>
            <h2>{competitor.username}</h2>
            <Link to={`${this.props.match.url}/edit`} className="btn">
              Edit the Competitor
            </Link>
            <h3>Email</h3>
            <p>
              <a href={`mailto:${competitor.email}`}>{competitor.email}</a>
            </p>
            <aside>
              <h3>Roles</h3>
              {Object.entries(competitor.roles).map(([key, value]) =>
                value === true ? <p key={key}>{key}</p> : null
              )}
            </aside>
          </article>
        )}
      </main>
    );
  }
}

export default withFirebase(CompetitorsDetails);
