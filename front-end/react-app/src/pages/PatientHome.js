import React from 'react'
import {Link, Navigate} from "react-router-dom"
import {getUser, setUser} from "../App.js"

class PatientHome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userType: ""
    };

  }
  componentDidMount(){
    console.log("HOME: " + this.state.userType);
  }


  render(){
    var user = getUser();
  return (
  
    <div className='main'>
      {/* route to sign in if no user type*/}
      

      
      <h2>Welcome Back </h2>
      <p>Hi how you doin?</p>

      
    </div>
  )}
}

export default PatientHome

