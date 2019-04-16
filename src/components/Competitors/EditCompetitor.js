import React, { Component } from "react";
import { withFirebase } from "../Firebase";

class EditCompetitor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: null,
      competitor: null,
      username: "",
      email: "",
      roles: {}
    };
  }

  componentWillMount() {
    const { firebase, match } = this.props;
    firebase.competitor(match.params.uid).on("value", snapshot => {
      /* eslint-disable array-callback-return */
      Object.entries(snapshot.val()).map(([key, value]) => {
        if (key === "roles") {
          Object.values([value]).forEach(value => {
            Object.entries(value).map(([key, value]) => {
              this.setState({ [key]: value });
            });
          });
        }
        this.setState({
          [key]: value,
          uid: match.params.uid
        });
      });
    });
  }

  componentWillUnmount() {
    const { match, firebase } = this.props;
    firebase.competitor(match.params.id).off();
  }

  onSubmit = e => {
    const { state, props } = this;
    const { firebase } = this.props;
    const { username, email, roles, uid } = state;
    e.preventDefault();
    firebase.competitor(uid).update({
      username,
      email,
      roles
    });
    props.history.push("/competitors");
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { onSubmit, onChange } = this;
    const { username, email } = this.state;
    return (
      <main id="edit_competitor">
        <h2>Edit Competitor</h2>
        <article className="edit">
          <form onSubmit={onSubmit} className="editForm">
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
