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
      oldList: [],
      medicine: null,
      QRCode: null,
      user: null
    };

  }

  componentDidMount = () =>{
    //TEMPORARY, NEEDS TO BE UPDATED TO ONLY GET CURRENT PATIENTS PRESCRIPTIONS

    const user = getUser();
    //const userID = user.userID;

    //console.log(user.userId);

    //get all the users prescriptions
    var prescriptions = user.prescriptions;
    var newList = [];
    var oldList = [];

    //seperate prescriptions into old and new lis
    for (var i =0; i < prescriptions.length; i++){
      if (prescriptions[i].repeats > 0){
        newList.push(prescriptions[i]);
      }else{
        oldList.push(prescriptions[i]);
      }
    }



    this.setState({list: newList,
                  oldList: oldList,
                  user: user});

    console.log(user.prescriptions);

    //Axios.get("http://localhost:8080/Prescription").then(resp => {
     // this.setState({list: resp.data});
      //console.log(resp.data);
    //})

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

  getQR(script){
    //console.log("TEST ", scriptID);

    const scriptID = script.prescriptionId;
    const userId = this.state.user.userId;

    Axios.post("http://localhost:8080/QR", {id: scriptID, patientID:+userId}, { responseType: 'arraybuffer' }).then(resp =>{
    
      //console.log(resp);
      this.setState({test: resp.data});
      //console.log("QR MADE");

      //convert data to image
      const blob = new Blob([resp.data])

      //get image url
      var image = URL.createObjectURL(blob);
      //console.log(image);

      this.setState({QRCode: image, medicine: "FOR: " + script.medicine});

  }).catch(err => {console.log(err.data)})
  }

  render(){
  return (
    
    <div className='main'>
      {/* route to sign in if no user type*/}

      
      <h2>QR CODE {this.state.medicine}</h2>
      <img src={this.state.QRCode} className="span2"></img>

      <h2>Search Prescriptions</h2>

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
              <div>QR</div>
          </li>

        {this.state.list.map(item => (
            <li key={item.prescriptionId} className="prescriptionListItem">
              <div>{/*item.Date*/} TBD</div>
              <div>{/*item.Doctor*/}TBD</div>
              <div>{item.medicine}</div>
              <div>{item.dosage}</div>
              <div>{item.repeats}</div>
              <div>{/*item.TreatmentInstruction*/}TBD</div>
              <div className=''><button onClick={this.getQR.bind(this, item)}>QR CODE </button></div>
           </li>
          ))}
      </ul>

      <br/>
      <br/>
      <h2>Old Prescriptions</h2>
      <ul className='prescriptionList'>
        
          <li className="prescriptionListItemOld">
              <div>Date</div>
              <div>Doctor</div>
              <div>Medicine</div>
              <div>Dosage</div>
              <div>Repeat Dispesnses</div>
              <div>Treatement Instructions</div>
          </li>

        {this.state.oldList.map(item => (
            <li key={item.prescriptionId} className="prescriptionListItemOld">
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

