import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

class AddCompetition extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      city: '',
      state: '',
      numOfCompetitors: 0,
      year: 0,
      semester: '',
      cid: '',
    };
  }

  onSubmit = e => {
    const { state, props } = this;
    const { firebase } = props;
    const { name, year, semester, cid } = state;
    this.setState({ cid: `${name}${semester}${year}` });
    e.preventDefault();
    firebase
      .competition(cid)
      .child(`${semester}${year}`)
      .child(`${name}`)
      .set(state);

    this.setState({
      name: '',
      city: '',
      state: '',
      numOfCompetitors: 0,
      year: 0,
      semester: '',
      cid: '',
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { onSubmit, onChange } = this;
    const { name, city, state, numOfCompetitors, year } = this.state;
    return (
      <main id="add_competition">
        <h1>Add Competition</h1>
        <article>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              onChange={onChange}
              value={name}
              name="name"
              placeholder="Competition Name"
              required
            />
            <input
              type="text"
              onChange={onChange}
              value={city}
              name="city"
              placeholder="City"
              required
            />
            <input
              type="text"
              onChange={onChange}
              value={state}
              name="state"
              placeholder="State"
              required
            />
            <input
              type="number"
              onChange={onChange}
              value={numOfCompetitors}
              name="numOfCompetitors"
              placeholder="Number of Competitors"
              required
            />
            <select name="semester" onChange={onChange} required>
              <option value="Spring">Spring</option>
              <option value="Fall">Fall</option>
            </select>
            <input
              type="number"
              onChange={onChange}
              value={year}
              name="year"
              placeholder="Year"
              required
            />
            <input type="submit" value="Add Competition" />
            <input type="reset" value="Reset" />
          </form>
        </article>
      </main>
    );
  }
}

export default withFirebase(AddCompetition);
