import React, { useState } from "react";
import axios from "axios";
import Router from "next/router";

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
        if (response.data === "complete") {
          Router.push({
            pathname: "/newWalkingList",
          });
        }
      });
  };
  return (
    <div>
      <div>
        Login
        <label>
          username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </label>
        <label>
          password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </label>
        <button onClick={submitHandler}>Submit</button>
      </div>
    </div>
  );
}
