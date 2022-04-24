import React, {useState, useEffect} from 'react';
import Header from "./components/Header"
import './App.css';
import Home from './pages/Home'
import About from './pages/About'
import {Route, Routes, BrowserRouter} from "react-router-dom"


function App() {
  {/* add router components here to add other web pages */}
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
