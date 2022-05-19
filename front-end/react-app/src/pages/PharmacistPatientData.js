import Axios from 'axios';
import React from 'react'

class PharmacistPatientData extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {user: null,
                      allergies: [],
                      reactions: [],
                      medicines: [],
                      treatment: null,
                      errorText: ""

        }
                 

      }

      //gets the patient data
      getPatientData = () =>{

        //get name from input
        var patientName = document.getElementById("name").value;

        //check name not empty
        if (patientName === ""){
            this.setErrorText("Missing Patient Input");
           // this.setState({errorText: "HEEHEHE"});
            return;
        }

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
            const reactions = treatment.reactions;
            const medicines = treatment.medicines;

            //console.log(allergies, reactions, medicines);
            //set treatment data in state
            this.setState({user: resp.data[0], 
                treatment: treatment, 
                allergies: allergies, 
                medicines: medicines,
                reactions: reactions});
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
            this.getPatientData();
          }
        );

          //empty the value
        document.getElementById("allergy").value = "";
      }

      //adds a reaction to the patient
      addReaction = () =>{
        //check patient has been got
        if (this.state.treatment === null){
          this.setErrorText("Missing Patient Input");
          return;
        }

        //get id and value for UI
        const treatmentId = this.state.treatment.treatmentId;
        
        var reaction = document.getElementById("reaction").value;

        //if ui empty show error
        if (reaction === ""){
          this.setErrorText("Missing Reaction Input");
          return;
        } 

        //add reaction to backend data
        Axios.put("http://localhost:8080/Treatment/Reaction?treatmentId="+treatmentId+"&reaction="+reaction).then(
          resp => {
            console.log(resp);
            this.getPatientData();
          }
        );

          //empty the ui
        document.getElementById("reaction").value = "";
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
              <button className='blueButton' onClick={this.getPatientData}>Submit</button>


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
            <h3 className='center'>Reactions</h3>
            
            <ul>
            {this.state.reactions.map(item => (
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
        
      <form className='form'>
        <label>Reaction:</label>
        <input type="text" id="reaction" />
      </form>
      <button className='blueButton' onClick={this.addReaction}>Add Reaction</button>
      </div>

      </div>
    </div>
  )}
}

export default PharmacistPatientData
