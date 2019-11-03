import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Landing extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
        cookie.remove('name', { path: '/' })
        cookie.remove('email', { path: '/' })
        cookie.remove('mentee_id', { path: '/' })
        cookie.remove('mentor_id', { path: '/' })
        localStorage.removeItem('bearer-token')
    };
    render(){
        let navLogin = null;
        let nav1='Mentor ';
        let nav2='Mentee ';
        let navTabs=null;
        let redirectVar = null;
        let iconClick = null;

        if(!cookie.load('cookie')){
            redirectVar = <Redirect to="/landing_image"/>
            iconClick = (
                <Link to="/landing_image" ><img  width='100' height='100' style={{top: '100', left: '100'}} class="img-responsive" src="https://pbs.twimg.com/profile_images/1155942157271756802/sadQZCKZ_400x400.jpg"/></Link>
            )
            console.log("Not Able to read cookie");
            navLogin = (
                <ul class="nav navbar-default navbar-nav navbar-right">
                    <li><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
                    <li><Link to="/signup"><span class="glyphicon glyphicon-log-in"></span> Sign Up</Link></li>
                </ul>
            )
        }
        else if(cookie.load('cookie')=='mentor'){
            iconClick = (
                <Link to="/home_mentor" ><img  width='100' height='100' style={{top: '100', left: '100'}} class="img-responsive" src="https://pbs.twimg.com/profile_images/1155942157271756802/sadQZCKZ_400x400.jpg"/></Link>
            )
            console.log("Able to read cookie");
            navLogin = (
                <ul class="nav navbar-default navbar-nav navbar-right">
                    <li><Link to="/mentor_profile"><span class=""></span> Hi {cookie.load('email')}</Link></li>
                    <li><Link to="/landing_image" onClick = {this.handleLogout}><span class=""></span>Logout</Link></li>
                </ul>
            );
        }
        else if(cookie.load('cookie')=='mentee'){

            iconClick = (
                <div>
                    <Link to="/home_mentee" class="navbar-brand logo"><img class="img-responsive" src="https://pbs.twimg.com/profile_images/1155942157271756802/sadQZCKZ_400x400.jpg"/></Link>
                    <Link to="/menu_rest" class="navbar-brand"><span class="glyphicon "></span><label>      </label>Menu</Link>
                    {/* <Link to="/home_rest" class="navbar-brand"><span class="glyphicon "></span><label>      </label>Upcoming Orders</Link> */}
                    {/* <Link to="/past_orders_rest" class="navbar-brand"><span class="glyphicon "></span><label>      </label>Past Orders</Link> */}
                </div>
            )
            console.log("Able to read cookie");
            let test=(<div class="navbar">
                <a href="#home">Home</a>
                <a href="#news">News</a>
                <div class="dropdown">
                    <button class="dropbtn">Dropdown
                        <i class="fa fa-caret-down"></i>
                    </button>
                    <div class="dropdown-content">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>
                </div>
            </div>)
            navLogin = (
                <ul class="nav navbar-default navbar-nav navbar-right">
                    <li><Link to="/mentee_profile"><span className=""></span> Hi {cookie.load('email')}</Link></li>
                    <li><Link to="/landing_image" onClick = {this.handleLogout}><span class="glyphicon glyphicon"></span>Logout</Link></li>
                </ul>
            );
        }
        return(
            <div>
                {redirectVar}

                <nav class="navbar navbar-default">
                    <div class="container-fluid ">
                        <div class="navbar-header ">
                            {iconClick}
                        </div>
                        {navLogin}
                    </div>
                </nav>
            </div>
        )
    }
}

export default Landing;