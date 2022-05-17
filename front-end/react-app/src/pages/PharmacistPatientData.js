import Axios from 'axios';
import React from 'react'

class PharmacistPatientData extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {user: null,
                      allergies: [],
                      reactions: [],
                      medicines: [],
                      treatment: null};

      }

      getPatientData = () =>{

        var patientName = document.getElementById("name").value;

        if (patientName === ""){
            return;
        }

        Axios.get("http://localhost:8080/Patient/Name?name=" + patientName).then(resp =>{
            console.log(resp);
            const treatment = resp.data[0].treatment;
            const allergies = treatment.allergies;
            const reactions = treatment.reactions;
            const medicines = treatment.medicines;

            console.log(allergies, reactions, medicines);

            this.setState({user: resp.data[0], 
                treatment: treatment, 
                allergies: allergies, 
                medicines: medicines,
                reactions: reactions});
        })


      }

      addAlergy = () =>{

        if (this.state.treatment === null){
          return;
        }

        const treatmentId = this.state.treatment.treatmentId;
        
        var allergy = document.getElementById("allergy").value;

        if (allergy === ""){
          return;
        }

        Axios.put("http://localhost:8080/Treatment/Allergy?treatmentId="+treatmentId+"&allergy="+allergy).then(
          resp => {
            console.log(resp);
            this.getPatientData();
          }
        );


        document.getElementById("allergy").value = "";
      }

      addReaction = () =>{
        if (this.state.treatment === null){
          return;
        }

        const treatmentId = this.state.treatment.treatmentId;
        
        var reaction = document.getElementById("reaction").value;

        if (reaction === ""){
          return;
        }

        Axios.put("http://localhost:8080/Treatment/Reaction?treatmentId="+treatmentId+"&reaction="+reaction).then(
          resp => {
            console.log(resp);
            this.getPatientData();
          }
        );


        document.getElementById("reaction").value = "";
      }


  
    render(){return (
    <div className='main'>

      <h2>Patient Clinical Data</h2>
      <div className='form'>
          <form className='form'>
            <label>Patient:</label>
            <input type="text" id="name" />
          </form>
              <button className='blueButton' onClick={this.getPatientData}>Submit</button>
      
      </div>

      <br/>
      <br/>
      <div className='smallScrollDiv'>
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
      <button className='blueButton' onClick={this.addReaction}>Add REaction</button>
      </div>

    </div>
  )}
}

export default PharmacistPatientData
