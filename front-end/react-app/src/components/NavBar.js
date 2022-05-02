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

    render(){
    return (
        <div>
            {/*listens for user to be logged in */}
            {document.addEventListener("loggedInPatient", () => {
                    this.setState({ userType: "patient" });
                    this.updateState("patient")
		        })}

            <ul className="navBar">
                {/*load navbar component based on state*/}
                {this.state.userType === "" ? <li><Link to="/">Sign In</Link></li> : null}
                {this.state.userType === "" ? <li><Link to="/">Sign Up</Link></li> : null}

                {this.state.userType === "patient" ? <li><Link to="/home">Home</Link></li> : null}
                {this.state.userType === "patient" ? <li><Link to="/about">About</Link></li> : null}

            </ul>
        
        </div>
    )}
}

export default NavBar
