import React from 'react'
import {Link, Navigate} from "react-router-dom"
import styled from 'styled-components' 
import logoBlack from '../imgs/logoBlack.png'

{/*styled components for making looks look nicer*/}
const Logo = styled.img`
    width: 50vw;
    object-fit: contain;
    opacity: 50%;
    padding-top: 50vh;
`

class DoctorHome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userType: ""
    };

  }

  componentDidMount(){

    //console.log("HOME: " + this.state.userType);
  }


  render(){
  return (
  
    <div className='main'>
      {/* route to sign in if no user type*/}
      

      
      <Logo src={logoBlack} alt="logoTranSmall"></Logo>

      
    </div>
  )}
}

export default DoctorHome

