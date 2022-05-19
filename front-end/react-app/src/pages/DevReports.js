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
                      treatmentCount: "",
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

    generateMedicinesReport= () =>{

      Axios.get("http://localhost:8080/Prescription").then(resp =>
      {
        const prescriptions = resp.data;
        var medicineMap = new Map();

        var string = "====================================================================\n";
        string += "Count of total times each medicine is in a prescription \n";
        string += "Total prescriptions: " + this.state.prescriptionCount +"\n";
        string += "====================================================================\n";

        prescriptions.forEach(element => {
            if (medicineMap.has(element.medicine)){
              medicineMap.set(element.medicine, medicineMap.get(element.medicine) + 1)
            }else{
              medicineMap.set(element.medicine, 1);
            }
        });

        medicineMap.forEach((value, key) => {
          string += key + ": " + value + "\n";
        })
        string += "====================================================================\n";
       // console.log(string);

       this.createFile(string, "Medicines Report");

      });


    }
   


    createFile(reportText, filename){
         //inspired by https://stackoverflow.com/questions/44656610/download-a-string-as-txt-file-in-react
         const report = document.createElement("a");
         const newFile = new Blob([reportText], {type: 'text/plain'});
         report.href = URL.createObjectURL(newFile);
         report.download = filename;
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
        <button onClick={this.generateMedicinesReport} className='blueButton'>Download Medicine Report</button>



      </div>
    </div>

  )
    }
}

export default DevReports
