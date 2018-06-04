/**
 * Component responsible for clicking on Tabs
 */

import React from 'react'
import PropTypes from 'prop-types'

import "./index.styl"

export default class Tabs extends React.Component {
    constructor(props) {
        super(props);

        this.state = { currTab: props.currTab };
        this.handleTabClick = this.handleTabClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ currTab: nextProps.currTab });
        this.actualizeTabs(nextProps.currTab);
    }

    componentDidMount(){
        this.actualizeTabs(this.state.currTab);
    }

    actualizeTabs(currTab) {
        let activeEl = document.querySelector(".activeTab");
        if(activeEl){
            activeEl.classList.remove("activeTab");
        }
        switch(currTab) {
            case "Overview":
                document.querySelector("#overview").classList.add("activeTab");
                break;
            case "Predictions":
                document.querySelector("#predictions").classList.add("activeTab");
                break;
            case "Hints":
                document.querySelector("#hints").classList.add("activeTab");
                break;
        }
    }

    handleTabClick(e) {
        this.props.handleTabChange(e.target.innerHTML);
    }

    render() {
        return (
            <div className="tabs">
                <span className="tab" id="overview" onClick={this.handleTabClick}>
                    Overview
                </span>
                <span className="tab" id="predictions" onClick={this.handleTabClick}>
                    Predictions
                </span>
                <span className="tab" id="hints" onClick={this.handleTabClick}>
                    Hints
                </span>
            </div>
        );
    }
}
