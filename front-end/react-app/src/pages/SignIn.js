import React from 'react'
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

        this.setState({userType:"patient"});
        document.dispatchEvent(new Event("loggedInPatient"));
        
    }

   render(){
       return(

    

           <div className='form'>
               {/* route to new page on login*/}
               {this.state.userType === "patient" ? < Navigate to={{
                    pathname: '/home',
                    state: {userType: this.state.userType}
                    }} /> : null }

                <form className='form'>
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
