/**
 * Component displaying and managing list of disciplines with calculated athlete score.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { disciplineScore, skillScore } from '../../libs/calculate'
import './index.styl'

export default class Predictions extends React.Component {
    constructor() {
        super();

        this.state = {
            sort: "none",
            filter: "none"
        };
        this.sortChange = this.sortChange.bind(this);
        this.filterChange = this.filterChange.bind(this);
    }

    sortChange(e) {
        this.setState({ sort: e.target.value });
    }

    filterChange(e) {
        this.setState({ filter: e.target.value });
    }

    componentWillMount() {
        this.createPredictions();
    }

    createPredictions() {
        let predictionsTable = [...this.props.disciplines];
        predictionsTable.map((discipline) => {
            discipline.score = disciplineScore(this.props.athlete.skillset, discipline.requirements);
            discipline.drilldown = {};
            Object.keys(this.props.athlete.skillset).map((skill) => {
                let score = skillScore(this.props.athlete.skillset[skill], discipline.requirements[skill]);
                discipline.drilldown[skill] = score;
            });
        });
        this.setState({ predictions: predictionsTable });
    }

    disciplineHTML(discipline) {
        return (
            <div key={discipline.name} className="c-discipline">
                <span className="name">
                  {discipline.name}
                </span>
                <span className="score">
                  {disciplineScore(this.props.athlete.skillset, discipline.requirements)}
                </span>
            </div>
        );
    }

    switchFilter(filter) {
        switch(filter){
            case 'none':
                return this.state.predictions.map((discipline) => this.disciplineHTML(discipline));
            case 'individual':
                return this.state.predictions.filter(function(discipline) {
                    return discipline.isIndividual;
                }).map((discipline) => this.disciplineHTML(discipline));
            case 'team':
                return this.state.predictions.filter(function(discipline) {
                    return !discipline.isIndividual;
                }).map((discipline) => this.disciplineHTML(discipline));
        }
    }

    render() {

        if(this.state.sort === "ascend") {
            this.state.predictions.sort(function(first, second) {
                return first.score - second.score;
            });
        }

        if(this.state.sort === "descend") {
            this.state.predictions.sort(function(first, second) {
                return second.score - first.score;
            });
        }

        return (
            <section className="l-section c-predictions" >
                <h2 className="header" >Predictions</h2>
                <label>Sort by:</label>
                <select onChange={this.sortChange} value={this.state.sort}>
                    <option value="none">Don't sort</option>
                    <option value="ascend">Score ascending</option>
                    <option value="descend">Score descending</option>
                </select>
                <label>Filter:</label>
                <select onChange={this.filterChange} value={this.state.filter}>
                    <option value="none">None</option>
                    <option value="individual">Individual sport</option>
                    <option value="team">Team sport</option>
                </select>
                <div className="content">
                    {this.switchFilter(this.state.filter)}
                </div>
            </section>
        );
    }
}

Predictions.propTypes = {
    athlete: PropTypes.shape({
        name: PropTypes.string.isRequired,
        photo: PropTypes.string.isRequired,
        bio: PropTypes.string.isRequired,
        skillset: PropTypes.objectOf(PropTypes.number).isRequired,
        nativeDisciplines: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    disciplines: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        photo: PropTypes.string.isRequired,
        isIndividual: PropTypes.bool.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        requirements: PropTypes.objectOf(PropTypes.number).isRequired,
    })).isRequired
}
