import { render } from '@testing-library/react'
import React from 'react'
/*
		
		{working on patient page being not broken - leaving the other ones bc this is an experiment:P}
    {this.state.userType === "Patient" ? <Link to={{
      pathname: "/PatientHome",
      state: {props}
  }} 
  /> : null }
*/
class PatientProfile extends React.Component {
  render(){
  return (
    <div className='main'>
      <h1>X's Profile</h1>
      {/*format rows and columns so it looks better*/}
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
