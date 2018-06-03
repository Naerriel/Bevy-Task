/**
 * Component for aggregating user data. Displays disciplines with lowest & highest scores for the given athlete.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { disciplineScore } from '../../libs/calculate'
import './index.styl'

export default class Hints extends React.Component {
    constructor() {
        super();

        this.state = {};
    }

    componentWillMount() {
        this.createHints(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createHints(nextProps);
    }

    notNative(disciplineName, nativeDisciplines) {
        nativeDisciplines.forEach((nativeDisciplineName) => {
            if(nativeDisciplineName === disciplineName) return false;
        });
        return true;
    }

    temporaryName(predictions, props, array) {
        predictions.forEach((prediction) => {
            if(this.notNative(prediction.name, props.athlete.nativeDisciplines)){
                if(array.length < 3 || array.slice(-1).pop().score === prediction.score){
                    array.push(prediction);
                }
            }
        });
    }

    createHints(props) {
        let predictions = [];
        props.disciplines.map((discipline) => {
            let score = disciplineScore(props.athlete.skillset, discipline.requirements);
            let object = {
                "name": discipline.name,
                "score": score
            };
            predictions.push(object);
        });
        predictions.sort(function(first, second){
            return first.score - second.score;
        });
        let shouldTrySkills = [];
        let shouldAvoidSkills = [];
        this.temporaryName(predictions, props, shouldAvoidSkills);
        predictions.reverse();
        this.temporaryName(predictions, props, shouldTrySkills);
        this.setState({
            shouldTrySkills,
            shouldAvoidSkills
        });
    }

    render() {
        console.log(this.state);
        return (
            <section className="l-section c-hints" >
                <h2 className="header" >Hints</h2>
                <div className="content">
                    <span>...</span>
                </div>
            </section>
        )
    }
}

Hints.propTypes = {
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
