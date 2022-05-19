
import logoBlack from '../imgs/logoBlack.png'
import Axios from 'axios';
import React, { useEffect } from 'react'
import styled from 'styled-components' 
import { Navigate, Link} from "react-router-dom";
import {getUser, setUser} from "../App.js"

{/*styled components for making looks look nicer*/}
const Logo = styled.img`
    width: 50vw;
    object-fit: contain;
`


class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {User: null,
                    userType: null,
                    error: ""};
  
      }


    login = () =>{

       //get data from input
       var username = document.getElementById("user").value;
       var password = document.getElementById("password").value;

       if (document.getElementById("testing").checked){
            setUser({userType: "Testing"});
            this.setState({userType: "Testing"});
            return;
       }

       if (username === "" || password === ""){
            this.callError("Missing Input");
            return;

            //hard coded dev account. ONLY FOR ASSIGNMENT DEMO PURPOSES
       }
        
      //check data valid
       this.checkCredentials(username, password);
    }

    devMode = () =>{
        setUser({userType: "Developer", name:"TEST123"});
        this.setState({userType: "Developer"});

    }


    async checkCredentials(username, password){


        //fetch requests for all user types
        var req1 = Axios.get("http://localhost:8080/Patient/Name?name="+username);
        var req2 = Axios.get("http://localhost:8080/Doctor/Name?name="+username);
        var req3 = Axios.get("http://localhost:8080/Pharmacist/Name?name="+username)

        //fetch all the requests
        Axios.all([req1, req2, req3]).then(
            Axios.spread((...responses) => {
            this.setState({userType: ""});
            const resp1 = responses[0];
            const resp2 = responses[1];
            const resp3 = responses[2];
            console.log(resp1.data, resp2.data, resp3.data);

            var userType;
            var user;
                //if patients return a value
            if (resp1.data.length !== 0){
                if (resp1.data[0].password === password){
                    //update usertype and state
                    userType = resp1.data[0].userType;
                    user = resp1.data[0];
                    this.setState({User: resp1.data[0],
                                    userType: resp1.data[0].userType});
                }else{
                    this.callError("Invalid Username or Password");
                }
               
            }

            // if doctors returns value
            if(resp2.data.length !== 0){
        
                if (resp2.data[0].password === password){
                    //update usertype and state
                    userType = resp2.data[0].userType;
                    user = resp2.data[0];
                    this.setState({User: resp2.data[0],
                        userType: resp2.data[0].userType});
                }else{
                    this.callError("Invalid Username or Password");
                }
            }

            //if pharmacist returns
            if (resp3.data.length !== 0){
                    //update usertype and state
                if (resp3.data[0].password === password){
                    userType = resp3.data[0].userType;
                    user = resp3.data[0];
                    this.setState({User: resp3.data[0],
                        userType: resp3.data[0].userType});
                }else{
                    this.callError("Invalid Username or Password");
                }

            }  
                

            //work around for state async issue
                if (userType === "Doctor"){
                    document.dispatchEvent(new Event("loggedInDoctor"));
        
               }else if(userType === "Patient"){
                    document.dispatchEvent(new Event("loggedInPatient"));
        
               }else if(userType === "Pharmacist"){
                     document.dispatchEvent(new Event("loggedInPharmacist"));
                }

                setUser(user);


            })
        ).then((...responses) => {this.log()}).catch(errors => {
             // react on errors.
            console.error(errors);
        });
    }

    callError = (txt) =>{
        this.setState({error: txt});
    }

  

   

   render(){
       return(
           
           <div className='form'>
               <br/><br/>
               <Logo src={logoBlack} alt="logoTranSmall"></Logo><br/>
                
                    {/* route to new page on login CURRENTLY BROKEN*/}
               {this.state.userType === "Patient" ? < Navigate to="/PatientHome" /> : null }
               {this.state.userType === "Doctor" ? < Navigate to="/DoctorHome" /> : null }
               {this.state.userType === "Pharmacist" ? < Navigate to="/PharmacistHome" /> : null}
               {this.state.userType === "Testing" ? < Navigate to="/DevSuperSecretReportsPageYourNotAllowedToSee" /> : null}

               <div>
                    <form className='form'>
                    
                        <br/>
                        <h1>Sign In</h1>
                        <label>Name:</label>
                        <input type="text" name="user" id="user" />

                        <label>Password:</label>
                        <input type="password" name="password" id="password"/>

                        <label>Testing/Reports</label>
                        <input type="checkbox" id="testing"></input>

                        <text className='SignUpLink'>Don't Have an account? <Link to ="/SignUp">Click here to Sign Up</Link></text>
                        <x className='errorText'>{this.state.error}</x>
                    </form><br/><br/>

                    <button onClick={this.login}  onMouseDown={this.login} >Submit</button>
                </div>
           </div>
       )
   }
        
}

export default SignIn
