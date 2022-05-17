import React from 'react'

class DoctorPrescriptions extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      userType: "",
      list: []
    };

  }

  loadData(){

    {/* NEED TO IMPLEMENT FUNCTIONALITY TO GET BACKEND HERE*/}

    {/* Fore each prescription push it to the list*/}

    this.state. list.push({id: 0,
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
      {/* load data from backend */}
      {this.loadData()}

      <h1>Prescriptions For Docoter</h1>

      <input type="text" id="prescriptionSearch" className='searchBox' onKeyUp={this.searchPrescription} placeholder="Search prescriptions..."></input>
      <br/>
      <div className='almostFullScrollDiv'>
        <ul className='prescriptionList' id="prescriptionList">
          
            <li className="doctorPrescriptionListItem">
                <div>ID</div>
                <div>Date</div>
                <div>Doctor</div>
                <div>Medicine</div>
                <div>Dosage</div>
                <div>Treatement Instructions</div>
            </li>
    
          {this.state.list.map(prescription => (
              <li key={prescription.id} className="doctorPrescriptionListItem">
                <div>{prescription.id}</div>
                <div>{prescription.Date}</div>
                <div>{prescription.Doctor}</div>
                <div>{prescription.Medicine}</div>
                <div>{prescription.Dosage}</div>
                <div>{prescription.TreatmentInstruction}</div>
             </li>
            ))}
        </ul>
      </div>

    </div>
  )}
}

export default DoctorPrescriptions
