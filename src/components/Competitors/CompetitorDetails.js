import React, { Component } from "react";
import { withFirebase } from "../Firebase";

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

  editComp = () => {
    const { history, match } = this.props;
    history.push(`${match.url}/edit`);
  };

  render() {
    const { competitor } = this.state;
    return (
      <main id="competition_details">
        {competitor && (
          <>
            <h1>{competitor.username}</h1>
            <input
              type="button"
              value="Click here to edit the competitor"
              onClick={this.editComp}
            />
            <p>{competitor.email}</p>
          </>
        )}
      </main>
    );
  }
}

export default withFirebase(CompetitorsDetails);
