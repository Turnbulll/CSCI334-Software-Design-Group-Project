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


  
    render(){return (
    <div className='main'>
        <h2>Patient Clinical Data</h2>
      <form className='form'>
        <label>Patient:</label>
        <input type="text" id="name" />
      </form>
      <br/>
      <button className='blueButton' onClick={this.getPatientData}>Submit</button>
      
        
        <h3>Allergies</h3>

        <ul>
            {this.state.allergies.map(item => (
                <li key={item}>{item}</li>
            ))}
        </ul>

        <h3>Reactions</h3>
        {this.state.reactions.map(item => (
                <li key={item}>{item}</li>
            ))}
        <ul>

        </ul>

        <h3>Medicines Taken</h3>
        {this.state.medicines.map(item => (
                <li key={item}>{item}</li>
            ))}
        <ul>

        </ul>


    </div>
  )}
}

export default PharmacistPatientData
