import React, {useState, useEffect} from 'react';
import NavBar from "./components/NavBar"
import './App.css';
import PatientHome from './pages/PatientHome'
import PatientProfile from './pages/PatientProfile';
import PatientPrescriptions from './pages/PatientPrescriptions';
import {Route, Routes, BrowserRouter} from "react-router-dom"
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NewPrescription from './pages/NewPrescription';

import Patients from './pages/Patients';
import DoctorHome from './pages/DoctorHome';
import DoctorPrescriptions from './pages/DoctorPrescriptions';
import PharmacistHome from './pages/PharmacistHome';
import ReadScript from './pages/ReadScript';

export var User = {};

export function getUser(){
  return User;
}

export function setUser(user){
  User = user;
  //console.log("SET USER: ", User);
}


function App() {
  {/* add router components here to add other web pages */}

  return (
    <BrowserRouter>
      <div className="App">
        {/*set the name of the app*/}
        <div>
          
        <script src="html5-qrcode.min.js"></script>

          <NavBar/>
            <div>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/SignUp" element ={<SignUp />} />

              <Route path="/Profile" element={<PatientProfile />} />
              <Route path="/PatientHome" element={<PatientHome />} />
              <Route path="/PatientPrescriptions" element={<PatientPrescriptions />}/>

              <Route path="/DoctorHome" element={<DoctorHome />} />
              <Route path="/NewPrescription" element={<NewPrescription />}/>
              <Route path="/DoctorPrescriptions" element={<DoctorPrescriptions />}/>
           
              <Route path="/Patients" element={<Patients />}/>

              <Route path="/PharmacistHome" element={<PharmacistHome />} />
              <Route path="/ReadScript" element={<ReadScript />} />
            </Routes>
            </div>
        </div>
        
      </div>
      
    </BrowserRouter>
  );
}

export default App;
