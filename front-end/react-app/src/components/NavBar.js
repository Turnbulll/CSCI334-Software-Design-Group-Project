import React from 'react'
import logoTranSmall from '../logoTranSmall.png';
import homeIcon from '../homeIcon.png';
import { Link, NavLink } from "react-router-dom";

class NavBar extends React.Component{

    constructor(props) {
		super(props);
		this.state = {
			userType: ""
		};

    
	}
    

    componentDidMount() {
        console.log(this.state.userType);
	}

    updateState(type){
        this.setState({ userType: type });
        console.log("NAVBAR: " + this.state.userType);
    }

    logout(){
        console.log("TEST");
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
                    this.updateState("patient")
		        })}

            {/*listens for docotor to be logged in */}
            {document.addEventListener("loggedInDoctor", () => {
                    this.setState({ userType: "doctor" });
                    this.updateState("doctor")
		        })}

            {/*listens for pharmacist to be logged in */}
            {document.addEventListener("loggedInPharmacist", () => {
                    this.setState({ userType: "pharmacist" });
                    this.updateState("pharmacist")
		        })}

            {/*styling listed here*/}
            
            <ul className="navBar">
                
                {/*load navbar component based on state*/}

                
                {/*if usertype null render signin and signup*/}
                {this.state.userType === "" ? <li><img src={logoTranSmall} className="profile"/></li> : null}
                {this.state.userType === "" ? <li><h2>Welcome</h2></li> : null}
                {this.state.userType === "" ? <li><Link to="/" >Sign In</Link></li> : null}
                {this.state.userType === "" ? <li><Link to="/SignUp" >Sign Up</Link></li> : null}
                
                {/*Patient*/}
                {/*Imagine this as an if statement
                    if            A   =    B                {do this}                     else {}*/}

                {this.state.userType === "patient" ? <li><img src={logoTranSmall} className="profile"/></li> : null}
                {this.state.userType === "patient" ? <li><h2>Patient Name</h2></li> : null}
    
                {this.state.userType === "patient" ? <li><Link to="/PatientHome">Home</Link></li> : null}
                {this.state.userType === "patient" ? <li><Link to="/Profile">Profile</Link></li> : null}
                {this.state.userType === "patient" ? <li><Link to="/PatientPrescriptions">Prescriptions</Link></li> : null}
                {this.state.userType === "patient" ? <li><Link to="/TreatmentPlan">Treatment Plan</Link></li> : null}

                
                {/*Doctor Navigation*/}
                {/*I intend for these logos to turn into the profile pictures of users-just gotta change the source*/}
                {this.state.userType === "doctor" ? <li><img src={logoTranSmall} className="profile"/></li> : null}
                {this.state.userType === "doctor" ? <li><h2>Doctor Name</h2></li> : null}
                {this.state.userType === "doctor" ? <li><Link to="/DoctorHome" >Home</Link></li> : null}
                {this.state.userType === "doctor" ? <li><Link to="/DoctorPrescriptions" >Prescriptions</Link></li> : null}
                {this.state.userType === "doctor" ? <li><Link to="/NewPrescription" >New Prescription</Link></li> : null}
                {this.state.userType === "doctor" ? <li><Link to="/Patients" >Patients</Link></li> : null}

                {/*Pharmacist Navigation*/}

                {this.state.userType === "pharmacist" ? <li><img src={logoTranSmall} className="profile"/></li> : null}
                {this.state.userType === "pharmacist" ? <li><h2>Pharmacist Name</h2></li> : null}
            
                {this.state.userType === "pharmacist" ? <li><Link to="/PharmacistHome">Home</Link></li> : null}
                {this.state.userType === "pharmacist" ? <li><Link to="/ReadScript">Load Prescriptions</Link></li> : null}
                {this.state.userType === "pharmacist" ? <li><Link to="/PatientClinicalData">Patient Clinical</Link></li> : null}


                
                {/* Common */}
                {this.state.userType !== "" ? <li className="spacer"></li> : null}
                {this.state.userType !== "" ? <li onClick={() => this.logout()}><Link to="/">Log Out <br/><img src={homeIcon} alt="homeIcon"/></Link></li> : null}


            </ul>
        
        </div>
    )}
}

export default NavBar
