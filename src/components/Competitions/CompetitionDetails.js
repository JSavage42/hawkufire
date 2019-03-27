import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';

class CompetitionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      competition: null,
    };
    this.editComp = this.editComp.bind(this);
  }

  componentWillMount() {
    const { firebase } = this.props;
    firebase.competition(this.props.match.params.semesteryear, this.props.match.params.name).on('value', snapshot => {
      this.setState({
        competition: snapshot.val(),
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
        <h2>Competition Details</h2>
        <article>
          <Link to={`${this.props.match.url}/edit`} className="btn">
            Edit the Competition
          </Link>
          {competition &&
            Object.entries(competition).map(([key, value]) => (
              <p key={key} className={key}>
                <h3>{key.charAt(0).toUpperCase() + key.substring(1)}</h3>
                <p className={value}>{value}</p>
              </p>
            ))}
        </article>
      </main>
    );
  }
}

export default withFirebase(CompetitionDetails);
