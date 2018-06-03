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
import Tabs from './Tabs'

import './index.styl'

export default class Home extends React.Component {
    constructor() {
        super();

        this.state = {
          currAthlete: 0,
          currTab: "Overview"
        };
        this.nextAthlete = this.nextAthlete.bind(this);
        this.prevAthlete = this.prevAthlete.bind(this);
        this.switchTab = this.switchTab.bind(this);
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

    switchTab(nextTab) {
        this.setState({
            currTab: nextTab
        });
    }

    renderSwitch(currTab, athlete) {
        const disciplines = this.props.disciplines ? this.props.disciplines : []
        switch(currTab){
            case 'Overview':
                return <Overview {...athlete} />
            case 'Predictions':
                return <Predictions athlete={athlete} disciplines={disciplines} />
            case 'Hints':
                return <Hints athlete={athlete} disciplines={disciplines} />
        }
    }

    render() {
        const athlete = this.props.athletes ? this.props.athletes[this.state.currAthlete] : null
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
                      <Tabs
                        currTab={this.state.currTab}
                        switchTab={this.switchTab}
                      />
                      {this.renderSwitch(this.state.currTab, athlete)}
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
