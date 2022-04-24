import React from 'react'
import {Link} from "react-router-dom"

function Home() {
  return (
    <div>
      THIS IS HOME
      
      <p><Link to="/about">TEST NAVIGATION LINK</Link></p>
      
    </div>
  )
}

export default Home

