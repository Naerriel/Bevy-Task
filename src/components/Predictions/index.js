/**
 * Component displaying and managing list of disciplines with calculated athlete score.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { disciplineScore, skillScore } from '../../libs/calculate'
import './index.styl'

export default class Predictions extends React.Component {
    render() {
        let predictionsTable = [...this.props.disciplines];
        predictionsTable.map((discipline) => {
            discipline.score = disciplineScore(this.props.athlete.skillset, discipline.requirements);
            discipline.drilldown = {};
            Object.keys(this.props.athlete.skillset).map((skill) => {
                let score = skillScore(this.props.athlete.skillset[skill], discipline.requirements[skill]);
                discipline.drilldown[skill] = score;
            });
        });
        return (
            <section className="l-section c-predictions" >
                <h2 className="header" >Predictions</h2>
                <div className="content">
                    {this.props.disciplines.map((discipline) => {
                        return (
                            <div key={discipline.name} className="c-discipline">
                                <span className="name">
                                  {discipline.name}
                                </span>
                                -
                                <span className="score">
                                  {disciplineScore(this.props.athlete.skillset, discipline.requirements)}
                                </span>
                            </div>
                        );
                    })}
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
