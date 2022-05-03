import React from 'react'
import {Link, Navigate} from "react-router-dom"

class PatientPrescriptions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userType: ""
    };

  }



  render(){
  return (
  
    <div className='main'>
      {/* route to sign in if no user type*/}
      

      
      <h2>PRESCRIPTIONS GO ERE</h2>
      <p>Hi how you doin?</p>

      
    </div>
  )}
}

export default PatientPrescriptions

