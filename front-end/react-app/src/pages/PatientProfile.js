import { render } from '@testing-library/react'
import {getUser, setUser} from '../App.js'
import React from 'react'
class PatientProfile extends React.Component {
  componentWillMount = () =>{
    this.setState({user: getUser()})
}
  render(){
  return (
    <div className='main'>
      <h1>X's Profile</h1>
      {/*format rows and columns so it looks better*/}
      <div>{this.state.user.name}</div>
      <table>
        <label>allergies:</label>
        <input type="text" name="user" id="user" />
        <label> medication taking records:</label>
        <input type="text" name="user" id="user" />
        {/*how are we recording different types of medicine? list?*/}
        <label> over the counter medication:</label>
        <input type="text" name="user" id="user" />
        <label> description of physical condition:</label>
        <input type="text" name="user" id="user" />
        
      </table>
    </div>
  )
  }
}

export default PatientProfile
