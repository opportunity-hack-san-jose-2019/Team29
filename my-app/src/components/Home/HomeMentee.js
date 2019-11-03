import React, {Component} from "react";
import "../../App.css";
import axios from "axios";
import {connect} from 'react-redux';
import {hostedAddress} from "../../GlobalVar"
import cookie from "react-cookies";
import {Redirect} from "react-router";
import Dropdown from "react-dropdown";
import MentorDisplay from "../Presentational/MentorDisplay";

class Preference extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authFlag: false,
            mentorList: null,
            email: "",
            message: "",
            connectStatus: "Request"
        };
        this.submitRequest = this.submitRequest.bind(this);
        this.writeRequest = this.writeRequest.bind(this);
        this.messageChangeHandler = this.messageChangeHandler.bind(this);
    }

    componentWillMount() {
        let emailID = cookie.load('email');
        this.setState({
            authFlag: false,
            email: emailID
        });
        const data = {
            email: emailID
        };

        // this.setState({
        //     authFlag: true,
        //     //mentorList: response.mentorList
        //     mentorList: [{
        //         name: 'Adam',
        //         email: 'pe@gmail.com',
        //         pref: [{key: 'Age', value: '34'}, {key: 'Industry', value: 'Finance'}],
        //         profile: [{key: 'Age', value: '34'}, {key: 'Industry', value: 'Finance'}]
        //     }, {
        //         name: 'Ben',
        //         email: 'pp@gmail.com',
        //         pref: [{key: 'Gender', value: 'Male'}, {key: 'Interest', value: 'Soccer'}],
        //         profile: [{key: 'Age', value: '34'}, {key: 'Industry', value: 'Finance'}]
        //     }]
        // });

        var authorization=localStorage.getItem('bearer-token')
        console.log("authorization",authorization)
        axios.defaults.withCredentials = true;//very imp
        axios.post(hostedAddress + ":3001/getMentors", data, {headers:{'Authorization':authorization}})
            .then(response => {
                console.log("Status Code : ", response);
                if (response.status === 200 && response.data.mentorList) {
                    this.setState({
                        authFlag: true,
                        mentorList: response.data.mentorList
                        //mentorList: [{name:'Adam', age:'3'}, {name:'Ben', age:'34'}, {name:'Sean', age:'37'}]
                    });
                    console.log(this.state.mentorList)
                } else if (response.status === 201 && response.data != "exists" && response.data != "error") {
                    console.log("new mentee created-");
                    console.log(cookie.load('cookie'));
                    this.setState({
                        authFlag: true
                    });
                } else {
                    console.log("Invalid");
                }
            })
            .catch(response => {
                    alert("Invalid");
                    this.setState({
                        authFlag: false
                    });
                }
            )
    }

    messageChangeHandler = e => {
        this.setState({
            message: e.target.value
        });
    };

    submitRequest = (email) => {
        const data = {
            mentee_email: this.state.email,
            mentor_email: email,
            message: this.state.message,
            connectStatus: this.state.connectStatus
        };
        console.log('hahah' + JSON.stringify(data))
        var authorization=localStorage.getItem('bearer-token')
        axios.defaults.withCredentials = true;//very imp
        axios.post(hostedAddress + ":3001/sendConnectRequest", data, {headers:{'Authorization':authorization}})
            .then(response => {
                console.log("Status Code : ", response);
                if (response.status === 200 ) {
                    this.setState({
                        authFlag: true
                    });
                    alert('request sent!')
                    window.location.reload()
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

    writeRequest = (email) => {
        var e = document.getElementById(email);
        e.style.display = 'block';
    };

    render() {
        return (
            <div
                className='dropdown-overlay default-pointer'>
                <ul>
                    {this.state.mentorList ? this.state.mentorList.map((item, key) => (
                        <ul
                            key={key}
                            role='presentation'>
                            <div style={{display: "flex"}}>
                            <div style={{display: "flex", "border-style": "solid", "margin": "30px", "padding": "30px", "width": "300px", "border-radius": "25px", "background-color": "#d5f4e6" }}>
                                <MentorDisplay item={item} />
                                <button onClick={() => this.writeRequest(item[0].email)} className="btn btn-primary" style={{height: "20px", "margin-top": "auto", "margin-bottom": "auto", "margin-left": "50px"}}>
                                    Request
                                </button>
                            </div>
                            <div style={{ display: 'none', "margin-top": "auto", "margin-bottom": "auto", "padding-left": "50px" }} id={item[0].email}>
                                <input
                                    ref={ref => (this.messageToMentor = ref)}
                                    type="text"
                                    className="form-control"
                                    name="messageToMentor"
                                    placeholder="Type your message to your mentor"
                                    style={{ height: "200px", "margin-top": "auto", "margin-bottom": "auto", "width":"300px" }}
                                    onChange={this.messageChangeHandler}
                                />
                                <button onClick={() => this.submitRequest(item[0].email)} className="btn btn-primary" style={{height: "20px", "margin-left": "10px"}}>
                                    Send
                                </button>
                            </div>
                                </div>
                        </ul>
                    )) : 'No matches found'}
                </ul>
            </div>
        );
    }
}

export default (Preference);