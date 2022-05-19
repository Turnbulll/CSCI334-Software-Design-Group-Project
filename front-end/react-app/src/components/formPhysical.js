import React from 'react'
function FormPhysical({formData,setFormData})  {
    return(
        <div className="formAllergies">
            Physical Condition:
            <input type='text' placeholder="physical condition.."value={formData.physical} 
            onChange={(event)=>setFormData({...formData, physical: event.target.value})}></input>
        </div>
    )
}

export default FormPhysical