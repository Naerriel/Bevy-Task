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
        this.handleSortChange = this.handleSortChange.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleCollapsing = this.handleCollapsing.bind(this);
        this.renderDiscipline = this.renderDiscipline.bind(this);
    }

    componentWillMount() {
        this.createPredictions(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createPredictions(nextProps);
    }

    handleSortChange(e) {
        this.setState({ sort: e.target.value });
    }

    handleFilterChange(e) {
        this.setState({ filter: e.target.value });
    }

    handleCollapsing(e) {
        let discipline = e.target.id.replace("body", "");
        if(this.state.collapsedDiscipline === discipline){
            this.setState({ collapsedDiscipline: "none" });
        } else {
            this.setState({ collapsedDiscipline: discipline });
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

    sortPredictions() {
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
                    if(first.score === second.score) {
                        return first.name.localeCompare(second.name);
                    }
                    return first.score - second.score;
                });
                break;
            case 'descend':
                this.state.predictions.sort(function(first, second) {
                    if(first.score === second.score) {
                        return second.name.localeCompare(first.name);
                    }
                    return second.score - first.score;
                });
                break;
        }
    }

    renderFlag(isIndividualFlag) {
        if(isIndividualFlag){
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

    renderDisciplineBody(discipline) {
        return (
            <div
                className="disciplineBody"
                id={`body${discipline.name}`}
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

    renderDiscipline(discipline) {
        if(discipline.name === this.state.collapsedDiscipline){
            return (
                <div
                    key={discipline.name}
                    id={discipline.name}
                    className="c-discipline collapsed"
                    onClick={this.handleCollapsing}
                >
                    {this.renderDisciplineBody(discipline)}
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
                    onClick={this.handleCollapsing}
                >
                    {this.renderDisciplineBody(discipline)}
                </div>
            );
        }
    }

    filterPredictions(filter) {
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
        this.sortPredictions();

        return (
            <section className="l-section c-predictions" >
                <h2 className="header" >Predictions</h2>
                <label>Sort by:</label>
                <select
                  onChange={this.handleSortChange}
                  value={this.state.sort}
                >
                    <option value="none">Don't sort</option>
                    <option value="alphabetical">Alphabetical</option>
                    <option value="anti-alphabetical">Anti-alphabetical</option>
                    <option value="ascend">Score ascending</option>
                    <option value="descend">Score descending</option>
                </select>
                <label>Filter:</label>
                <select
                  onChange={this.handleFilterChange}
                  value={this.state.filter}
                >
                    <option value="none">None</option>
                    <option value="individual">Individual sport</option>
                    <option value="team">Team sport</option>
                </select>
                <div className="content">
                    {this.filterPredictions(this.state.filter)}
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
