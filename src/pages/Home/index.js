/**
 * Component responsible for Home page layout.
 */

import React from 'react'
import PropTypes from 'prop-types'
import Profile from '../../components/Profile'
import Overview from '../../components/Overview'
import Predictions from '../../components/Predictions'
import Hints from '../../components/Hints'
import SwitchAthleteButtons from './SwitchAthleteButtons'

import './index.styl'

export default class Home extends React.Component {
    constructor() {
        super();

        this.state = { currAthlete: 0 };
        this.nextAthlete = this.nextAthlete.bind(this);
        this.prevAthlete = this.prevAthlete.bind(this);
    }

    nextAthlete() {
        this.setState({
            currAthlete: this.state.currAthlete + 1
        });
    }
    prevAthlete() {
        this.setState({
            currAthlete: this.state.currAthlete - 1
        });
    }

    render() {
        const athlete = this.props.athletes ? this.props.athletes[this.state.currAthlete] : null
        const disciplines = this.props.disciplines ? this.props.disciplines : []
        if (athlete){
            return (
                  <div className="p-home">
                      <SwitchAthleteButtons
                        currAthlete={this.state.currAthlete}
                        maxAthleteNum={this.props.athletes.length}
                        nextAthlete={this.nextAthlete}
                        prevAthlete={this.prevAthlete}
                      />
                      <Profile {...athlete} />
                      <Overview {...athlete} />
                      <Predictions athlete={athlete} disciplines={disciplines} />
                      <Hints athlete={athlete} disciplines={disciplines} />
                  </div>
            );
        } else {
            return (
              <span>No athlete data</span>
            );
        }
    }
}

Home.propTypes = {
    athletes: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        photo: PropTypes.string.isRequired,
        bio: PropTypes.string.isRequired,
        skillset: PropTypes.objectOf(PropTypes.number).isRequired,
        nativeDisciplines: PropTypes.arrayOf(PropTypes.string).isRequired,
    })).isRequired,
    disciplines: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        photo: PropTypes.string.isRequired,
        isIndividual: PropTypes.bool.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        requirements: PropTypes.objectOf(PropTypes.number).isRequired,
    })).isRequired
}
