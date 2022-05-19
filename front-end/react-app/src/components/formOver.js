import React from 'react'
function FormOver({formData,setFormData})  {
    return(
        <div className="formAllergies">
            Over the Counter Medication:
            <input type='text' placeholder="type here.."value={formData.over} 
            onChange={(event)=>setFormData({...formData, over: event.target.value})}></input>
        </div>
    )
}

export default FormOver