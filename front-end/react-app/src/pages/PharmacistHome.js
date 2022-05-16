import React from 'react'
import styled from 'styled-components' 
import logoBlack from '../imgs/logoBlack.png'

{/*styled components for making looks look nicer*/}
const Logo = styled.img`
    width: 50vw;
    object-fit: contain;
    opacity: 50%;
    padding-top: 50vh;
`

class PharmacistHome extends React.Component{





  render(){
    return (
        <div class="main">
            <Logo src={logoBlack} alt="logoTranSmall"></Logo>   


        </div>
  )}

}

export default PharmacistHome
