import Axios from 'axios';
import React from 'react'
import {Link, Navigate} from "react-router-dom"
import { getUser } from '../App';


class PatientPrescriptions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userType: "",
      list: [],
      user: null
    };

  }

  //for testing
  loadData(){

    {/* NEED TO IMPLEMENT FUNCTIONALITY TO GET BACKEND HERE*/}

    {/* Fore each prescription push it to the list*/}

    this.state.list.push({id: 0,
    Date: 1,
    Doctor: 'vgislason@yahoo.com',
    Medicine: 'Vanessa',
    Dosage: "twice a day",
    TreatmentInstruction: "looking for things for a long time"})

    this.state.list.push({id: 1,
      Date: 2,
      Doctor: 'bongos',
      Medicine: 'Randy',
      Dosage: "bonckles",
      TreatmentInstruction: "gatesworth"})
    
  }

  componentDidMount = () =>{
    //TEMPORARY, NEEDS TO BE UPDATED TO ONLY GET CURRENT PATIENTS PRESCRIPTIONS

    const user = getUser();
    const userID = user.userID;

    //console.log(user.userId);

    Axios.get("http://localhost:8080/Prescription").then(resp => {
      this.setState({list: resp.data});
      console.log(resp.data);
    })
  }

  searchPrescription(){

    //inspired by https://www.w3schools.com/howto/howto_js_filter_lists.asp
    var input, filter, ul, listData, li ,txtValue;

    //get all elements from the page
    input = document.getElementById('prescriptionSearch');
    filter = input.value.toUpperCase();
    ul = document.getElementById("prescriptionList");
    li = ul.getElementsByTagName("li");

    //for each list item of the list
    for (var i = 1; i < li.length; i++){
      
      //get all div elements inside list element
      var divs = li[i].getElementsByTagName("div");
      for (var j = 0; j < divs.length; j++){
        //get the data from the div
        listData = divs[j];
        //add the text inside th div to the text value
        txtValue += listData.textContent || listData.innerText;
      }
      
      
      //make the text value uppercase for comparison
      if (txtValue.toUpperCase().indexOf(filter) > -1){
        //if its not found hide the element
          li[i].style.display ="";
      }else{
        //if the substring is found show it
          li[i].style.display ="none";
      }

      //reset the text value
      txtValue = "";
      
    }

    
  }

  render(){
  return (
    
    <div className='main'>
      {/* route to sign in if no user type*/}

      <h2>PRESCRIPTIONS GO ERE</h2>
      <p>Hi how you doin?</p>

      <input type="text" id="prescriptionSearch" className='searchBox' onKeyUp={this.searchPrescription} placeholder="Search prescriptions..."></input>
      <br/>

      <ul className='prescriptionList' id="prescriptionList">
        
          <li className="prescriptionListItem">
              <div>Date</div>
              <div>Doctor</div>
              <div>Medicine</div>
              <div>Dosage</div>
              <div>Repeat Dispesnses</div>
              <div>Treatement Instructions</div>
          </li>

        {this.state.list.map(item => (
            <li key={item.prescriptionId} className="prescriptionListItem">
              <div>{/*item.Date*/} TBD</div>
              <div>{/*item.Doctor*/}TBD</div>
              <div>{item.medicine}</div>
              <div>{item.dosage}</div>
              <div>{item.repeats}</div>
              <div>{/*item.TreatmentInstruction*/}TBD</div>
           </li>
          ))}
      </ul>

     

      
    </div>
  )}
}

export default PatientPrescriptions

