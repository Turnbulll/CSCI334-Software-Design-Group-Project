import React from 'react'
import { Navigate} from "react-router-dom";


class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {email: "",
                      password: "",
                      userType: ""};
  
      }

    checkCredentials  = (event) => {
        /* NEED TO ADD LOGIC FOR GETTING ACOUNT DETAIL IN HERE */
        this.setState({userType: "patient"})
    }

   render(){
       return(
           <div className='form'>
               {/* route to new page on login*/}
               {this.state.userType == "patient" ? < Navigate to="/home"/> : null}

                <form className='form'>
                    <h1>Sign In</h1>
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

export default SignIn
