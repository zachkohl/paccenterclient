import React, { useState } from "react";
import axios from "axios";
import Router from "next/router";
import styles from "./Layout.module.css";

export default function Users(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    axios
      .post("/api/login", {
        username: username,
        password: password,
      })
      .then(function (response) {
        if (response.data.message === "complete") {
          Router.push({
            pathname: "/",
          });
        } else {
          alert("Invalid username or password");
          setUsername("");
          setPassword("");
        }
      });
  };

  return (
    <div className={styles.background}>
      <div>
        <h2>Log in to PACCENTER</h2>

        <label>
          <p>Username</p>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </label>

        <label>
          <p>Password</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          ></input>
        </label>

        <button onClick={submitHandler} className={styles.button}>
          Log In
        </button>
      </div>
    </div>
  );
}
