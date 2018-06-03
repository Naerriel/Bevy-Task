/**
 * Component for displaying basic info about the provided athlete.
 */

import React from 'react'
import PropTypes from 'prop-types'
import './index.styl'

import upperBody from './assets/upperBody.png'
import lowerBody from './assets/lowerBody.png'
import endurance from './assets/endurance.png'
import agility from './assets/agility.png'
import aesthetics from './assets/aesthetics.png'

const maxLevel = 5;

export default class Overview extends React.Component {
    // Can change spans with className="label" to just labels
    resetExtremeSkills() {
        Object.keys(this.props.skillset).map((skill) => {
            let thisSkill = document.querySelector(`#${skill}`);
            thisSkill.classList.remove("bestSkill");
            thisSkill.classList.remove("worstSkill");
        });
    }

    selectExtremeSkills(props) {
        this.resetExtremeSkills();
        let bestSkills = [];
        let bestSkillLevel = 0;
        let worstSkills = [];
        let worstSkillLevel = maxLevel;

        Object.keys(props.skillset).map((skill) => {
            const level = props.skillset[skill];
            if(level > bestSkillLevel) {
                bestSkillLevel = level;
                bestSkills = [];
            }
            if(level === bestSkillLevel) {
                bestSkills.push(skill);
            }
            if(level < worstSkillLevel) {
                worstSkillLevel = level;
                worstSkills = [];
            }
            if(level === worstSkillLevel) {
                worstSkills.push(skill);
            }
        });
        bestSkills.forEach((skill) => {
            document.querySelector(`#${skill}`).classList.add("bestSkill");
        });
        worstSkills.forEach((skill) => {
            document.querySelector(`#${skill}`).classList.add("worstSkill");
        });
    }

    componentDidMount() {
        this.selectExtremeSkills(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.selectExtremeSkills(nextProps);
    }

    renderSkillImage(skill){
        switch(skill){
            case 'upperBody':
                    return <img src={upperBody} />
            case 'lowerBody':
                    return <img src={lowerBody} />
            case 'endurance':
                    return <img src={endurance} />
            case 'agility':
                    return <img src={agility} />
            case 'aesthetics':
                    return <img src={aesthetics} />
        }
    }

    render() {
        return (
            <section className="l-section c-overview" >
                <h2 className="header" >Overview</h2>
                <div className="content">
                    <span className="label">Bio</span>
                    <p className="bio">{this.props.bio}</p>
                    <span className="label">Skillset</span>
                    <div className="skillset">
                        {Object.keys(this.props.skillset).map((skill) => {
                            return (
                                <div className="skill" key={skill}>
                                    {this.renderSkillImage(skill)}
                                    <figcaption id={skill}>
                                        {this.props.skillset[skill]}
                                    </figcaption>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        )
    }
}

Overview.propTypes = {
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    skillset: PropTypes.objectOf(PropTypes.number).isRequired,
    nativeDisciplines: PropTypes.arrayOf(PropTypes.string).isRequired,
}
