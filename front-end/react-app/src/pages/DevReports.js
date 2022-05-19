import Axios from 'axios';
import React from 'react'
import { Navigate } from 'react-router-dom';
import { getUser } from '../App';

class DevReports extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {user: null,
                      userType: "",
                      doctorCount: "",
                      patientCount: "",
                      pharmacistCount: "",
                      prescriptionCount: "",
                      treatmentCount: ""
        }
                 

      }


    componentWillMount = () =>{
        this.setState({user: getUser(),
                       userType: getUser().userType
        });

        this.preloadStats();
    }

    preloadStats = () =>{
      //doctors
      Axios.get("http://localhost:8080/Report/Doctor").then(resp =>{
        const string = resp.data.replace(/[A-Za-z]/g, "");
        this.setState({doctorCount: string});
      } );

      //patient
      Axios.get("http://localhost:8080/Report/Patient").then(resp =>{
        const string = resp.data.replace(/[A-Za-z]/g, "");
        this.setState({patientCount: string});
      } );

      Axios.get("http://localhost:8080/Report/Pharmacist").then(resp =>{
        const string = resp.data.replace(/[A-Za-z]/g, "");
        this.setState({pharmacistCount: string});
      } );

      Axios.get("http://localhost:8080/Report/Prescription").then(resp =>{
        const string = resp.data.replace(/[A-Za-z]/g, "");
        this.setState({prescriptionCount: string});
      } );

      Axios.get("http://localhost:8080/Report/Treatment").then(resp =>{
        const string = resp.data.replace(/[A-Za-z]/g, "");
        this.setState({treatmentCount: string});
      } );


    }

   

    generateDoctorReport = () =>{
      console.log("Triggered");
      var reportText = "==================================\n"
      reportText += "Doctor Count: " + this.state.doctorCount + "\n";
      reportText += "==================================\n"


      //inspired by https://stackoverflow.com/questions/44656610/download-a-string-as-txt-file-in-react
      const report = document.createElement("a");
      const newFile = new Blob([reportText], {type: 'text/plain'});
      report.href = URL.createObjectURL(newFile);
      report.download = "DoctorsReport.txt";
      document.body.appendChild(report); 
      report.click();


    }
    


  render(){return (
    <div className='main'>
        <h1>REPORTS PAGE</h1>
        {/*this.state.userType !== "Developer" ? < Navigate to="/" /> : null */}
      <div className='almostFullScrollDiv'>

        <h2>Stats</h2>
        
        <h4>Doctors count: {this.state.doctorCount}</h4>
        <h4>Patient count: {this.state.patientCount}</h4>
        <h4>Pharmacist count: {this.state.pharmacistCount}</h4>
        <h4>Prescription count: {this.state.prescriptionCount}</h4>
        <h4>Treatment count: {this.state.treatmentCount}</h4>


       <h2>Reports/Data</h2>
        <button onClick={this.generateDoctorReport} className='blueButton'>BIG TEST BUTTON</button>



      </div>
    </div>

  )
    }
}

export default DevReports
