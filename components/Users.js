import React, { useState } from "react";
import axios from "axios";
import styles from "./Login.module.css"

export default function Users(props) {
  const [newUserName, setNewUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const submitHandler = (e) => {
    axios.post("/api/newuser", {
      username: newUserName,
      password: newPassword,
    });
  };
  return (
    <div className={styles.background}>
      <div>

        <h2>
	  Add a New User
        </h2>

	<label>
          <p>
	    New Username
	  </p>
          <input
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          ></input>
        </label>
        
	<label>
          <p>
	    New Password
	  </p>
          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          ></input>
        </label>
        
	<button onClick={submitHandler} className={styles.button}>Create</button>
      
      </div>
    </div>
  );
}
