/**
 * Component responsible for managing buttons to switch athletes.
 */

import React from 'react'
import PropTypes from 'prop-types'

import './index.styl'

export default class SwitchAthleteButtons extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currAthlete: props.currAthlete,
            maxAthleteNum: props.maxAthleteNum
        };
        this.handleArrowKeys = this.handleArrowKeys.bind(this);
    }

    componentWillMount() {
        document.addEventListener("keydown", this.handleArrowKeys, false);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleArrowKeys, false);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            currAthlete: nextProps.currAthlete,
            maxAthleteNum: nextProps.maxAthleteNum
        });
        let prevBtn = document.querySelector(".prevAthleteBtn");
        let nextBtn = document.querySelector(".nextAthleteBtn");
        if(this.isAthleteFirst(nextProps.currAthlete)) {
            this.disableButton(prevBtn);
        } else {
            this.enableButton(prevBtn);
        }
        if(this.isAthleteLast(nextProps.currAthlete, nextProps.maxAthleteNum)) {
            this.disableButton(nextBtn);
        } else {
            this.enableButton(nextBtn);
        }
    }

    componentDidMount() {
        if(this.isAthleteFirst(this.state.currAthlete)){
            this.disableButton(document.querySelector(".prevAthleteBtn"));
        }
        if(this.isAthleteLast(this.state.currAthlete, this.state.maxAthleteNum)){
            this.disableButton(document.querySelector(".nextAthleteBtn"));
        }
    }

    isAthleteFirst(currAthlete) {
        return currAthlete === 0;
    }

    isAthleteLast(currAthlete, maxAthleteNum) {
        return currAthlete + 1 === maxAthleteNum;
    }

    disableButton(btn) {
        btn.disabled = true;
        btn.style.display = "none";
    }

    enableButton(btn) {
        btn.disabled = false;
        btn.style.display = "block";
    }

    handleArrowKeys(e) {
        if(e.key === "ArrowLeft" && this.state.currAthlete != 0){
            this.props.prevAthlete();
        }
        if(e.key === "ArrowRight" && this.state.currAthlete + 1 != this.state.maxAthleteNum){
            this.props.nextAthlete();
        }
    }

    render() {
        return (
            <div className="switchAthleteButtons">
                <button
                    className="prevAthleteBtn"
                    onClick={this.props.prevAthlete}>
                </button>
                <button
                    className="nextAthleteBtn"
                    onClick={this.props.nextAthlete}>
                </button>
            </div>
        );
    }
}
