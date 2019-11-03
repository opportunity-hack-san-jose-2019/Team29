import React, {Component} from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import {Redirect} from "react-router";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import {connect} from 'react-redux';
import {hostedAddress} from "../../GlobalVar"

let redirectVar = null;

const genderOptions = ["Male", "Female", "Others"]
const industryOptions = ["Agriculture, Forestry, Fishing and Hunting", "Arts, Entertainment, and Recreation", "Broadcasting", "College, University, and Adult Education", "Computer and Electronics Manufacturing", "Construction", "Finance and Insurance", "Government and Public Administration", "Health Care and Social Assistance", "Homemaker", "Hotel and Food Services", "Information Services and Data Processing", "Legal Services", "Military", "Mining", "Other Education Industry", "Other Information Industry", "Other Manufacturing", "Primary/Secondary (K-12) Education", "Publishing", "Real Estate, Rental and Leasing", "Religious", "Retail", "Scientific or Technical Services", "Software", "Telecommunications", "Transportation and Warehousing", "Utilities", "Wholesale", "Other Industry"]
const personalityOptions = ["Extrovert", "Introvert"];
const adviceCategoryOptions = ["Life", "Career", "Professional/Technical Skills", "Leadership"];

class Preference extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: "",
            ageUpper: "",
            ageLower: "",
            industry: "",
            personality: "",
            adviceCategory: "",
            interest: "",
            authFlag: false,
            email: ""
        };
        this.genderChangeHandler = this.genderChangeHandler.bind(this);
        this.ageUpperChangeHandler = this.ageUpperChangeHandler.bind(this);
        this.ageLowerChangeHandler = this.ageLowerChangeHandler.bind(this);
        this.industryChangeHandler = this.industryChangeHandler.bind(this);
        this.personalityChangeHandler = this.personalityChangeHandler.bind(this);
        this.adviceCategoryChangeHandler = this.adviceCategoryChangeHandler.bind(this);
        this.interestChangeHandler = this.interestChangeHandler.bind(this);


        this.submitPreference = this.submitPreference.bind(this);
    }

    componentWillMount() {
        let emailID = cookie.load('email');
        this.setState({
            authFlag: false,
            email: emailID
        });
    }

    genderChangeHandler = value => {
        this.setState({
            gender: value
        });
        this.gender.value = {value};
    };

    ageUpperChangeHandler = e => {
        this.setState({
            ageUpper: e.target.value
        });
    };

    ageLowerChangeHandler = e => {
        this.setState({
            ageLower: e.target.value
        });
    };

    industryChangeHandler = value => {
        this.setState({
            industry: value
        });
        this.industry.value = {value};
    };

    personalityChangeHandler = value => {
        this.setState({
            personality: value
        });
        this.personality.value = {value};
    };

    adviceCategoryChangeHandler = value => {
        this.setState({
            adviceCategory: value
        });
        this.adviceCategory.value = {value};
    };

    interestChangeHandler = e => {
        this.setState({
            interest: e.target.value
        });
    };

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
            email: this.state.email
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
        if (cookie.load('cookie') && cookie.load('cookie') == 'mentee') {
            redirectVar = <Redirect to="/home_mentee"/>
        }
        return (
            <div>
                {redirectVar}
                <div class="container">
                    <div class="login-form">
                        <form onSubmit={this.submitPreference}>
                            <div class="main-div">
                                <div class="panel">
                                    <h2>Mentor Preference Selection</h2>
                                    <p>Let us know what type of mentors you would like to get and we will give the best
                                        matches</p>
                                </div>
                                <div className="form-group">
                                    <Dropdown
                                        ref={ref => (this.gender = ref)}
                                        options={genderOptions}
                                        onChange={this.genderChangeHandler}
                                        value={this.state.gender}
                                        placeholder="Preferred Gender"
                                        required
                                    />
                                </div>
                                <div class="form-group">
                                    <input
                                        ref={ref => (this.ageUpper = ref)}
                                        onChange={this.ageUpperChangeHandler}
                                        type="number"
                                        min="25"
                                        class="form-control"
                                        name="ageUpper"
                                        placeholder="Age Upper Bound"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        ref={ref => (this.ageLower = ref)}
                                        onChange={this.ageLowerChangeHandler}
                                        type="number"
                                        min="25"
                                        className="form-control"
                                        name="ageLower"
                                        placeholder="Age Lower Bound"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <Dropdown
                                        ref={ref => (this.industry = ref)}
                                        options={industryOptions}
                                        onChange={this.industryChangeHandler}
                                        value={this.state.industry}
                                        placeholder="Preferred Industry"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <Dropdown
                                        ref={ref => (this.personality = ref)}
                                        options={personalityOptions}
                                        onChange={this.personalityChangeHandler}
                                        value={this.state.personality}
                                        placeholder="Preferred Personality"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <Dropdown
                                        ref={ref => (this.adviceCategory = ref)}
                                        options={adviceCategoryOptions}
                                        onChange={this.adviceCategoryChangeHandler}
                                        value={this.state.adviceCategory}
                                        placeholder="Preferred Advice Category"
                                        required
                                    />
                                </div>

                                <div>
                                    <input
                                        ref={ref => (this.submit = ref)}
                                        type="submit"
                                        class="btn btn-primary"
                                        value="Sign Up"
                                    />
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