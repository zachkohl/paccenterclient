import React, { useState } from "react";
import axios from "axios";
import styles from "./Layout.module.css";

export default function Home(props) {

return (
  <div className={styles.background}>
    <div>
      <h2>
      Welcome to PACCENTER!
      </h2>

      <p> <a href="https://www.paccenter.org/index">Home</a> </p>
      <p> <a href="https://www.paccenter.org/login">Login</a> </p>
      <p> <a href="https://www.paccenter.org/dashboard">Dashboard</a> </p>
      <p> <a href="https://www.paccenter.org/map">Go to Map</a> </p>
    
    </div>
  </div>
);
}

