import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';

class CompetitionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      competitions: [],
      loading: true,
    };
  }

  componentWillMount() {
    const { firebase } = this.props;

    firebase.competitions().on('value', snapshot => {
      const competitionsObject = snapshot.val();
      if (competitionsObject !== null) {
        Object.values(competitionsObject).forEach(value => {
          Object.entries(value).forEach(([key, value]) =>
            this.state.competitions.push({ [key]: value }),
          );
        });
        this.setState({ loading: false });
      }
    });
  }

  render() {
    const { loading, competitions } = this.state;
    return (
      <main id="competition_list">
        <h1>Competitions</h1>
        <Link to={ROUTES.ADD_COMPETITION} className="btn">
          Add Competition
        </Link>
        {loading && <div className="loading">Loading...</div>}
        {
          <article id="competitions">
            {Object.values(
              competitions.map(competition =>
                Object.values(competition).map(comp => (
                  <React.Fragment
                    key={`${comp.name}${comp.semester}${comp.year}`}
                  >
                    <p>
                      <Link
                        to={`/competition/${comp.semester}${comp.year}/${
                          comp.name
                        }`}
                      >
                        {comp.semester}
                        {comp.year} - {comp.name}
                      </Link>
                    </p>
                  </React.Fragment>
                )),
              ),
            )}
          </article>
        }
      </main>
    );
  }
}

export default withFirebase(CompetitionList);
