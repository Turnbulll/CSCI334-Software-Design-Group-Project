import React, { useState} from 'react'
import { getUser } from '../App';
import FormAllergies from './formAllergies';
import FormMedication from './formMedication';
import FormOver from './formOver';
import FormPhysical from './formPhysical';
import Axios from 'axios';

function Form()  {
    const[step, setStep]= useState(0);
    const [formData, setFormData]=useState({
        allergies: "",
        medication: "0000000",
        physical: "",
        over: ""
    });

    const FormTitles=["Allergies", "Medication", "Physical Condition", "Over the counter"];

    const StepDisplay = () => {
        if (step === 0) {
            return <FormAllergies formData={formData} setFormData={setFormData}/>;
        }
        else if (step === 1) {
            return <FormMedication />;
        }
        else if (step === 2) {
            return <FormPhysical formData={formData} setFormData={setFormData}/>;
        }
        else {
            return <FormOver formData={formData} setFormData={setFormData}/>;
        }
    }

    const SaveData = () =>{
        var treatmentID = getUser().treatment.treatmentId;
        var allergy = formData.allergies;
        var physical = formData.physical;
        
        //send data to backend
        Axios.put("http://localhost:8080/Treatment/Allergy?treatmentId="+treatmentID+"&allergy="+allergy).then(
            resp => {
                console.log(resp.data);
            }
        )
        
        //send data to backend
        Axios.put("http://localhost:8080/Treatment/PhysicalCondition?treatmentId="+treatmentID+"&physicalCondition="+physical).then(resp => {
            console.log(resp.data);
        });
    }



    return(
        <div className="profileForm">
            <div className="progressbar">
                <div style={{width: step === 0 ? "25%" : step === 1 ? "50%" : step === 2 ? "75%" :"100%"}}></div>
            </div>
            <div className="form-container">
            <div className="header">
                    <h1>{FormTitles[step]}</h1>
                </div>

                <div className="body">
                    <p>{StepDisplay()}</p>
                </div>

                <div className="footer">
                    <button disabled={step===0}
                        onClick={()=>{
                            setStep((currStep)=>currStep-1);
                        }}>Prev
                    </button>
                    <button 
                        onClick={()=>{
                            if (step===FormTitles.length-1) {
                                alert("FORM SUBMITTED FOR REVIEW");
                                /*this will update the data - please note medication is not complete yet*/
                                //HIDE THE FORM
                                document.dispatchEvent(new Event("hideForm"));
                                SaveData();

                                console.log(formData);
                            } else {
                                setStep((currStep)=>currStep+1);
                            }
                            
                        }}>{step===FormTitles.length-1?"Submit":"Next"}
                    </button>
                </div>
            </div>
                
        </div>
    )
}

export default Form