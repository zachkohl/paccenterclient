import React, { useReducer, useState } from "react";
import axios from "axios";
import Router from "next/router";
import { Button, FormGroup, Input, Label } from "reactstrap";
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
  const [notes, setNotes] = useState(props.user.notes);
  const [username, setUsername] = useState("");
  const [updatePassword, setUpdatePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [state, dispatch] = useReducer(reducer, {
    ...permissions,
    ...props.user.permissions,
  });
  console.log(props.user.permissions);
  const permissionChecks = Object.keys(state).map((key) => {
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

  const deleteHandler = (e) => {
    if (confirm("Are you sure you want to delete this user?")) {
      axios
        .post("/api/user/deleteUser", {
          user_uid: props.user.user_uid,
        })
        .then(function (response) {
          if (response.data === "complete") {
            setUsername("");
            setPassword("");
            dispatch({ type: "reset" });
            props.toggle();
            props.updateUsers();
          } else {
            alert("something went wrong");
          }
        });
    }
  };

  const updateHandler = (e) => {
    axios
      .post("/api/user/updateUser", {
        username: username,
        password: password,
        permissions: state,
        updatePassword: updatePassword,
        user_uid: props.user.user_uid,
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
        <h2>Update user:{props.user.username}</h2>
        <div style={{ padding: "10px", border: "solid black 1px" }}>
          <h5>permissions</h5>
          {permissionChecks}
        </div>
        <label>
          <p>Username</p>
          {props.user.username}
        </label>
        <br />
        <br />
        <label>
          <p>Password, checkbox to update</p>
          <input
            type="checkbox"
            checked={updatePassword}
            onChange={(e) => setUpdatePassword(e.target.checked)}
          />
          {updatePassword && (
            <span>
              <p>put new password here</p>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </span>
          )}
        </label>
        <br></br>
        notes:
        <br />
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
        <br />
        <button onClick={updateHandler}>update</button>
      </div>
      <div style={{ paddingLeft: "80%" }}>
        <Button color="danger" onClick={deleteHandler}>
          delete
        </Button>
      </div>
    </div>
  );
}
