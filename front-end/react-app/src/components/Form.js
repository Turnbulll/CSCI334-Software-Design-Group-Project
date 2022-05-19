import React, { useState} from 'react'
import FormAllergies from './formAllergies';
import FormMedication from './formMedication';
import FormOver from './formOver';
import FormPhysical from './formPhysical';
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