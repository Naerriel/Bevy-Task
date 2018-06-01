/**
 * Component for aggregating user data. Displays disciplines with lowest & highest scores for the given athlete.
 */

import React from 'react'
import PropTypes from 'prop-types'
import './index.styl'

export default class Hints extends React.Component {
    render() {
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