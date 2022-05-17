import React from 'react'
import logoTranSmall from '../imgs/logoTranSmall.png';
import homeIcon from '../imgs/homeIcon.png';
import patProfile from '../imgs/patientprofile.jpg';
import docProfile from '../imgs/docprofile.jpg';
import pharmProfile from '../imgs/pharmprofile.jpg';
import styled from 'styled-components';
import { Link, NavLink } from "react-router-dom";
import {getUser, setUser} from '../App.js'

/*so the log out button scales with the window height*/
const Log = styled.li`
    background-color: #E84E36;
    padding-top: 0vh;
    @media screen and (min-height: 450px) {
        padding-top: 13vh;
    }
    @media screen and (min-height: 500px) {
        padding-top: 20vh;
    }
    @media screen and (min-height: 550px) {
        padding-top: 29vh;
    }
    @media screen and (min-height: 650px) {
        padding-top: 40vh;
    }
    @media screen and (min-height: 750px) {
        padding-top: 48vh;
    }
    @media screen and (min-height: 850px) {
        padding-top: 54vh;
    }
    @media screen and (min-height: 1000px) {
        padding-top: 60vh;
    }
    @media screen and (min-height: 1250px) {
        padding-top: 67vh;
    }
    @media screen and (min-height: 1500px) {
        padding-top: 72vh;
    }
`;


class NavBar extends React.Component{

    constructor(props) {
		super(props);
		this.state = {
            user: {},
			userType: ""
		};

    
	}
    

    componentDidMount() {
        //console.log(this.state.userType);
	}

    updateState(type){
        this.setState({ userType: type });
        console.log("NAVBAR: " + this.state.userType);
    }

    logout(){
        console.log("TEST");
        //setUser("");
        this.updateState("");
    }


    render(){
    return (
        <div>
            
            {/* EVENTS IS A TEMPORARY WAY OF DOING THIS, NAVBAR RESETS ON REFRESH*/}

            {/* LOAD TO SIGNUP PAGE ON REFRESH */}
           
            {/*listens for patient to be logged in */}
            {document.addEventListener("loggedInPatient", () => {
                    this.setState({ userType: "patient" });
                    //this.setState({user: getUser()}); {/*this is the bogus line probably*/}
                    this.updateState("patient")
		        })}

            {/*listens for docotor to be logged in */}
            {document.addEventListener("loggedInDoctor", () => {
                    this.setState({ userType: "doctor" });
                    //this.setState({user: getUser()}); {/*this is the bogus line probably*/}
                    this.updateState("doctor")
		        })}

            {/*listens for pharmacist to be logged in */}
            {document.addEventListener("loggedInPharmacist", () => {
                    this.setState({ userType: "pharmacist" }); 
                    //this.setState({user: getUser()}); {/*this is the bogus line probably*/}
                    this.updateState("pharmacist")
		        })}

            {/*styling listed here*/}
            
            <ul className="navBar">
                
                {/*load navbar component based on state*/}

                
                {/*if usertype null render signin and signup*/}
                {this.state.userType === "" ? <li><img src={logoTranSmall} alt="logoTranSmall" className="profile"></img></li> : null}
                {this.state.userType === "" ? <li><h2>Welcome</h2></li> : null}

                {this.state.userType === "" ? <li><Link to="/" >Sign In</Link></li> : null}
                {this.state.userType === "" ? <li><Link to="/SignUp" >Sign Up</Link></li> : null}
                
                {/*Patient*/}
                {/*Imagine this as an if statement
                    if            A   =    B                {do this}                     else {}*/}

                {this.state.userType === "patient" ? <li><img src={patProfile} alt="patProfile" className="profile"/></li> : null}
                {this.state.userType === "patient" ? <li><h2>{getUser().name}</h2></li> : null}
    
                {this.state.userType === "patient" ? <li><Link to="/PatientHome">Home</Link></li> : null}
                {this.state.userType === "patient" ? <li><Link to="/Profile">Profile</Link></li> : null}
                {this.state.userType === "patient" ? <li><Link to="/PatientPrescriptions">Prescriptions</Link></li> : null}
                {this.state.userType === "patient" ? <li><Link to="/TreatmentPlan">Treatment Plan</Link></li> : null}

                
                {/*Doctor Navigation*/}
                {/*I intend for these logos to turn into the profile pictures of users-just gotta change the source*/}
                {this.state.userType === "doctor" ? <li><img src={docProfile} alt="docProfile" className="profile"/></li> : null}
                {this.state.userType === "doctor" ? <li><h2>{getUser().name}</h2></li> : null}

                {this.state.userType === "doctor" ? <li><Link to="/DoctorHome" >Home</Link></li> : null}
                {this.state.userType === "doctor" ? <li><Link to="/DoctorPrescriptions" >Prescriptions</Link></li> : null}
                {this.state.userType === "doctor" ? <li><Link to="/NewPrescription" >New Prescription</Link></li> : null}
                {this.state.userType === "doctor" ? <li><Link to="/Patients" >Patients</Link></li> : null}

                {/*Pharmacist Navigation*/}

                {this.state.userType === "pharmacist" ? <li><img src={pharmProfile} alt="logoTranSmall" className="profile"/></li> : null}
                {this.state.userType === "pharmacist" ? <li><h2>{getUser().name}</h2></li> : null}
            
                {this.state.userType === "pharmacist" ? <li><Link to="/PharmacistHome">Home</Link></li> : null}
                {this.state.userType === "pharmacist" ? <li><Link to="/ReadScript">Load Prescriptions</Link></li> : null}
                {this.state.userType === "pharmacist" ? <li><Link to="/PatientClinicalData">Patient Clinical</Link></li> : null}


                
                {/* Common */}
                {this.state.userType !== "" ? <Log onClick={() => this.logout()}><Link to="/">Log Out <br/><img src={homeIcon} alt="homeIcon" className="house"/></Link></Log> : null}


            </ul>
        
        </div>
    )}
}

export default NavBar
