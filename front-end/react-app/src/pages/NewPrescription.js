import Axios from 'axios';
import React from 'react'

class NewPrescription extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      valid: false,
      prescription: null,
      treatment: null,
      QRCode:null,
      name:null

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

    var name = document.getElementById("PatientName").value;
    this.setState({name:name});
    //not currently being sent to backend
    
    var instructions_  = document.getElementById("Instructions").value;
    var date_ = document.getElementById("todaysDate").value;

    if (medicine_ === "" || dosage_ === "" || repeats_ === "" || name === "" || instructions_ === "" || date_ === ""){
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

    this.setState({prescription: prescription_, treatment: treatment_});

    //console.log(this.state.valid);
    this.saveData(prescription_, treatment_, name);
  }

 
  saveData(prescription, name){
    //console.log("LOL")

     Axios.post("http://localhost:8080/Prescription/New", prescription).then(resp => {
      const scriptID = resp.data.prescriptionId;

      //console.log("Script made");
      //console.log("TOTO: " + resp.data.prescriptionId);

      this.setState({prescription: resp.data});

      this.linkPatientPrescription(name, scriptID);
      
      //GENERATE QRCODE
          Axios.post("http://localhost:8080/QR", {id: scriptID}, { responseType: 'arraybuffer' }).then(resp =>{
              //console.log(resp);
              this.setState({test: resp.data});
              //console.log("QR MADE");

              //convert data to image
              const blob = new Blob([resp.data])

              //get image url
              var image = URL.createObjectURL(blob);
              //console.log(image);

              this.setState({QRCode: image});
    
          }).catch(err => {console.log(err.data)})

      
        
    
 
      //console.log(resp)
      }).catch(err => {console.log(err);});

     //reset variables
    document.getElementById("Medication").value = "";
    document.getElementById("Dosage").value = "";
    document.getElementById("Repeats").value = "";
    document.getElementById("PatientName").value = "";
    document.getElementById("Instructions").value = "";
    document.getElementById("todaysDate").value = "";

  
  }

  linkPatientPrescription(name, scriptID){
    //Axios.put("http://localhost:8080/Patient/AddPrescription/7?prescriptionId=13").then(resp => {
       // console.log(resp.data);
    //});

    Axios.get("http://localhost:8080/Patient/Name?name="+name).then(resp => {
      const userID = resp.data[0].userId;
      Axios.put("http://localhost:8080/Patient/AddPrescription/"+ userID +"?prescriptionId="+scriptID).then(resp => {
        console.log(resp.data);
      })

    })

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
                
                 {/*RENDERS QR CODE */}
                  <img src={this.state.QRCode} className="span2"></img>
                
    </div>
  )}
}

export default NewPrescription
