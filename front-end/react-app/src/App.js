import React, {useState, useEffect} from 'react';
import NavBar from "./components/NavBar"
import './App.css';
import Home from './pages/Home'
import About from './pages/About'
import {Route, Routes, BrowserRouter} from "react-router-dom"
import SignIn from './pages/SignIn';


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
              <Route path="/about" element={<About />} />
              <Route path="/Home" element={<Home />} />
            </Routes>
            </div>
        </div>
        
      </div>
      
    </BrowserRouter>
  );
}

export default App;
