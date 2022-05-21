import Axios from 'axios';
import React from 'react'
import Modal from 'react-overlays/Modal'

class NewPrescription extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      valid: false,
      prescription: null,
      treatment: null,
      QRCode:null,
      name:null,
      errorPopUp: false,
      error: "",
      inputPopup: false,
      savedPopup: false

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
                     conflicts: []}

    var name = document.getElementById("PatientName").value;
    this.setState({name:name});
    //not currently being sent to backend
    
    var instructions_  = document.getElementById("Instructions").value;
    var date_ = document.getElementById("todaysDate").value;

    if (medicine_ === "" || dosage_ === "" || repeats_ === "" || name === "" || instructions_ === "" || date_ === ""){
      console.log("MISSING INPUT");
      this.toggleInputAlert();
      return;
    }



    const prescription_ = {
      prescriptionId: null,
      medicine: medicine_,
      dosage: dosage_,
      repeats: repeats_,
      treatment : null
    };

    this.setState({prescription: prescription_, treatment: treatment_});

    //console.log(this.state.valid);
    this.saveData(prescription_, name);
  }

 
  saveData(prescription, name){
    //console.log("LOL")

     Axios.post("http://localhost:8080/Prescription/New", prescription).then(resp => {
      const scriptID = resp.data.prescriptionId;

      //console.log("Script made");
      //console.log("TOTO: " + resp.data.prescriptionId);

      this.setState({prescription: resp.data});

      this.linkPatientPrescription(name, scriptID);
      
 
      //console.log(resp)
      }).catch(err => {console.log(err);});
  
  }

  linkPatientPrescription = (name, scriptID) => {

    Axios.get("http://localhost:8080/Patient/Name?name="+name).then(resp => {
      const userID = resp.data[0].userId;
    
      Axios.put("http://localhost:8080/Patient/AddPrescription/"+ userID +"?prescriptionId="+scriptID).then(resp => {
        //check if prescription can be added
        //console.log(resp);
        this.clearInput();
    
        //send alert
        this.toggleSavedPopup();

      }).catch(err => {
        console.log(err);
        console.log("error linking");
        //send alert
        this.toggleErrorAlert("Contraindiction Error. Cannot Assign Patient Prescription. \nPatient may be allergic or currently taking a conflicting medicine");

      })

    }).catch(err =>{
      //send alert
      this.toggleErrorAlert("Patient Not Found");
    })
  }

  //clears the user input
  clearInput(){
    document.getElementById("Medication").value = "";
    document.getElementById("Dosage").value = "";
    document.getElementById("Repeats").value = "";
    document.getElementById("PatientName").value = "";
    document.getElementById("Instructions").value = "";
    document.getElementById("todaysDate").value = "";
  }

  toggleErrorAlert = (error) =>{
    this.setState({errorPopUp: !this.state.errorPopUp,
                    error: error})
  }

  toggleInputAlert = () =>{
    this.setState({inputPopup: !this.state.inputPopup})
  }

  toggleSavedPopup = () =>{
    this.setState({savedPopup: !this.state.savedPopup});
  }
  
  render(){
  return (
    <div className='form'>
     

      <h1>New Prescription</h1>

      <form className='form'>

                    <label>Patient Name:</label>
                    <input type="text" id="PatientName" />

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

            <Modal show={this.state.errorPopUp}>
              <div className='popup'>
                <h2 className='centerText'>ERROR</h2>
                <p className='centerText'>{this.state.error}</p>
                <button onClick={this.toggleErrorAlert.bind(this, "")} className='blueButton'>Ok</button>
              </div>
            
            </Modal>

            <Modal show={this.state.inputPopup}>
              <div className='popup'>
                <h2 className='centerText'>Missing Input</h2>
                <button onClick={()=> this.toggleInputAlert("")} className='blueButton'>Ok</button>
              </div>
            </Modal>

            <Modal show={this.state.savedPopup}>
              <div className='happyPopup'>
                <h2 className='centerText'>Prescription Saved</h2>
                <button onClick={this.toggleSavedPopup} className='blueButton'>Ok</button>
              </div>
            </Modal>
                
    </div>
  )}
}

export default NewPrescription
