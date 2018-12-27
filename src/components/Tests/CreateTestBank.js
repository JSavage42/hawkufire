import React from 'react';
import '../../styles/components/Tests/CreateTestBank.css';
import { withFirebase } from '../Firebase';

class CreateTestBank extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: JSON.parse(localStorage.getItem('authUser')),
      error: '',
      tid: '',
      totalPoints: '',
      passingScore: '',
      tidPrefix: '',
    };
  }

  componentDidMount() {
    this.fetchUser();
    const tidPrefix = this.state.authUser.uid.substring(0, 4);
    this.setState({ tidPrefix });
  }

  fetchUser = () => {
    this.props.firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user, error: null });
      }
    });
  };

  handleOnSubmit = e => {
    const { tid, tidPrefix, totalPoints, passingScore } = this.state;
    e.preventDefault();

    const testBankMeta = {
      tid: `${tidPrefix}${tid}`,
      totalPoints: totalPoints,
      passingScore: passingScore,
    };

    console.log(testBankMeta);

    this.props.firebase.test(`${tidPrefix}${tid}`).set(testBankMeta);

    this.setState({
      tid: '',
      totalPoints: '',
      passingScore: '',
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <main id="create-test-bank">
        <h2>Create Test Bank</h2>
        <p>
          Instructor Name: {this.state.authUser.username}
          <br />
          Test ID prefix: {this.state.tidPrefix}
        </p>
        <form id="newTestBank" onSubmit={this.handleOnSubmit}>
          <label>Test Bank ID Number</label>
          <input
            type="number"
            value={this.state.testBankId}
            name="tid"
            onChange={this.handleChange}
            placeholder="Test ID"
          />
          <label>Total Points</label>
          <input
            type="number"
            value={this.state.totalPoints}
            name="totalPoints"
            onChange={this.handleChange}
            placeholder="Total Points"
          />
          <label>Passing Score</label>
          <input
            type="number"
            value={this.state.passingScore}
            name="passingScore"
            onChange={this.handleChange}
            placeholder="Passing Score"
          />
          <input type="submit" name="submit" value="Submit" />
          <input type="reset" name="reset" value="Reset" />
        </form>
      </main>
    );
  }
}

export default withFirebase(CreateTestBank);
