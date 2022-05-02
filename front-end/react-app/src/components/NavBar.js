import React from 'react'
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
        <ul className="navBar">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/about">About</Link></li>

        </ul>
     
    </div>
  )
}

export default NavBar
