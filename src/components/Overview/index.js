/**
 * Component for displaying basic info about the provided athlete.
 */

import React from 'react'
import PropTypes from 'prop-types'
import './index.styl'

export default class Overview extends React.Component {
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
                                <div key={skill}>
                                    <span className="list-item">{`${skill}: `}</span>
                                    {this.props.skillset[skill]}
                                </div>
                            )
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