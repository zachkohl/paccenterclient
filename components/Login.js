import react from "react";

function Login(props) {
  function onClickHandler(event) {
    alert("button was clicked");
  }
  return <button onClick={onClickHandler}>login</button>;
}

export default Login;
