import React, { useReducer, useState } from "react";
import axios from "axios";
import Router from "next/router";
import { FormGroup, Input, Label } from "reactstrap";
import generator from "generate-password";
import permissions from "./potentialMembers/permissions";

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
                  value: e.target.checked
                }
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
        notes: notes
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
        <p>We believe in the following:</p>
        <p>
          <b>
            Triune God-The Father, His only Son Jesus Christ, and Holy Spirit;
            as described in the Holy Bible
          </b>
          :
        </p>
        <p>
          That the United States of America was founded on principles endowed by
          our creator
        </p>
        <p>
          <b> Freedom </b> As the cornerstone of our republic, which we must
          defend with our lives, our fortunes, and our sacred honor
        </p>
        <p>
          <b>The Constitution</b> Which must be implemented and interpreted as
          it was intended by the Founding Fathers
        </p>
        <p>
          <b> States Rights </b>As protection against tyranny of a federal
          government
        </p>
        <p>
          <b> Justice</b> Evenly administered under the Constitution and the
          Bill of Rights, free of Judiciary Activism
        </p>
        <p>
          <b>Individual Rights</b> In particular: freedom of speech, religion,
          and the right to bear arms, property, and the pursuit of happiness
        </p>
        <p>
          <b>Right to Life</b> Because life is sacred
        </p>
        <p>
          <b>Marriage</b> The union of one man and one woman
        </p>
        <p>
          <b> Personal Responsibility </b>Through self-governance and accepting
          our own success and failure
        </p>
        <p>
          <b> Fiscal Responsibility</b> By the government adhering to low
          taxation, maintaining a balanced budget, and opposing pork barrel
          spending
        </p>
        <p>
          <b>(No supremacist Ideologies)</b> I am not a mason or member of a
          secret society intent on taking over the world. I am also not a white
          supremacist.
        </p>
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
