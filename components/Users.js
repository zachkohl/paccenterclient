import React, { useState } from "react";
import axios from "axios";

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
    <div>
      <div>
        Create new user:
        <label>
          username
          <input
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          ></input>
        </label>
        <label>
          password
          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          ></input>
        </label>
        <button onClick={submitHandler}>Submit</button>
      </div>
    </div>
  );
}
