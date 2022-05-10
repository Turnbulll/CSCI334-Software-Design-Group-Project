import Axios from 'axios';
import React from 'react'
import { Navigate, Link} from "react-router-dom";


class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {email: "",
                      password: "",
                      userType: "",
                      Users: []};
  
      }

    login  = (event) => {
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
        //checks if the user is currently in the Users array, returns tru if found and updates usertype
        var users = this.state.Users;
        for (var i = 0; i < users.length; i++ ){
            if (users[i].name === username && users[i].password == password){
                this.setState({userType: users[i].userType});
                return true;
            }
        }
        return false;

    }

    componentDidMount(){
        //this.getDoctors();   
        this.getUsers();
    }

    getUsers(){
        //fetch requests for all user types
        var req1 = Axios.get("http://localhost:8080/Patient");
        var req2 = Axios.get("http://localhost:8080/Doctor");
        var req3 = Axios.get("http://localhost:8080/Pharmacist")

        //fetch all the requests
        Axios.all([req1, req2, req3]).then(
            Axios.spread((...responses) => {

            const resp1 = responses[0];
            const resp2 = responses[1];
            const resp3 = responses[2];

            //concat all responses
            const data  = resp1.data.concat(resp2.data, resp3.data);
            this.setState({Users: data});

            })
        ).catch(errors => {
             // react on errors.
            console.error(errors);
        });

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
