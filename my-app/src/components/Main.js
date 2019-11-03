import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import HomeMentee from './Home/HomeMentee';
import HomeMentor from './Home/HomeMentor';
import Profile from './Profile/Profile';
import Landing from "./Landing/Landing";
import LandingImage from "./Landing/LandingImage";
import Preference from './Preference/Preference'
import MenteeProfile from "./MenteeProfile/MenteeProfile";
import UpdateProfileMentee from "./UpdateProfileMentee/UpdateProfileMentee";


class Main extends Component {
    render(){
        return(
            <div>
                <Route path="/landing_image" component={LandingImage}/>
                <Route path="/login" component={Login}/>
                <Route path="/sendPref" component={Preference}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/home_mentee" component={HomeMentee}/>
                <Route path="/home_mentor" component={HomeMentor}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/mentee_profile" component={MenteeProfile}/>
                <Route path="/update_mentee_prof" component={UpdateProfileMentee}/>
            </div>
        )
    }
}
//self note --- Export The Main Component
export default Main;