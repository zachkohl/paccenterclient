import React, { useState } from "react";
import axios from "axios";
import styles from "./Layout.module.css";

export default function Dashboard(props) {

return (
  <div className={styles.background}>
    <div>
      <h2>
      Welcome to Your Dashboard!
      </h2>

      <p> <a href="https://www.paccenter.org/index">Home</a> </p>

     
      <p> <a href="https://www.paccenter.org/login">Login</a> </p>
      <p> <a href="https://www.paccenter.org/dashboard">Dashboard</a> </p>
      <p> <a href="https://www.paccenter.org/users">Sign Up a New User</a> </p>
      <p> <a href="https://www.paccenter.org/map">Go to Map</a> </p>
      <p> <a href="https://www.paccenter.org/newWalkingList">Create a New Walking List</a> </p>
      <p> <a href="https://www.paccenter.org/running">Check what districts you are in (BETA)</a> </p>
      <p> <a href="https://www.paccenter.org/report">Submit a SITREP for PAC</a> </p>
      <p> <a href="https://www.paccenter.org/volunteer">Sign up to help with political campaigns</a> </p>

      
    
    </div>
  </div>
);
}

