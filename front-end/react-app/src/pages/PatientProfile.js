import { render } from '@testing-library/react'
import {getUser, setUser} from '../App.js'
import React from 'react'
import Form from "../components/Form";
import Axios from 'axios';
class PatientProfile extends React.Component {
  componentWillMount = () =>{
    this.setState({user: getUser()})
    console.log(getUser());
  }

  componentDidMount(){
    this.hideForm();
    this.loadAllergiesList();
    this.loadPhysicalCondition();
  }

  //loads thew allergy list
  async loadAllergiesList(){

    Axios.get("http://localhost:8080/Patient/" + getUser().userId).then(resp => {
      setUser(resp.data);

      var display = document.getElementById("allergiesList");
    var allergies = resp.data.treatment.allergies;
    console.log(allergies);
    var allergyString = ""

    allergies.forEach(element => {
      console.log("check");
      allergyString += element + ", ";
    });

    allergyString = allergyString.substring(0, allergyString.length -2);

    display.innerHTML = allergyString;
    var physicalCon = resp.data.treatment.physicalConditionCondition;

      document.getElementById("physicalCondition").innerHTML = physicalCon;
    })
  }

  loadPhysicalCondition(){
      var physicalCon = getUser().treatment.physicalConditionCondition;

      document.getElementById("physicalCondition").innerHTML = physicalCon;

  }

  hideForm = () => {
    this.loadAllergiesList();
    this.loadPhysicalCondition();
    document.getElementById("form").style.display = "none";
    document.getElementById("dataTable").style.display = "";
  
  }

  showForm(){
    document.getElementById("form").style.display ="";
    document.getElementById("dataTable").style.display = "none";

  }


  /* 
    Patient(String name, String password, String userType, Treatment treatment , List<Prescription> prescriptions)
    Treatment(ArrayList<String> allergies, ArrayList<String> conflicts, ArrayList<String> medicines, String physicalCondition)
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
          <td id="allergiesList"></td>
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
          <td id="physicalCondition"></td>
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
        <tr>
          <button onClick={this.hideForm}>Cancel</button>
        </tr>
        
      </table>  
    </div>
  )
  }
}

export default PatientProfile
