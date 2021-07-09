import React, { useState } from "react";
import axios from "axios";
import Router from "next/router";
import styles from "../components/Layout.module.css";
import useUser from "../lib/useUser";

function UpdatePassword(props) {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");

  const { user } = useUser({ redirectTo: "/login" });
  if (!user || user.isLoggedIn === false) {
    return <div>loading...</div>;
  }

  const submitHandler = (e) => {
    if (newPassword === "") {
      alert("password cannot be blank");
      return;
    }

    if (newPassword === newPasswordAgain) {
      axios
        .post("/api/user/resetPassword", {
          newPassword: newPassword,
          newPasswordAgain: newPasswordAgain,
        })
        .then(function (response) {
          if (response.data === "complete") {
            alert("Password updated. You will now be routed to the home page");
            Router.push({
              pathname: "/",
            });
          } else {
            alert("Something went wrong");
            console.log(response.data);
            setNewPassword("");
            setNewPasswordAgain("");
          }
        })
        .catch((e) => {
          alert("Something went wrong");
          console.log(e);
        });
    } else {
      alert("passwords must match");
      setNewPassword("");
      setNewPasswordAgain("");
    }
  };

  return (
    <div className={styles.background}>
      <div>
        <h2>Reset password</h2>

        <label>
          <p>newPassword</p>
          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
          ></input>
        </label>
        <div>
          <label>
            <p>NewPassword again</p>
            <input
              value={newPasswordAgain}
              onChange={(e) => setNewPasswordAgain(e.target.value)}
              type="password"
            ></input>
          </label>
        </div>
        <button onClick={submitHandler} className={styles.button}>
          Update
        </button>
      </div>
    </div>
  );
}

export default UpdatePassword;
