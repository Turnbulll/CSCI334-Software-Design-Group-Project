import Axios from 'axios';
import React from 'react'

class NewPrescription extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      valid: false,
      prescription: null

    };


  }


  checkValidInput = () =>{
     //get user input
    //gets sent to backend
    var medicine_ = document.getElementById("Medication").value;
    var dosage_ = document.getElementById("Dosage").value;
    var repeats_ = document.getElementById("Repeats").value;

    var treatment_ = {treatmentId: null,
                     allergies: [],
                     reactions: []}

    //not currently being sent to backend
    var firstName_ = document.getElementById("FirstName").value;
    var lastName_ = document.getElementById("LastName").value;
    var instructions_  = document.getElementById("Instructions").value;
    var date_ = document.getElementById("todaysDate").value;

    if (medicine_ === "" || dosage_ === "" || repeats_ === "" || firstName_ === "" || lastName_ === "" || instructions_ === "" || date_ === ""){
      console.log("MISSING INPUT");
      return;
    }
    const prescription_ = {
      prescriptionId: null,
      medicine: medicine_,
      dosage: dosage_,
      repeats: repeats_,
      treatment : null
    };

    this.setState({valid:true, prescription: prescription_});

    //console.log(this.state.valid);
  }

 
  saveData(){
    console.log("LOL");

    const prescription = this.state.prescription;
    /*
    Axios.post("http://localhost:8080/Treatment/New?", { "treatmentId": null,
    "allergies": null,
    "reactions": null}).catch(err => {console.log(err);});*/
    
    Axios.post("http://localhost:8080/Prescription/New", prescription).then(resp => {
                            console.log(resp)
                          }).catch(err => {console.log(err);});

    //reset variables
    document.getElementById("Medication").value = "";
    document.getElementById("Dosage").value = "";
    document.getElementById("Repeats").value = "";
    document.getElementById("FirstName").value = "";
    document.getElementById("LastName").value = "";
    document.getElementById("Instructions").value = "";
    document.getElementById("todaysDate").value = "";
  }
  
  render(){
  return (
    <div className='form'>

    


      <h1>New Prescription</h1>

      <form className='form'>

                    <label>First Name:</label>
                    <input type="text" id="FirstName" />

                    <label>Last Name:</label>
                    <input type="text" id="LastName" />

                    <label>Date:</label>
                    <input type="date"  id="todaysDate" />

                    <label>Medication:</label>
                    <input type="text" id="Medication" />

                    <label>Dosage:</label>
                    <input type="number" id="Dosage" min={0.1} />

                    <label>Repeats:</label>
                    <input type="number" id="Repeats" min={1} />

                    <label>Instructions:</label>
                    <input type="text" id="Instructions" />

                    
                </form>

                <button onClick={this.checkValidInput}>Submit </button>
                {this.state.valid ? this.saveData() : console.log("FASLE")}
                
    </div>
  )}
}

export default NewPrescription
