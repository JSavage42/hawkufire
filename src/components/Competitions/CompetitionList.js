import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';

class CompetitionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      competitions: null,
      loading: true,
    };
  }

  componentWillMount() {
    const { firebase } = this.props;
    firebase.competitions().on('value', snapshot => {
      const competitionsObject = snapshot.val();
      console.log(competitionsObject);
      if (competitionsObject === null) {
        return;
      } else {
        const competitionsList = Object.keys(competitionsObject).map(key => ({
          ...competitionsObject[key],
          cid: key,
        }));
        this.setState({
          competitions: competitionsList,
        });

        this.setState({ loading: false });
      }
      console.log(this.state);
    });
  }

  render() {
    const { loading, competitions } = this.state;
    return (
      <main id="competition_list">
        <h1>Competitions</h1>
        <Link to={ROUTES.ADD_COMPETITION}>Add Competition</Link>
        {loading && <div>Loading...</div>}
        {competitions && (
          <ul>
            {competitions.map(comp => (
              <Link
                to={`${ROUTES.COMPETITIONS}/edit/${comp.name}`}
                key={comp.name}
              >
                <li>
                  {comp.name} {comp.semester} {comp.year}
                </li>
              </Link>
            ))}
          </ul>
        )}
      </main>
    );
  }
}

export default withFirebase(CompetitionList);
