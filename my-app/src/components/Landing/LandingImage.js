import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//create the Landing Component
class LandingImage extends Component {

    render(){
        return(
            <body class="bg" >
            <img class="bg" src='https://www.aaba-bay.com/resources/Pictures/slider-images/1%20-%20AABA%20MENTORSHIP.png'/>
            </body>
        )
    }
}

export default LandingImage;