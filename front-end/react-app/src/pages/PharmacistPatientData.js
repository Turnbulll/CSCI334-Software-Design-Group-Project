import Axios from 'axios';
import React from 'react'

class PharmacistPatientData extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {user: null,
                      allergies: [],
                      conflicts: [],
                      medicines: [],
                      treatment: null,
                      errorText: ""

        }
                 

      }

      checkInput= () =>{
        //get name from input
        var patientName = document.getElementById("name").value;

        //check name not empty
        if (patientName === ""){
            this.setErrorText("Missing Patient Input");
           // this.setState({errorText: "HEEHEHE"});
            return;
        }

        this.getPatientData(patientName);
      }

      //gets the patient data
      getPatientData = (patientName) =>{

        //get the patient by name from backend
        Axios.get("http://localhost:8080/Patient/Name?name=" + patientName).then(resp =>{
            //console.log(resp.data);

            //if no patient was returned show error
            if (resp.data.length === 0){
              this.setErrorText("Ivalid Patient Name");
              return;
            }

            ///get treatment data from patient
            const treatment = resp.data[0].treatment;
            const allergies = treatment.allergies;
            const conflicts = treatment.conflicts;
            const medicines = treatment.medicines;

            //console.log(allergies, conflicts, medicines);
            //set treatment data in state
            this.setState({user: resp.data[0], 
                treatment: treatment, 
                allergies: allergies, 
                medicines: medicines,
                conflicts: conflicts});
        }).catch( error => {

            this.setErrorText("Ivalid Data Or Error contacting database");

        })


      }

      //adds an allergy to the patient
      addAlergy = () =>{

        //check a patient has already been got
        if (this.state.treatment === null){
          this.setErrorText("Missing Patient Input");
          return;
        }

        //get the treatment id
        const treatmentId = this.state.treatment.treatmentId;
        
        //get the allergy from UI
        var allergy = document.getElementById("allergy").value;

        //if input empty show error
        if (allergy === ""){
          this.setErrorText("Missing Allergy Input");
          return;
        }

        //add allergy to backend data
        Axios.put("http://localhost:8080/Treatment/Allergy?treatmentId="+treatmentId+"&allergy="+allergy).then(
          resp => {
            console.log(resp);
            this.checkInput();
          }
        );

          //empty the value
        document.getElementById("allergy").value = "";
      }

      
      //sets the text for the error
      setErrorText = (text) =>{
        //console.log(text);
        this.setState({errorText: text});
        console.log(this.state.errorText);
      }

  
    render(){return (
    <div className='main'>

      <h2>Patient Clinical Data</h2>
      <div className='almostFullScrollDiv'>
  

      <div className='form'>
          <form className='form'>
            <label>Patient:</label>
            <input type="text" id="name" />
          </form>
              <button className='blueButton' onClick={this.checkInput}>Submit</button>


        <div className='errorText'>{this.state.errorText}</div>
      </div>

      <br/>
      <br/>
      
      <div className='dataGrid'>
            <div className='dataGridCol'>
            <h3>Allergies</h3>

            <ul >
                {this.state.allergies.map(item => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        
            </div>


            <div className='dataGridCol'>
            <h3 className='center'>Conflicts</h3>
            
            <ul>
            {this.state.conflicts.map(item => (
                        <li className='center' key={item}>{item}</li>
                    ))}
            </ul>
            </div>

            <div className='dataGridCol'>
            <h3 className='center'>Medicines Taken</h3>
            
            <ul className>
                {this.state.medicines.map(item => (
                                    <li className key={item}>{item}</li>
                                ))}
            </ul>
            </div>
      
      </div>
          
      <br />
      <br />
      <br />

      <h3>Add Medication Effect</h3>
      <div className='form'>

      <form className='form'>
        <label>Allergy:</label>
        <input type="text" id="allergy" />
      </form>
      <button className='blueButton' onClick={this.addAlergy}>Add Allergy</button>
        
      </div>

      </div>
    </div>
  )}
}

export default PharmacistPatientData
