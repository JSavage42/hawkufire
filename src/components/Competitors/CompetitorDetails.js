import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { Link } from 'react-router-dom';

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
            <p>{competitor.email}</p>
          </article>
        )}
      </main>
    );
  }
}

export default withFirebase(CompetitorsDetails);
