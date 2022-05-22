import Axios from 'axios';
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
    //get all patients from backend
    Axios.get("http://localhost:8080/Patient").then(resp => {
       const patients = resp.data;
       //console.log(resp.data);
       //for each patient
        for (var i = 0; i < patients.length; i++){

          //check if they have any prescriptiosn
          if (patients[i].prescriptions.length === 0){
            continue;
          }

          this.savePatientScripts(patients[i]);
        } 
        //console.log(list);
        //save the list to stat
    });
  }

  //gets prescriptions from patient
  savePatientScripts = (patient) => {
      //for each of their prescriptions
      for (var j = 0; j < patient.prescriptions.length; j++){
        //push a new json object to the list
        
        //get the current prescription. Have to use a temporary variable here because setState is asyncronus
        const prescription = patient.prescriptions[j];
        
        //push the prescription to the state
        this.setState(prevState => ({
                      list: [...prevState.list, { id: (patient.name+"-"+j),  
                      name: patient.name,
                      prescription: prescription}]
        }))
      }
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
      
       //get the data from the div
       listData = divs[0];
       //add the text inside th div to the text value
       txtValue += listData.textContent || listData.innerText;

      //get the data from the div
      listData = divs[1];
      //add the text inside th div to the text value
      txtValue += listData.textContent || listData.innerText;

       //get the data from the div
       listData = divs[3];
       //add the text inside th div to the text value
       txtValue += listData.textContent || listData.innerText;
      
      
      
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

  componentDidMount(){
    this.loadData();
  }
  
  render(){
  return (
    <div className='main'>
      {/* load data from backend */}
      {console.log(this.state.list)}

      <h1>Prescriptions For Doctor</h1>

      <input type="text" id="prescriptionSearch" className='searchBox' onKeyUp={this.searchPrescription} placeholder="Search prescriptions..."></input>
      <br/>
      <div className='almostFullScrollDiv'>
        <ul className='prescriptionList' id="prescriptionList">
          
            <li className="doctorPrescriptionListItem">
                <div>ID</div>
                <div>Patient</div>
                <div>Date</div>
                <div>Medicine</div>
                <div>Dosage</div>
      
            </li>
    
          {this.state.list.map(data => (
              <li key={data.id} className="doctorPrescriptionListItem">
                <div>{data.prescription.prescriptionId}</div>
                <div>{data.name}</div>
                <div>{data.prescription.date}</div>
                <div>{data.prescription.medicine}</div>
                <div>{data.prescription.dosage}</div>
    
             </li>
            ))}
        </ul>
      </div>

    </div>
  )}
}

export default DoctorPrescriptions
