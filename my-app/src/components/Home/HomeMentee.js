import React, {Component} from "react";
import "../../App.css";
import axios from "axios";
import {connect} from 'react-redux';
import {hostedAddress} from "../../GlobalVar"
import cookie from "react-cookies";
import {Redirect} from "react-router";
import Dropdown from "react-dropdown";

class Preference extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authFlag: false
        };
    }

    componentWillMount() {
        this.setState({
            authFlag: false
        });
    }

    submitPreference = e => {
        var headers = new Headers();

        e.preventDefault();

        const data = {
            gender: this.state.gender,
            ageUpper: this.state.ageUpper,
            ageLower: this.state.ageLower,
            industry: this.state.industry,
            personality: this.state.personality,
            adviceCategory: this.state.adviceCategory,
            interest: this.state.interest,
        };
        console.log("data is here")
        console.log(data)
        axios.defaults.withCredentials = true;//very imp
        axios.post(hostedAddress + ":3001/sendPref", data)
            .then(response => {
                console.log("Status Code : ", response);
                if (response.status === 200 && response.data != "exists" && response.data != "error") {
                    console.log("new mentor created-");
                    console.log(cookie.load('new1'));
                    localStorage.setItem('bearer-token', response.headers.authorization)
                    this.setState({
                        authFlag: true
                    });
                } else if (response.status === 201 && response.data != "exists" && response.data != "error") {
                    console.log("new mentee created-");
                    console.log(cookie.load('cookie'));
                    this.setState({
                        authFlag: true
                    });
                } else if (response.data == "exists") {
                    alert("There's already an account associated with this email-id :(");
                    this.setState({
                        authFlag: false
                    });
                } else {
                    alert("Invalid");
                }
            })
            .catch(response => {
                    alert("Invalid");
                    this.setState({
                        authFlag: false
                    });
                }
            )
    };

    render() {

        return (
            <div>
                <div class="container">
                    <div class="login-form">
                        <form onSubmit={this.submitPreference}>
                            <div class="main-div">
                                <div class="panel">
                                    <h2>Mentor Preference Selection</h2>
                                    <p>Let us know what type of mentors you would like to get and we will give the best
                                        matches</p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default (Preference);