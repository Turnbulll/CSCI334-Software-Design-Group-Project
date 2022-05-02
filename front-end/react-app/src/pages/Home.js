import React from 'react'
import {Link, Navigate} from "react-router-dom"

class Home extends React.Component {

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
  return (
  
    <div className='home'>
      {/* route to sign in if no user type*/}
      

      THIS IS HOME
      
      <p>Hi how you doin?</p>

      
    </div>
  )}
}

export default Home

