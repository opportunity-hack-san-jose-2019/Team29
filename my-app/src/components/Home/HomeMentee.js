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
            mentorList: null
        };
    }

    componentWillMount() {
        this.setState({
            authFlag: false
        });
        let emailID = cookie.load('email');
        const data = {
            email: emailID
        };

        this.setState({
            authFlag: true,
            //mentorList: response.mentorList
            mentorList: [{name:'Adam', email:'pe@gmail.com', pref: [{key:'Age', value:'34'},{key:'Industry', value:'Finance'}], profile: [{key:'Age', value:'34'},{key:'Industry', value:'Finance'}]}, {name:'Ben', pref: [{key:'Gender', value:'Male'},{key:'Interest', value:'Soccer'}]}]
        });


        // axios.defaults.withCredentials = true;//very imp
        // axios.post(hostedAddress + ":3001/getMentors", data)
        //     .then(response => {
        //         console.log("Status Code : ", response);
        //         if (response.status === 200 && response.mentorList) {
        //             this.setState({
        //                 authFlag: true,
        //                 //mentorList: response.mentorList
        //                 mentorList: [{name:'Adam', age:'3'}, {name:'Ben', age:'34'}, {name:'Sean', age:'37'}]
        //             });
        //         } else if (response.status === 201 && response.data != "exists" && response.data != "error") {
        //             console.log("new mentee created-");
        //             console.log(cookie.load('cookie'));
        //             this.setState({
        //                 authFlag: true
        //             });
        //         } else {
        //             alert("Invalid");
        //         }
        //     })
        //     .catch(response => {
        //             alert("Invalid");
        //             this.setState({
        //                 authFlag: false
        //             });
        //         }
        //     )
    }

    render() {

        return (
            <div
                className='dropdown-overlay default-pointer'>
                <ul>
                    {this.state.mentorList.map((item, key) => (
                        <ul
                            key={key}
                            role='presentation'>
                            <MentorDisplay item={item}/>
                        </ul>
                    ))}
                </ul>
            </div>
        );
    }
}

export default (Preference);