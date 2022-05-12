import Axios from 'axios';
import React from 'react'
import QRReader from '../components/QRReader';


class ReadScript extends React.Component{


    constructor(props) {
		super(props);
		this.state = {
            loaded: false,
            Code: null,
            Date: null,
            Doctor: null,
            Medicine: null,
            Dosage: null,
            TreatmentInstruction: null,
            Dispenses: 2
    
		};

    
	}

    getScript  = (event) => {
        var prescriptionID = document.getElementById("scriptCode").value;

        Axios.get("http://localhost:8080/Prescription/" + prescriptionID).then(resp =>
                {
                    const respData = resp.data;

                    if ((respData.length > 1) === false){
                        //do nothing
                        //console.log("do that");

                        this.setState({
                            loaded: true,
                            Code: respData.prescriptionId,
                            Date: "tbd",
                            Doctor: "tbd",
                            TreatmentInstruction: "TBD",
                            Medicine: respData.medicine,
                            Dosage: respData.dosage,
                            TreatmentInstruction: respData.treatment.description,
                            Dispenses: respData.repeats


                        })

                        

                        //console.log(respData);
                    }

                    
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
            const prescription = {};

            Axios.put("http://localhost:8080/Prescription/"+ this.state.Code + "?repeats=" + (this.state.Dispenses - 1)).then(response => console.log(response.data));;

            this.setState({Dispenses: this.state.Dispenses - 1})
        }

        //update the backend. BACKEND CURRENTLY DOESNT HAVE REPEAT DISPENSES
    }
    
    onNewScanResult = (decodedText, decodedResult) =>{
       // console.log(decodedText);
       // console.log(decodedResult);
       
        document.getElementById("scriptCode").value = decodedText; 
        this.setState({Code:  decodedText});
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

                   {/* QR READER FROM https://github.com/scanapp-org/html5-qrcode-react WE DO NOT CLAIM IT*/}

                   
                <QRReader fps={10}
                qrbox={250}
                disableFlip={false}
                qrCodeSuccessCallback={this.onNewScanResult}/>
           </div>

            <br/>
            <br/>


            {this.state.Code !== null ? this.getScript() : null }
           {this.state.loaded ? this.getElement()  : null}
           
        
        </div>
  )}

}

export default ReadScript
