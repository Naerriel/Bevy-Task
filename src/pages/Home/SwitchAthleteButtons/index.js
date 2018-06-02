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
        this.keyDown = this.keyDown.bind(this);
    }

    componentWillMount() {
        document.addEventListener("keydown", this.keyDown, false);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyDown, false);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            currAthlete: nextProps.currAthlete,
            maxAthleteNum: nextProps.maxAthleteNum
        });
        let prevBtn = document.querySelector(".prevAthleteBtn");
        let nextBtn = document.querySelector(".nextAthleteBtn");
        if(nextProps.currAthlete <= 0) {
            this.disableButton(prevBtn);
        } else {
            this.enableButton(prevBtn);
        }
        if(nextProps.currAthlete + 1 >= nextProps.maxAthleteNum) {
            this.disableButton(nextBtn);
        } else {
            this.enableButton(nextBtn);
        }
    }

    componentDidMount() {
        if(this.state.currAthlete === 0){
            this.disableButton(document.querySelector(".prevAthleteBtn"));
        }
        if(this.state.currAthlete + 1 === this.state.maxAthleteNum){
            this.disableButton(document.querySelector(".nextAthleteBtn"));
        }
    }

    disableButton(btn) {
        btn.disabled = true;
        btn.style.display = "none";
    }

    enableButton(btn) {
        btn.disabled = false;
        btn.style.display = "block";
    }

    keyDown(e) {
        if(e.key === "ArrowLeft" && this.state.currAthlete != 0){
            this.props.prevAthlete();
        }
        if(e.key === "ArrowRight" && this.state.currAthlete + 1 != this.state.maxAthleteNum){
            this.props.nextAthlete();
        }
    }

    render() {
        return (
            <div className="switchAthleteButtons" onKeyPress={this.keyPress}>
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
