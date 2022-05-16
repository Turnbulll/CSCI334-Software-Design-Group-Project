import React from 'react'
import {Link, Navigate} from "react-router-dom"
import {getUser, setUser} from "../App.js"
import styled from 'styled-components' 
import logoBlack from '../imgs/logoBlack.png'

{/*styled components for making looks look nicer*/}
const Logo = styled.img`
    width: 50vw;
    object-fit: contain;
    opacity: 50%;
    padding-top: 50vh;
`

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
      

      
      <Logo src={logoBlack} alt="logoTranSmall"></Logo>

      
    </div>
  )}
}

export default PatientHome

