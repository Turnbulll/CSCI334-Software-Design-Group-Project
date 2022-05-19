import Axios from 'axios';
import React from 'react'
import { Navigate } from 'react-router-dom';
import { getUser } from '../App';

class DevReports extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {userType: "",
                      doctorCount: "",
                      patientCount: "",
                      pharmacistCount: "",
                      prescriptionCount: "",
                      treatmentCount: "",
        }
                 

      }


    componentWillMount = () =>{
        this.setState({
                       userType: getUser().userType
        });

        this.preloadStats();
    }

    preloadStats = () =>{
      //get the counts from the backend
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

    //generates a report counting medicines
    generateMedicinesReport= () =>{
      //get all scripts from backend
      Axios.get("http://localhost:8080/Prescription").then(resp =>
      { 
        //save script array
        const prescriptions = resp.data;
        //create a new map
        var medicineMap = new Map();

        //intitialise the report string
        var string = "====================================================================\n";
        string += "Count of total times each medicine is in a prescription \n";
        string += "Total prescriptions: " + this.state.prescriptionCount +"\n";
        string += "====================================================================\n";

        //for eachh prescription
        prescriptions.forEach(element => {
          //if the medicine is alrady in the map increment its value
            if (medicineMap.has(element.medicine)){
              medicineMap.set(element.medicine, medicineMap.get(element.medicine) + 1)
            }else{ //if not add it to the map
              medicineMap.set(element.medicine, 1);
            }
        });

        //for each element in the map
        medicineMap.forEach((value, key) => {
          //add its medicine and count to the report string
          string += key + ": " + value + "\n";
        })
        //send the report string with a marker
        string += "====================================================================\n";
       // console.log(string);
        //create  & download the report file
       this.createFile(string, "Medicines Report");

      });
    }

    //generate a report counting the allergies
    generateAllergiesReport = () =>{
      //get treatments from backend
      Axios.get("http://localhost:8080/Treatment").then(resp =>
      {
        //insitialise output string
        var string = "====================================================================\n";
       
        //create allergies map
        var allergiesMap = new Map();

        //set allergies count to 0
        var allergiesCount = 0;

        //get all treatments from backend
        const treatments = resp.data;

        //for each treatment
        for (var i = 0; i < treatments.length; i++){

          //if treatment had 0 allergies, skip step in loop
          if (treatments[i].allergies.length < 1){
            continue;
          }
          
          //temp array allergies
          var allergies = treatments[i].allergies;

          //for each allergy
          for (var j = 0; j < allergies.length; j++){
            //if allergy in map
            if (allergiesMap.has(allergies[j])){
              //increment its value
              allergiesMap.set(allergies[j], allergiesMap.get(allergies[j]) + 1)
            }else{//if not
              //add it to map
              allergiesMap.set(allergies[j], 1);
            }

            //increment allergies count
            allergiesCount++;
          }

        }

        //add header to string
        string += "Common Allergies\n";
        string += "Total Unique Allergies: " + allergiesMap.size + "\n"; 
        string += "Total Allergies: " + allergiesCount + "\n";
        string += "====================================================================\n";
        
        //add each allergy and its count to string
        allergiesMap.forEach((value, key) => {
          string += key + ": " + value + "\n";
        })

        //add footer
        string += "====================================================================\n";
        
        //create file
        this.createFile(string, "Allergy Report");

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
        <button onClick={this.generateAllergiesReport} className='blueButton'>Download Allergies Report</button>



      </div>
    </div>

  )
    }
}

export default DevReports
