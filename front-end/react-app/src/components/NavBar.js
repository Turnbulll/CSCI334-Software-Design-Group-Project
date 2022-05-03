import React from 'react'
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

            <ul className="navBar">
                {/*load navbar component based on state*/}

                {/*if usertype null render signin and signup*/}
                {this.state.userType === "" ? <li><Link to="/">Sign In</Link></li> : null}
                {this.state.userType === "" ? <li><Link to="/SignUp">Sign Up</Link></li> : null}
                
                {/*Patient*/}
                {/*Imagine this as an if statement
                    if            A   =    B                {do this}                     else {}*/}
                {this.state.userType === "patient" ? <li><Link to="/PatientHome">Home</Link></li> : null}
                {this.state.userType === "patient" ? <li><Link to="/Profile">Profile</Link></li> : null}
                {this.state.userType === "patient" ? <li><Link to="/PatientPrescriptions">Prescriptions</Link></li> : null}

                
                {/*Doctor Navigation*/}
                {this.state.userType === "doctor" ? <li><Link to="/DoctorHome">Home</Link></li> : null}
                {this.state.userType === "doctor" ? <li><Link to="/DoctorPrescriptions">Prescriptions</Link></li> : null}
                {this.state.userType === "doctor" ? <li><Link to="/NewPrescription">New Prescription</Link></li> : null}
                {this.state.userType === "doctor" ? <li><Link to="/Patients">Patients</Link></li> : null}

                {/*Pharmacist Navigation*/}


                
                {/* Common */}
                {this.state.userType !== "" ? <li onClick={() => this.logout()}><Link to="/">Log Out</Link></li> : null}


            </ul>
        
        </div>
    )}
}

export default NavBar
