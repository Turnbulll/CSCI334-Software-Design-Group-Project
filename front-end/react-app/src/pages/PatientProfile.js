import { render } from '@testing-library/react'
import {getUser, setUser} from '../App.js'
import React from 'react'
import Form from "../components/Form";
class PatientProfile extends React.Component {
  componentWillMount = () =>{
    this.setState({user: getUser()})
  }

  componentDidMount(){
    this.hideForm();
  }

  hideForm(){
    document.getElementById("form").style.display = "none";

  }

  showForm(){
    document.getElementById("form").style.display ="";

  }


  /* 
    Patient(String name, String password, String userType, Treatment treatment , List<Prescription> prescriptions)
    Treatment(ArrayList<String> allergies, ArrayList<String> reactions, ArrayList<String> medicines, String physicalCondition)
    Prescription(String medicine, Float dosage, int repeats)
  */
  render(){
    /*kaleb help here pls */
    var vis=false;
  return (
    <div className='PatientProfile'>


    {document.addEventListener("hideForm", () => {
                  this.hideForm();
		        })}

      <h1>{this.state.user.name}'s Profile</h1>
      <h2>Current Data:</h2>
      <table class='dataTable' id="dataTable">
        <tr>
          <td>allergies:</td>
          <td>{this.state.user.treatment.allergies[0]}</td>
        </tr>
        <tr> 
          <td>medication taking records:</td>
          <td>THIS WEEK
            <table className='thisweek'>
                <tr>
                    <td>mon<input type='checkbox'></input></td>
                    <td>tue<input type='checkbox'></input></td>
                    <td>wed<input type='checkbox'></input></td>
                    <td>thu<input type='checkbox'></input></td>
                    <td>fri<input type='checkbox'></input></td>
                    <td>sat<input type='checkbox'></input></td>
                    <td>sun<input type='checkbox'></input></td>
                </tr>
            </table>
          </td>
        </tr>
        <tr> 
          <td>over the counter medication:</td>
          <td>{this.state.user.prescriptions.medicine}x{this.state.user.prescriptions.repeats}</td>
        </tr>
        <tr> 
          <td>description of physical condition:</td>
          <td>{this.state.user.userType}</td>
        </tr>
        <tr>
          <td><button onClick={this.showForm}>Edit Profile</button></td>
        </tr>
      </table>
      {/*contains form */}
      <table className={'formTable'} id="form">
        <tr>
          <td><Form /></td>
        </tr>
        
      </table>  
    </div>
  )
  }
}

export default PatientProfile
