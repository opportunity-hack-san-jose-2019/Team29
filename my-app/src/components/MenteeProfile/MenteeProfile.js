import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';
import {hostedAddress} from "../../GlobalVar"
let img_src=null;
//create the Landing Component
class MenteeProfile extends Component {
    constructor(props){
        super(props);
        this.state={
            email:"",
            firstName:"",
            lastName: "",
            userOption:"",
            homeCity: "",
            workCity: "",
            ethnicity: "",
            profilePhoto: null,
            age: "",
            interest: "",
            gender: "",
            industry: "",
            personalities: "",
            adviceCategory: "",
            skillSets: [], // checkbox
            media: "",
            placeToMeet: "",
            communities: [], // checkbox
            expectations: "",
            linkedinProfile: "",
            phone:"",
            address:""
        };
    }
    componentWillMount=()=>
    {
        let emailid=cookie.load('email');
        let token=localStorage.getItem('bearer-token');
        console.log('dsg',token)
        let data={'email':emailid};
        console.log(data.email);
        img_src=hostedAddress+':3001/'+cookie.load('idGeneric')+'.jpg'
        console.log('ayaa1');
        axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
        axios.post(hostedAddress+':3001/getProfileMentee',data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
            .then((response) => {
                console.log('getProfileMentee' + JSON.stringify(response));
                // console.log(response.data[0]);
                let me_communities='';
                for(let item in response.data[0].mentee_communities)
                {
                    me_communities+=item;
                    me_communities+=',';
                }
                let me_skillSets='';
                for(let item in response.data[0].mentee_skillSets)
                {
                    me_skillSets+=item;
                    me_skillSets+=',';
                }
                this.setState({
                    email:response.data[0].mentee_email,
                    firstName:response.data[0].mentee_firstName,
                    lastName:response.data[0].mentee_lastName,
                    phone:response.data[0].mentee_phone,
                    homeCity:response.data[0].mentee_homeCity,
                    workCity:response.data[0].mentee_workCity,
                    ethnicity:response.data[0].mentee_ethnicity,
                    address:response.data[0].mentee_address,
                    // profilePhoto:response.data[0].mentee_profilePhoto,
                    interest: response.data[0].mentee_interest,
                    industry: response.data[0].mentee_industry,
                    personalities: response.data[0].mentee_personalities,
                    adviceCategory: response.data[0].mentee_adviceCategory,
                    age: response.data[0].mentee_age,
                    skillSets: me_skillSets, // checkbox
                    media: response.data[0].mentee_media,
                    placeToMeet: response.data[0].mentee_placeToMeet,
                    communities: me_communities, // checkbox
                    expectations: response.data[0].mentee_expectations,
                    linkedinProfile: response.data[0].mentee_linkedinProfile
                });
            })
            .catch(()=>{console.log("error")});
    }
    render(){
        let redirectVar = null;
        // if(cookie.load('cookie')!='mentee'){
        //     redirectVar = <Redirect to="/login"/>
        // }
        console.log('ayaa');
        let image=<img src={img_src} style={{borderRadius:'5%'}}width="180" height="230" alt='(Please Insert Your Profile Pic)'/>
        return(
            <div class='container'>
                {redirectVar}
                <h1 class='h1'>Your Profile</h1>
                <table class='table'>
                    {image}
                    <tbody>
                    <tr>
                        <td><b>First Name</b></td>
                        <td>{this.state.firstName}</td>
                    </tr>
                    <tr>
                        <td><b>Last Name</b></td>
                        <td>{this.state.lastName}</td>
                    </tr>
                    <tr>
                        <td><b>Email</b></td>
                        <td>{this.state.email}</td>
                    </tr>
                    <tr>
                        <td><b>Phone</b></td>
                        <td>{this.state.phone}</td>
                    </tr>
                    <tr>
                        <td><b>Home City</b></td>
                        <td>{this.state.homeCity}</td>
                    </tr>
                    <tr>
                        <td><b>Work City</b></td>
                        <td>{this.state.workCity}</td>
                    </tr>
                    <tr>
                        <td><b>Ethnicity</b></td>
                        <td>{this.state.ethnicity}</td>
                    </tr>
                    <tr>
                        <td><b>Interest</b></td>
                        <td>{this.state.interest}</td>
                    </tr>
                    <tr>
                        <td><b>Personalities</b></td>
                        <td>{this.state.personalities}</td>
                    </tr>
                    <tr>
                        <td><b>Advice Category</b></td>
                        <td>{this.state.adviceCategory}</td>
                    </tr>
                    <tr>
                        <td><b>Skill Sets</b></td>
                        <td>{this.state.skillSets}</td>
                    </tr>
                    <tr>
                        <td><b>Media</b></td>
                        <td>{this.state.media}</td>
                    </tr>
                    <tr>
                        <td><b>Place To Meet</b></td>
                        <td>{this.state.placeToMeet}</td>
                    </tr>
                    <tr>
                        <td><b>Communities</b></td>
                        <td>{this.state.communities}</td>
                    </tr>
                    <tr>
                        <td><b>LinkedIn Profile</b></td>
                        <td>{this.state.linkedinProfile}</td>
                    </tr>
                    <tr>
                        <td><b>Address</b></td>
                        <td>{this.state.address}</td>
                    </tr>
                    </tbody>
                </table>
                <div>
                    <a href='/update_mentee_profile' class="btn btn-primary" style={{background:  '#ED2E38',borderColor: '#ED2E38',color: 'white'}}>Update</a>
                </div>
            </div>
        )
    }
}
export default (MenteeProfile);