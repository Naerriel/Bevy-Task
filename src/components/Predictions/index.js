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
            filter: "none",
            collapsedDiscipline: "none"
        };
        this.sortChange = this.sortChange.bind(this);
        this.filterChange = this.filterChange.bind(this);
        this.collapseDiscipline = this.collapseDiscipline.bind(this);
        this.renderDiscipline = this.renderDiscipline.bind(this);
    }

    componentWillMount() {
        this.createPredictions(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createPredictions(nextProps);
    }

    sortChange(e) {
        this.setState({ sort: e.target.value });
    }

    filterChange(e) {
        this.setState({ filter: e.target.value });
    }

    collapseDiscipline(e) {
        if(this.state.collapsedDiscipline === e.target.id){
            this.setState({ collapsedDiscipline: "none" });
        } else {
            this.setState({ collapsedDiscipline: e.target.id });
        }
    }

    createPredictions(props) {
        let predictions = [...props.disciplines];
        predictions.map((discipline) => {
            discipline.score = disciplineScore(props.athlete.skillset, discipline.requirements);
            discipline.drilldown = {};
            Object.keys(props.athlete.skillset).map((skill) => {
                let score = skillScore(props.athlete.skillset[skill], discipline.requirements[skill]);
                discipline.drilldown[skill] = score;
            });
        });
        this.setState({ predictions });
    }

    checkForSorting() {
        switch(this.state.sort) {
            case 'alphabetical':
                this.state.predictions.sort(function(first, second) {
                    return first.name.localeCompare(second.name);
                });
                break;
            case 'anti-alphabetical':
                this.state.predictions.sort(function(first, second) {
                    return second.name.localeCompare(first.name);
                });
                break;
            case 'ascend':
                this.state.predictions.sort(function(first, second) {
                    return first.score - second.score;
                });
                break;
            case 'descend':
                this.state.predictions.sort(function(first, second) {
                    return second.score - first.score;
                });
                break;
        }
    }

    renderFlag(isIndividual) {
        if(isIndividual){
            return "Individual";
        } else {
            return "Team";
        }
    }

    renderScoreDrillDown(discipline) {
        return(
            <div className="scoreDrillDown">
                <p className="drillDownTitle">Score by skills:</p>
                <span className="drillDownSkill">
                    basic:
                    <span className="drillDownScore">50</span>
                </span>
                <div className="drillDownSkills">
                {Object.keys(discipline.drilldown).map((skill) => {
                    return (
                        <span className="drillDownSkill" key={`drill${skill}`}>
                            {skill}:
                            <span className="drillDownScore" key={`drillScore${skill}`}>
                                {discipline.drilldown[skill]}
                            </span>
                        </span>
                    );
                })}
                </div>
            </div>
        );
    }

    renderDiscipline(discipline) {
        if(discipline.name === this.state.collapsedDiscipline){
            return (
                <div
                    key={discipline.name}
                    id={discipline.name}
                    className="c-discipline collapsed"
                    onClick={this.collapseDiscipline}
                >
                    <img src={discipline.photo} />
                    <span className="name">
                        {discipline.name}
                    </span>
                    <span className="score">
                        Score: {discipline.score}
                    </span>
                    <span className="isIndividual">
                        {this.renderFlag(discipline.isIndividual)}
                    </span>
                    <span className="tags">
                        {discipline.tags.map((tag) => {
                            return <p
                              className="tag"
                              key={`tag${discipline.name}${tag}`}
                            >
                              #{tag}
                            </p>;
                        })}
                    </span>
                    {this.renderScoreDrillDown(discipline)}
                </div>
            );
        } else {
            return (
                <div
                    key={discipline.name}
                    id={discipline.name}
                    className="c-discipline"
                    onClick={this.collapseDiscipline}
                >
                    <img src={discipline.photo} />
                    <span className="name">
                        {discipline.name}
                    </span>
                    <span className="score">
                        Score: {discipline.score}
                    </span>
                    <span className="isIndividual">
                        {this.renderFlag(discipline.isIndividual)}
                    </span>
                </div>
            );
        }
    }

    switchFilter(filter) {
        switch(filter){
            case 'none':
                return this.state.predictions.map((discipline) => this.renderDiscipline(discipline));
            case 'individual':
                return this.state.predictions.filter(function(discipline) {
                    return discipline.isIndividual;
                }).map((discipline) => this.renderDiscipline(discipline));
            case 'team':
                return this.state.predictions.filter(function(discipline) {
                    return !discipline.isIndividual;
                }).map((discipline) => this.renderDiscipline(discipline));
        }
    }

    render() {
        this.checkForSorting();

        return (
            <section className="l-section c-predictions" >
                <h2 className="header" >Predictions</h2>
                <label>Sort by:</label>
                <select onChange={this.sortChange} value={this.state.sort}>
                    <option value="none">Don't sort</option>
                    <option value="alphabetical">Alphabetical</option>
                    <option value="anti-alphabetical">Anti-alphabetical</option>
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
