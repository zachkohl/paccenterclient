import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(props.email);

  const onClickHandler = async () => {
    const config = {
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    };

    const result = await axios.post(
      "api/register",
      {
        username: username,
        password: password,
        email: email
      },
      config
    );
    console.log(result.data);

    if (result.data.success === true) {
      Cookies.set("bearer", result.data.token);
      Cookies.set("test", result.data.token);
      alert("result.success was true");
    } else {
      alert("access denied");
    }
  };

  const logout = async () => {
    Cookies.remove("bearer", { path: "" });
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
      <label htmlFor="password">Username:</label>
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
export default Register;
