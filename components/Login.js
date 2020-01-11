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

  const checkUser = async () => {
    const response = await fetch(`${BASE_URL}/api/checkuser`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer" // no-referrer, *client
    });

    const answer = await response.json();
    console.log(answer);
  };

  useEffect(() => {
    checkUser();
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
