import React, { Component } from "react";
import { withFirebase } from "../Firebase";

class CompetitionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      competition: null
    };
    this.editComp = this.editComp.bind(this);
  }

  componentWillMount() {
    const { firebase } = this.props;
    firebase
      .competition(
        this.props.match.params.semesteryear,
        this.props.match.params.name
      )
      .on("value", snapshot => {
        this.setState({
          competition: snapshot.val()
        });
      });
  }

  editComp = () => {
    const { history, match } = this.props;
    history.push(`${match.url}/edit`);
  };

  render() {
    const { competition } = this.state;
    return (
      <main id="competition_details">
        <h1>Competition Details</h1>
        <article>
          <input
            type="button"
            value="Click here to edit the competition"
            onClick={this.editComp}
          />
          {competition &&
            Object.entries(competition).map(([key, value]) => (
              <p key={key}>
                {key.charAt(0).toUpperCase() + key.substring(1)}: {value}
              </p>
            ))}
        </article>
      </main>
    );
  }
}

export default withFirebase(CompetitionDetails);
