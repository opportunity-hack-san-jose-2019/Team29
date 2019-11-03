import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { connect } from 'react-redux';
import { login } from "../../redux-files/action";
import { setTimeout } from "timers";
import {hostedAddress} from "../../GlobalVar"

let redirectVar = null;

const options = ["Mentee", "Mentor"];

class Login extends Component {
  
  constructor(props) {
    super(props);   
    this.state = {
      email: "",
      password: "",
        authFlag: false,
      userOptions: ""
    };
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.userOptionsChangeHandler = this.userOptionsChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

    componentWillMount() {
        this.setState({
            authFlag: false
        });
    }

  emailChangeHandler = e => {
    this.setState({
        email: e.target.value
    });
  };

  userOptionsChangeHandler = value => {
    this.setState({
        userOptions: value
    });
    this.userOptions.value = { value };
  };

  passwordChangeHandler = e => {
    this.setState({
      password: e.target.value
    });
  };

  submitLogin = e => {
    var headers = new Headers();
    e.preventDefault();
    const data = {
        email: this.state.email,
      password: this.state.password,
        userOptions: this.state.userOptions
    };
    axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
    axios.post(hostedAddress+":3001/login", data)
    .then(response => {   
        console.log("Status Code : ", response);
        if (response.status === 200 && response.data!="error") {
          console.log("welcome mentor-");
          console.log(cookie.load('cookie'));
          localStorage.setItem('bearer-token',response.headers.authorization)
          this.setState({
            authFlag: true
          });
        } else if (response.status === 201 && response.data!="error") {
          console.log("welcome mentee-");
          console.log(cookie.load('cookie'));
          this.setState({
            authFlag: true
          });
        }
        else if(response.data=="error")
        {
            alert("Invalid credentials");
            this.setState({
            authFlag: false
        });
        }
    })
    .catch (response => {
        alert("Invalid");
        this.setState({
          authFlag: false
        });
      }
    )
    // this.props.login(data); 
    // For Redux just uncomment this line, comment the above lines and the rest is as it is.
    // Refer the bhagwan chart for understanding the flow.

  };
  render() {
    if(!cookie.load('cookie')){
        redirectVar = <Redirect to= "/login"/>
    }
    else {
        redirectVar = <Redirect to= "/home"/>
    }
    return (
      <div>
        {redirectVar}
        <div class="container">
          <div class="login-form">
          <form onSubmit={this.submitLogin}>
            <div class="main-div">
              <div class="panel">
                <h2 >Year Up Login</h2>
                <p>Please enter your email and password</p>
              </div>
              <div class="form-group">
                <input
                  onChange={this.emailChangeHandler}
                  type="email"
                  class="form-control"
                  name="username"
                  placeholder="Email"
                  required
                />
              </div>
              <div class="form-group">
                <input
                  onChange={this.passwordChangeHandler}
                  type="password"
                  class="form-control"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div class="form-group">
                <Dropdown
                  ref={ref => (this.userOptions = ref)}
                  options={options}
                  onChange={this.userOptionsChangeHandler}
                  value={this.state.userOptions}
                  placeholder="I'm a.."
                  required
                />
              </div>
              <div>
              <input
                  ref={ref => (this.submit = ref)}
                  type="submit"
                  class="btn btn-primary"
                  value="Login"
                />
                { <button onClick={this.submitLogin} class="btn btn-primary">
                  Login
                </button> }
              </div>
              <br></br>
              <div>First time here? <a href="/signup">Sign up!</a></div>
            </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
