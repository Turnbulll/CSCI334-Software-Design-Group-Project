import React from 'react'
function FormAllergies({formData,setFormData})  {
    return(
        <div className="formAllergies">
            Allergies:
            <input type='text' placeholder="allergies.." value={formData.allergies} 
            onChange={(event)=>setFormData({...formData, allergies: event.target.value})}></input>
        </div>
    )
}

export default FormAllergies