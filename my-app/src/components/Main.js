import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Preference from './Preference/Preference'

class Main extends Component {
    render(){
        return(
            <div>
                <Route path="/login" component={Login}/>
                <Route path="/sendPref" component={Preference}/>
            </div>
        )
    }
}
//self note --- Export The Main Component
export default Main;