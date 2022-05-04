import React from 'react'

class NewPrescription extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      date: ""
    };

  }


  sendToBackEnd(){
    /* get user by frist name last name OR ID can change later*/
    //Kaleb saving link for later: https://reactjs.org/docs/forms.html


  }
  
  render(){
  return (
    <div className='form'>

    


      <h1>New Prescription</h1>

      <form className='form'>

                    <label>First Name:</label>
                    <input type="text" name="FirstName" />

                    <label>Last Name:</label>
                    <input type="text" name="LastName" />

                    <label>Date:</label>
                    <input type="date" name="date" id="todaysDate" />

                    <label>Medication:</label>
                    <input type="text" name="Medication" />

                    <label>Dosage:</label>
                    <input type="text" name="Dosage" />

                    <label>Instructions:</label>
                    <input type="text" name="Instructions" />

                    
                </form>

                <button onClick={this.sendToBackEnd}>Submit</button>
                
    </div>
  )}
}

export default NewPrescription
