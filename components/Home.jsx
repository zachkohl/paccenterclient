import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Layout.module.css";
import useUser from "../lib/useUser";

export default function Home(props) {
  const [loggedInStatus, setLoggedInStatus] = useState("");
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setLoggedInStatus(user.isLoggedIn ? "logged in" : "not logged in");
    }
  }, [user]);

  async function logout() {
    const response = await axios.get("/api/logout");
    window.location.reload();
  }

  return (
    <div className={styles.background}>
      {loggedInStatus}
      <div>
        <h2>Welcome to PACCENTER!</h2>

        <p>
          {" "}
          <a href="/index">Home</a>{" "}
        </p>
        <p>
          {" "}
          <a href="/login">Login</a>{" "}
        </p>
        {/* <p> <a href="/dashboard">Dashboard</a> </p>
      <p> <a href="/map">Go to Map</a> </p>
      <p> <a href="/newWalkingList">Create a New Walking List</a> </p> */}
        <p>
          {" "}
          <a href="/running">Check what districts you are in (BETA)</a>{" "}
        </p>
        <p>
          {" "}
          <a href="/report">Submit a SITREP for PAC</a>{" "}
        </p>
        <p>
          {" "}
          <a href="/volunteer">Sign up to help with political campaigns</a>{" "}
        </p>
        <p>
          {" "}
          <button onClick={logout}>Logout</button>{" "}
        </p>
      </div>
    </div>
  );
}
