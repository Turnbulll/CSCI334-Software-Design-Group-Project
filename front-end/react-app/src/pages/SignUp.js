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
                      nameTaken: true};
  
      }

    checkCredentials  = (event) => {
        /* CURRENT BUG IF A USER SIGNS UP WITH WRONG INFORMATION, THEN CORRECT INFORMATION IT CREATES 2 IDENTICAL USERS IN DATABASE*/

        //check all inputs have values
            //currently saved in backend
        var user_ = document.getElementById("Email").value;
        var password_ = document.getElementById("Password").value;
        var userType_ = "";

            //currently not saved in backend
        var firstName = document.getElementById("FirstName").value;
        var lastName = document.getElementById("LastName").value;
        var dob = document.getElementById("DOB").value;
     

        //get all the radio buttons
        var radioButtons = [document.getElementById('Patient'), document.getElementById('Doctor'), document.getElementById('Pharmacist')];

        //get user type from radio buttons
        for (var i = 0; i < radioButtons.length; i++){
            if (radioButtons[i].checked){
                userType_ = radioButtons[i].value;
            }
        }

        //console.log(user_);
        //console.log(password_);
        //console.log(firstName);
        //console.log(lastName);
        //console.log(dob);

        //if value missing return
        if (user_ === "" || password_ === "" || firstName === "" || lastName === "" || dob === "" || userType_ === ""){
            //,aybe send error notification
            console.log("MISSING INPUT");
            return;
        }

        //set state
        this.setState({user: user_, password: password_, userType: userType_});
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
  
                      //che3cks user isnt already in database
                      if (res1.length === 0 && res2.length === 0 & res3.length === 0){
                          //if length of all arrays is 0 then user not in database
                          console.log("We did it reddit");
                          this.setState({nameTaken: false})
                      }else{
                          //maybe send error/notification
                      }
  
                      console.log(res1, res2, res3);
  
                }))
  
    }

    saveUser(){
        //push to backend
        //this.setState({valid: true})
        console.log("SAVE THE USER");
        const user = {name: this.state.user,
                      password: this.state.password,
                      userType: this.state.userType}

        
            Axios.post("http://localhost:8080/"+this.state.userType+"/New?", user).then(resp => {
                console.log(resp)
                this.setState({valid: true});
        
            });

        
    }


   render(){
       return(
           <div className='form'>
               {/* route to new page on login*/}
               {this.state.valid ? < Navigate to="/"/> : null}

               {/* when state updated call function */}
               {this.state.nameTaken ? null : this.saveUser()}

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

                    <label>First Name:</label>
                    <input type="text" id="FirstName" />

                    <label>Last Name:</label>
                    <input type="text" id="LastName" />

                    <label>Date Of Birth:</label>
                    <input type="Date" id="DOB" />
                    
                    <label>Email:</label>
                    <input type="text" id="Email" />

                    <label>Password:</label>
                    <input type="password" id="Password" />

                   
                </form>
                <button onClick={this.checkCredentials}>Submit</button>
           </div>
       )
   }
        
}

export default SignUp
