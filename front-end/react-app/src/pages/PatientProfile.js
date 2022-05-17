import { render } from '@testing-library/react'
import {getUser, setUser} from '../App.js'
import React from 'react'
class PatientProfile extends React.Component {
  componentWillMount = () =>{
    this.setState({user: getUser()})
}
  render(){
  return (
    <div className='PatientProfile'>
      <h1>{this.state.user.name}'s Profile</h1>
      <h2>Current Data:</h2>
      <table>
        <li>allergies:
          <p>{this.state.user.userType}</p>
        </li>
        <li> medication taking records:
          <p>{this.state.user.userType}</p>
        </li>
        <li> over the counter medication:
          <p>{this.state.user.userType}</p>
        </li>
        <li> description of physical condition:
          <p>{this.state.user.userType}</p>
        </li>
      </table>
    </div>
  )
  }
}

export default PatientProfile
