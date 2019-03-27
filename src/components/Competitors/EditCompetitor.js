import React, { Component } from "react";
import { withFirebase } from "../Firebase";

class EditCompetitor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      competitor: null,
      username: "",
      email: ""
    };
  }

  componentWillMount() {
    const { firebase, match } = this.props;
    firebase.competitor(match.params.uid).on("value", snapshot => {
      /* eslint-disable array-callback-return */
      Object.entries(snapshot.val()).map(([key, value]) => {
        this.setState({ [key]: value });
      });
    });
  }

  onSubmit = e => {
    const { state, props } = this;
    const { firebase } = this.props;
    const { username, email } = state;
    e.preventDefault();
    const uid = `${props.match.params.uid}`;
    firebase.competitor(uid).update({
      username,
      email
    });
    this.props.history.push("/competitors");
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    console.log(this.state);
    const { onSubmit, onChange } = this;
    const { username, email } = this.state;
    return (
      <main id="edit_competitor">
        <h2>Edit Competitor</h2>
        <article>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              onChange={onChange}
              value={username}
              name="username"
              placeholder="Competitor Name"
              required
            />
            <input
              type="text"
              onChange={onChange}
              value={email}
              name="email"
              placeholder="Email Address"
              required
            />
            <input type="submit" value="Save Changes" />
            <input type="reset" value="Reset" />
          </form>
        </article>
      </main>
    );
  }
}

export default withFirebase(EditCompetitor);
