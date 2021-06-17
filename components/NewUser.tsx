import React, { useReducer, useState } from "react";
import axios from "axios";
import Router from "next/router";
import { FormGroup, Input, Label } from "reactstrap";
import generator from "generate-password";
const permissions = {
  calendar: true,
  report: false,
  districtLookup: false,
  surveys: false,
  volunteer: false,
  admin: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "change":
      const newState = { ...state };
      newState[action.payload.key] = action.payload.value;
      return newState;
    case "reset":
      const newStateReset = { ...permissions };
      return newStateReset;
    default:
      throw new Error();
  }
}

export default function Users(props) {
  const [notes, setNotes] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(
    generator.generate({ length: 8, numbers: true })
  );
  const [state, dispatch] = useReducer(reducer, permissions);

  const permissionChecks = Object.keys(permissions).map((key) => {
    return (
      <FormGroup key={key}>
        <Label check>
          <input
            type="checkbox"
            checked={state[key]}
            onChange={(e) => {
              dispatch({
                type: "change",
                payload: {
                  key: key,
                  value: e.target.checked,
                },
              });
            }}
          />{" "}
          {key}
        </Label>
      </FormGroup>
    );
  });

  const submitHandler = (e) => {
    axios
      .post("/api/user/createUser", {
        username: username,
        password: password,
        permissions: state,
        notes: notes,
      })
      .then(function (response) {
        if (response.data === "complete") {
          alert("user registered successfully");
          setUsername("");
          setPassword(generator.generate({ length: 8, numbers: true }));
          dispatch({ type: "reset" });
          props.toggle();
          props.updateUsers();
        } else {
          alert(
            "something went wrong, probably used a username already assigned"
          );
        }
      });
  };

  return (
    <div>
      <div>
        <h2>Register new user</h2>
        <div style={{ padding: "10px", border: "solid black 1px" }}>
          <h5>permissions</h5>
          {permissionChecks}
        </div>
        <label>
          <p>Username</p>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </label>
        <br />
        <br />
        <label>
          <p>Password</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </label>
        <br></br>
        notes:
        <br />
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
        <br />
        <button onClick={submitHandler}>submit</button>
      </div>
    </div>
  );
}
