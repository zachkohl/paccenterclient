import react, { useState, useEffect } from "react";
import axios from "axios";
const BASE_URL = "http://localhost";
function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  function onClickHandler(event) {
    axios
      .post(`${BASE_URL}/login`, {
        username: username,
        password: password
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/checkuser`, { withCredentials: true })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  });

  function onClickLogout() {
    axios
      .get(`${BASE_URL}/api/logout`)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  return (
    <div>
      <input
        value={username}
        onChange={event => {
          setUsername(event.target.value);
        }}
      ></input>
      <input
        value={password}
        type="password"
        onChange={event => {
          setPassword(event.target.value);
        }}
      ></input>
      <button onClick={onClickHandler}>login</button>
      <div>
        <button onClick={onClickLogout}>logout</button>
      </div>
    </div>
  );
}

export default Login;
