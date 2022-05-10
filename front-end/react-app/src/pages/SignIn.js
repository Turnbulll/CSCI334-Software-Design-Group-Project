import Axios from 'axios';
import React, { useEffect } from 'react'
import { Navigate, Link} from "react-router-dom";


class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {User: null,
                    userType: null};
  
      }


    login = () =>{
        /* NEED TO ADD LOGIC FOR GETTING ACOUNT DETAIL IN HERE */

        //document.dispatchEvent(new Event("loggedInDoctor"));
        //document.dispatchEvent(new Event("loggedInPatient"));
        //document.dispatchEvent(new Event("loggedInPharmacist"));

        //this.getUsers();
       //console.log(this.state.Users[2]);
     
        var username = document.getElementById("user").value;
        var password = document.getElementById("password").value;
    
       this.checkCredentials(username, password);

       //load different nav bar based on user type
       if (this.state.userType === "Doctor"){
        document.dispatchEvent(new Event("loggedInDoctor"));

       }else if(this.state.userType === "Patient"){
        document.dispatchEvent(new Event("loggedInPatient"));

       }else if(this.state.userType === "Pharmacist"){
        document.dispatchEvent(new Event("loggedInPharmacist"));

    }
      
    
       

    }

    checkCredentials(username, password){
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

            if (resp1.data != []){
                console.log("YUP");
                if (resp1.data.password === password){
                    this.setState({userType: resp1.data[0].userType});
                    return true;
                }
               
            }
            if(resp2.data != []){

                if (resp2.data[0].password === password){
                    this.setState({userType: resp2.data[0].userType});
                    return true;
                }

                console.log("YUP");
            }
            if (resp3.data[0] != []){
                console.log("YUP");
                if (resp3.data[0].password === password){
                    this.setState({userType: resp3.data[0].userType});
                    return true;

                }

            }

            return false;
          

            })
        ).catch(errors => {
             // react on errors.
            console.error(errors);
        });

    }

    componentDidMount(){

    }

  

   

   render(){
       return(

    
            
           <div className='form'>

               {/* route to new page on login CURRENTLY BROKEN*/}
               {/*this.state.userType === "Patient" ? < Navigate to="/PatientHome" /> : null }
               {this.state.userType === "Doctor" ? < Navigate to="/DoctorHome" /> : null }
               {this.state.userType === "Pharmacist" ? < Navigate to="/PharmacistHome" /> : null */}

                <form className='form'>
                    <h1>Sign In</h1>
                    <label>Name:</label>
                    <input type="text" name="user" id="user" />

                    <label>Password:</label>
                    <input type="password" name="password" id="password"/>

                    <text className='SignUpLink'>Don't Have an account? <Link to ="/SignUp">Click here to Sign Up</Link></text>
                   
                </form>
                <button onClick={this.login}>Submit</button>
           </div>
       )
   }
        
}

export default SignIn
