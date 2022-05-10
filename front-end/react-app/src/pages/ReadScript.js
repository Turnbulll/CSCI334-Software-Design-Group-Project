import Axios from 'axios';
import React from 'react'


class ReadScript extends React.Component{


    constructor(props) {
		super(props);
		this.state = {
            loaded: false,
            Code: "12345678",
            Date: "12/03/2001",
            Doctor: "Box",
            Medicine: "option3",
            Dosage: "Test Phrase",
            TreatmentInstruction: "Eat it lol",
            Dispenses: 2
    
		};

    
	}

    getScript  = (event) => {
        var prescriptionID = document.getElementById("scriptCode").value;

        Axios.get("http://localhost:8080/Prescription/" + prescriptionID).then(resp =>
                {
                    console.log(resp);
                }
            );

        //this.setState({loaded: true});
    }

    getElement(){
        //Returns a html element that shows the script details
        return <div className='loadedPrescription'>
            <label>Code: {this.state.Code}</label>

            <label>Date: {this.state.Date}</label>
    
            <label>Doctor: {this.state.Doctor}</label>

            <label className='span2'>Medicine: {this.state.Medicine}</label>

            <label className='span2'>Dosage: {this.state.Dosage}</label>

            <label className='span2'>Instructions: {this.state.TreatmentInstruction}</label>
           
            <label>Dispenses: {this.state.Dispenses}</label>

            <button onClick={this.markScriptDispensed}>Dispense</button>
        </div>
    }

    markScriptDispensed = () => {
        console.log("Dispensed LOL");

        if (this.state.Dispenses > 0){
            this.setState({Dispenses: this.state.Dispenses - 1})
        }
    }
    

  render(){



    return (
        <div className="main">
            <h1>READ THE SCRIPT HERE</h1>    
            <div className="form">

                <form className='form'>

                    <label>Manual Code:</label>
                    <input type="text" id="scriptCode"/>
                   
                </form>

                <button onClick={this.getScript}>Submit</button>
           </div>

            <br/>
            <br/>

           {this.state.loaded ? this.getElement()  : null}

        </div>
  )}

}

export default ReadScript
