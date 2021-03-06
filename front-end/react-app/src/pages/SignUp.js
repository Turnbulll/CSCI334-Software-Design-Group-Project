import Axios from 'axios';
import React from 'react'
import { Navigate} from "react-router-dom";


class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {user: "",
                      password: "",
                      userType: "Patient",
                      valid: false,
                      error: ""};
  
      }

    checkCredentials  = (event) => {
        /* CURRENT BUG IF A USER SIGNS UP WITH WRONG INFORMATION, THEN CORRECT INFORMATION IT CREATES 2 IDENTICAL USERS IN DATABASE*/

        //check all inputs have values
            //currently saved in backend
        var email_ = document.getElementById("Email").value;
        var user_ = document.getElementById("name").value;
        var password_ = document.getElementById("Password").value;
        var userType_ = "";

            //currently not saved in backend
        var dob = document.getElementById("DOB").value;
     
        //get all the radio buttons
        var radioButtons = [document.getElementById('Patient'), document.getElementById('Doctor'), document.getElementById('Pharmacist')];

        //get user type from radio buttons
        for (var i = 0; i < radioButtons.length; i++){
            if (radioButtons[i].checked){
                userType_ = radioButtons[i].value;
            }
        }

        //if value missing return
        if (user_ === "" || password_ === "" || email_ === "" || dob === "" || userType_ === ""){
            //,aybe send error notification
            this.callError("Missing Input");
            return;
        }

        //set state
        this.setState({user: user_, password: password_, userType: userType_, email: email_});
        this.checkAlreadyInDB(user_);
    
        
    }

    checkAlreadyInDB(user_){
           //check if account name already exists
          //fetch requests for all user types
          var req1 = Axios.get("http://localhost:8080/Patient/Name?name="+user_);
          var req2 = Axios.get("http://localhost:8080/Doctor/Name?name="+user_);
          var req3 = Axios.get("http://localhost:8080/Pharmacist/Name?name="+user_)
    
            //fetch all the requests
          Axios.all([req1, req2, req3]).then(
                Axios.spread((...responses) => {
                    //get all responses
                      const res1 = responses[0].data;
                      const res2 = responses[1].data;
                      const res3 = responses[2].data;
  
                      //checks user isnt already in database
                      if (res1.length === 0 && res2.length === 0 & res3.length === 0){
                          //if length of all arrays is 0 then user not in databas

                          //console.log("SAVE THE USER");
                            //setup user object
                            const user = {name: this.state.user,
                            password: this.state.password,
                            userType: this.state.userType,
                            email: this.state.email}

                                //post user object to database
                          Axios.post("http://localhost:8080/"+this.state.userType+"/New?", user).then(resp => {
                            //console.log(resp)
                                const userID = resp.data.userId;
                                
                              //if its a patient they need a treatment
                              if (this.state.userType === "Patient"){
                                  //post an empty treatment
                                  var empty = "";
                                    Axios.post("http://localhost:8080/Treatment/New", {
                                        "allergies": [],
                                        "conflicts": [],
                                        "medicines": [],
                                        "physicalCondition": ""
                                    }).then(
                                        resp => {
                                            //get the treatment id
                                            const treatmentID = resp.data.treatmentId;

                                            //link the treatment to the patient
                                            Axios.put("http://localhost:8080/Patient/SetTreatment/"+userID+"?treatmentId="+treatmentID).then(
                                               resp => {
                                                    //console.log("WE DID IT REDDIT");
                                                }
                                            )
                                            
                                        }
                                    );
                              }

                            this.setState({valid: true}); //update the state
                          });
                      }else{
                          //maybe send error/notification
                      }
  
                }))
  
    }

    callError = (txt) =>{
        this.setState({error: txt});
    }



   render(){
       return(
           <div className='form'>
               {/* route to new page on login*/}
               {this.state.valid ? < Navigate to="/"/> : null}

               {/* when state updated call function */}
               {/*this.state.nameTaken ? null : this.saveUser()*/}

                <form className='form'>
                    <h1>Sign Up</h1>

                    <label>UserType:</label>
                    <div className='radioDiv'>
                        <input type="radio" id="Patient" name="userType" value="Patient"/>
                        <label for="Patient">Patient</label><br/>
                        <input type="radio" id="Doctor" name="userType" value="Doctor"/>
                        <label for="Doctor">Doctor</label><br/>
                        <input type="radio" id="Pharmacist" name="userType" value="Pharmacist"/>
                        <label for="Pharmacist">Pharmacist</label><br/>
                    </div>

                    <label>Name:</label>
                    <input type="text" id="name" />

                    <label>Date Of Birth:</label>
                    <input type="Date" id="DOB" />
                    
                    <label>Email:</label>
                    <input type="text" id="Email" />

                    <label>Password:</label>
                    <input type="password" id="Password" />

                    <x className='errorText'>{this.state.error}</x>
                   
                </form>
                <button onClick={this.checkCredentials}>Submit</button>
           </div>
       )
   }
        
}

export default SignUp
