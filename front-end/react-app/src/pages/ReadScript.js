import Axios from 'axios';
import React from 'react'
import QRReader from '../components/QRReader';


class ReadScript extends React.Component{


    constructor(props) {
		super(props);
		this.state = {
            error: "",
            loaded: false,
            Code: null,
            Date: null,
            Doctor: null,
            Medicine: null,
            Dosage: null,
            TreatmentInstruction: null,
            Dispenses: 2,
            patientID: null
    
		};

    
	}

    getScript  = (event) => {
        //get the script code
        var scriptCode = document.getElementById("scriptCode").value.split('pID');

        //get the prescriptions id
        var prescriptionID = scriptCode[0].replace('mID', '');

        //get the patients id
        var patientID = scriptCode[1];

        console.log("Patient ID", patientID);

        if (patientID === "" || "0"){
            this.setErrorText("Error invalid code");
            return;
        }

        
        Axios.get("http://localhost:8080/Patient/").then(resp => {

            console.log(resp.data);

            if (resp.data === ""){
                this.setErrorText("Error invalid code");
                return;
            }
        })


        Axios.get("http://localhost:8080/Prescription/" + prescriptionID).then(resp =>
                {
                    const respData = resp.data;

                    if (resp.data === ""){
                        this.setErrorText("Error invalid code");
                        return;
                    }

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
                            Dispenses: respData.repeats,
                            patientID: patientID


                        })

                        //console.log(respData);
                    }

                    
                }
            ).catch(error => {this.setErrorText("Error Invalid Id")});

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

            //set the amount of repeats left
            Axios.put("http://localhost:8080/Prescription/"+ this.state.Code + "?repeats=" + (this.state.Dispenses - 1)).then(response => console.log(response.data));;

            var currentCount = this.state.Dispenses - 1;
            this.setState({Dispenses: currentCount})
            //if the prescription is out of repeats remove it from the medicines arary
            if (currentCount === 0){
                this.removeMedicine();
            }
            
        }
            
        //update the backend. BACKEND CURRENTLY DOESNT HAVE REPEAT DISPENSES
    }

    removeMedicine = () =>{
        //removes the medicine from the treatment object
        Axios.put("http://localhost:8080/Patient/RemoveMedicine/"+this.state.patientID+"?medicine="+this.state.Medicine).then(resp => {
            console.log(resp.data)
        })
    }
    
    onNewScanResult = (decodedText, decodedResult) =>{
       // console.log(decodedText);
       // console.log(decodedResult);
        console.log(decodedText);
        var text = decodedText.split("patientID");
        
        decodedText = text[0];
       //split code from qr
        decodedText = decodedText.replace('i', '');
        decodedText = decodedText.replace('d', '');
        decodedText = decodedText.replace(':', '');
        decodedText = decodedText.replace('{', '');
        decodedText = decodedText.replace('}', '');
        decodedText = decodedText.replace(' ', '');
        decodedText = decodedText.replace(',', '');
        decodedText = decodedText.replaceAll('"', '');
   
        var patientID = text[1];
        patientID = patientID.replace(':', '');
        patientID = patientID.replace('}', '');
        patientID = patientID.replace(',', '');
        patientID = patientID.replace('"', '');


        var code = "mID"+decodedText+"pID"+patientID;
        document.getElementById("scriptCode").value = code; 

        this.setState({Code:  code});
        //automatically load script data
        this.getScript();
    }

    setErrorText = (text) => {
        this.setState({error: text});
    }

  render(){

    return (
        <div className="main">
            <div className='almostFullScrollDiv'>
            <h1>READ THE SCRIPT HERE</h1>    
         
            <div className="form">

                <form className='form'>

                    <label>Manual Code:</label>
                    <input type="text" id="scriptCode"/>
                    <div className='errorText'>{this.state.error}</div>
                   
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

           {this.state.loaded ? this.getElement()  : null}
           
           </div>
        </div>
  )}

}

export default ReadScript
