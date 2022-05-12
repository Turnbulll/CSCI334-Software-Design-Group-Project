import React from 'react'
import logoBlack from '../logoBlack.png'
import { Navigate, Link} from "react-router-dom";


class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {email: "",
                      password: "",
                      userType: ""};
  
      }

    checkCredentials  = (event) => {
        /* NEED TO ADD LOGIC FOR GETTING ACOUNT DETAIL IN HERE */

        //this.setState({userType:"doctor"});
        //this.setState({userType:"patient"});
        this.setState({userType:"pharmacist"});

        //document.dispatchEvent(new Event("loggedInDoctor"));
        //document.dispatchEvent(new Event("loggedInPatient"));
        document.dispatchEvent(new Event("loggedInPharmacist"));
        
    }

   render(){
       return(

    
        
        
           <div className='form'>
               {/* route to new page on login*/}
               {this.state.userType === "patient" ? < Navigate to="/PatientHome" /> : null }
               {this.state.userType === "doctor" ? < Navigate to="/DoctorHome" /> : null }
               {this.state.userType === "pharmacist" ? < Navigate to="/PharmacistHome" /> : null }

                
                <form className='form'>
                    <br/><br/>
                    <h1>Sign In</h1>
                    <label>Email:</label>
                    <input type="text" name="Email" />

                    <label>Password:</label>
                    <input type="password" name="password" />

                    <text className='SignUpLink'>Don't Have an account? <Link to ="/SignUp">Click here to Sign Up</Link></text>
                   
                </form>
                <button onClick={this.checkCredentials}>Submit</button>
           </div>
       )
   }
        
}

export default SignIn
