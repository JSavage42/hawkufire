import React, { Component } from "react";

// *** Third-Party *** //
import { compose } from "recompose";

// *** Styles *** //
import "../../styles/components/Home.css";

// *** HOC and Context *** //
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";

import dunDun from '../../audio/dundun.mp3';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null
    };

    this.dunDun = this.dunDun.bind(this);
  }

  componentDidMount() {
    const { firebase } = this.props;
    firebase.competitors().on("value", snapshot => {
      this.setState({
        users: snapshot.val()
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.competitors().off();
  }

  dunDun = () => {
    console.log('DUN DUN')
    const audio = new Audio(dunDun);
    audio.play();
  };

  render() {
    return (
      <main id="home">
        <p>
          <span id="title" onClick={this.dunDun}>
            HAW<span id="ku">KU</span>
          </span>
        </p>
      </main>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withAuthorization(condition)
)(HomePage);
