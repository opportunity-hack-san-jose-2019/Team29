import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import HomeMentee from './HomeMentee/HomeMentee';
import HomeMentor from './HomeMentor/HomeMentor';
import Profile from './Profile/Profile';
import Landing from "./Landing/Landing";
import LandingImage from "./Landing/LandingImage";


class Main extends Component {
    render(){
        return(
            <div>
                <Route path="/" component={Landing}/>
                <Route path="/landing_image" component={LandingImage}/>
                <Route path="/login" component={Login}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/home_mentee" component={HomeMentee}/>
                <Route path="/home_mentor" component={HomeMentor}/>
                <Route path="/profile" component={Profile}/>
            </div>
        )
    }
}
//self note --- Export The Main Component
export default Main;