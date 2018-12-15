import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

class TestList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tests: [],
      authUser: JSON.parse(localStorage.getItem("authUser")),
      loading: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.tests(this.state.authUser.uid).on("value", snapshot => {
      const testsObject = snapshot.val();

      const testsList = Object.keys(testsObject).map(key => ({
        ...testsObject[key],
        uid: key
      }));

      this.setState({
        tests: testsList,
        loading: false
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.tests().off();
  }

  render() {
    const { tests, loading } = this.state;
    console.log(tests);
    return (
      <div>
        <h2>Available Tests</h2>
        {loading && <div>Loading ...</div>}
        <ul>
          {tests.map(test => (
            <li key={test.tid}>
              <strong>Take Test ID Number: </strong>
              <Link
                to={{
                  pathname: `${ROUTES.TESTS}/${test.tid}`,
                  state: { test }
                }}
              >
                {test.tid}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withFirebase(TestList);