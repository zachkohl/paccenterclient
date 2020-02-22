import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/router";
function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onClickHandler = async () => {
    const config = {
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    };

    const result = await axios.post(
      "api/login",
      {
        username: username,
        password: password
      },
      config
    );
    console.log(result.data);

    if (result.data.success === true) {
      //pull the token off the cookie

      Cookies.set("bearer", result.data.token);
      window.location.href = `http://localhost:3000/protected`;
    } else {
      alert("access denied");
    }
  };

  const logout = async () => {
    Cookies.remove("bearer", { path: "/" });
  };

  return (
    <div>
      <label htmlFor="username">Username:</label>
      <input
        value={username}
        onChange={event => {
          setUsername(event.target.value);
        }}
        type="text"
        id="username"
      ></input>
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={event => {
          setPassword(event.target.value);
        }}
      ></input>
      <button onClick={onClickHandler}>Submit</button>
      <button onClick={logout}>logout</button>
    </div>
  );
}
export default Login;
