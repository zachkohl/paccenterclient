import React, { useState } from "react";
import useUser from "../lib/useUser";
import axios from "axios";
import Values from "../components/Values";
import isEmail from "validator/lib/isEmail";

function singupMember(props) {
  const [emailContents, setEmailContents] = useState(``);
  const [email, setEmail] = useState("");
  // const { user } = useUser({
  //   redirectTo: "/login",
  //   permission: "volunteer"
  // });
  // if (!user || user.isLoggedIn === false) {
  //   return <div>loading...</div>;
  // }

  async function sumbitHandler() {
    if (isEmail(email)) {
      const response = await axios.post("/api/user/submitPotentialMember", {
        email: email
      });
      if (response.data.status === "complete") {
        alert("email sucessfully recieved");
        setEmailContents(`
        Congratulations: you have been recommended to join the Politically Active Christians Team. Please follow the below link to request membership and receive access to our data repositories.
        ${response.data.url}
        `);
      } else {
        alert("Something went wrong. Please try another email address");
      }
    } else {
      alert("you did not enter a proper email address");
    }
  }

  return (
    <div style={{ margin: "20px" }}>
      <h1>Recommend someone join PAC</h1>
      <label>
        Email of candidate:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <div>
        <button onClick={sumbitHandler}>submit</button>
        <div style={{ margin: "10px" }}>{emailContents}</div>
        <Values />
      </div>
    </div>
  );
}

export default singupMember;
