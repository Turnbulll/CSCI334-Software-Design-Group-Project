
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
    
    
    login = () =>{

       //get data from input
       var username = document.getElementById("user").value;
       var password = document.getElementById("password").value;
        
      //check data valid
       this.checkCredentials(username, password);
    }


    async checkCredentials(username, password){
        //fetch requests for all user types
        var req1 = Axios.get("http://localhost:8080/Patient/Name?name="+username);
        var req2 = Axios.get("http://localhost:8080/Doctor/Name?name="+username);
        var req3 = Axios.get("http://localhost:8080/Pharmacist/Name?name="+username)

        //fetch all the requests
        Axios.all([req1, req2, req3]).then(
            Axios.spread((...responses) => {

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

    componentDidMount(){

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
               <div>
                    <form className='form'>
                    
                        <br/>
                        <h1>Sign In</h1>
                        <label>Name:</label>
                        <input type="text" name="user" id="user" />

                        <label>Password:</label>
                        <input type="password" name="password" id="password"/>

                        <text className='SignUpLink'>Don't Have an account? <Link to ="/SignUp">Click here to Sign Up</Link></text>

                    </form><br/><br/>
                    <button onClick={this.login}  onMouseDown={this.login} >Submit</button>
                </div>
           </div>
       )
   }
        
}

export default SignIn
