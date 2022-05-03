import React, {useState, useEffect} from 'react';
import NavBar from "./components/NavBar"
import './App.css';
import PatientHome from './pages/PatientHome'
import PatientProfile from './pages/PatientProfile';
import PatientPrescriptions from './pages/PatientPrescriptions';
import {Route, Routes, BrowserRouter} from "react-router-dom"
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';


function App() {
  {/* add router components here to add other web pages */}
  return (
    <BrowserRouter>
      <div className="App">
        <div>
          <NavBar/>
            <div>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/Profile" element={<PatientProfile />} />
              <Route path="/PatientHome" element={<PatientHome />} />
              <Route path="/SignUp" element ={<SignUp />} />
              <Route path="/PatientPrescriptions" element={<PatientPrescriptions />}/>
            </Routes>
            </div>
        </div>
        
      </div>
      
    </BrowserRouter>
  );
}

export default App;
