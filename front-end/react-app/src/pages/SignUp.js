import React from 'react'
import { Navigate} from "react-router-dom";


class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {email: "",
                      password: "",
                      valid: false};
  
      }

    checkCredentials  = (event) => {
        /* NEED TO ADD LOGIC FOR GETTING ACOUNT DETAIL IN HERE */

        
        this.setState({valid: true})
    }

   render(){
       return(
           <div className='form'>
               {/* route to new page on login*/}
               {this.state.valid ? < Navigate to="/"/> : null}

                <form className='form'>
                    <h1>Sign Up</h1>

                    <label>First Name:</label>
                    <input type="text" name="FirstName" />

                    <label>Last Name:</label>
                    <input type="text" name="FirstName" />

                    <label>Date Of Birth:</label>
                    <input type="Date" name="DOB" />
                    
                    <label>Email:</label>
                    <input type="text" name="Email" />

                    <label>Password:</label>
                    <input type="password" name="password" />

                   
                </form>
                <button onClick={this.checkCredentials}>Submit</button>
           </div>
       )
   }
        
}

export default SignUp
