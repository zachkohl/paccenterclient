import db from "../lib/postgresSetup";
import React, { useReducer, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label
} from "reactstrap";
import NewUser from "../components/RegisterNewUser";
import axios from "axios";
import UpdateUser from "../components/UpdateUser";
import useUser from "../lib/useUser";
import ReadQuestions from "../components/potentialMembers/ReadQuestions";
import permissions from "../components/potentialMembers/permissions";
import generator from "generate-password";
import Link from "next/link";

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

function AdminPage(props) {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [potentialUid, setPotentialUid] = useState("");
  const [userMessage, setUserMessage] = useState(false);
  const [validateUsername, setValidateUsername] = useState(false);
  const [member, setMember] = useState({ potentialmember_uid: null });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(
    generator.generate({ length: 8, numbers: true })
  );
  const [notes, setNotes] = useState("");
  const [giteaAccount, setGiteaAccount] = useState(true);
  const [state, dispatch] = useReducer(reducer, permissions);
  const { user } = useUser({ redirectTo: "/login", permission: "admin" });
  if (!user || user.isLoggedIn === false) {
    return <div>loading...</div>;
  }

  const permissionChecks = Object.keys(permissions).map((key) => {
    return (
      <FormGroup key={key}>
        <Label check>
          <input
            type="checkbox"
            checked={state[key]}
            onChange={(e) => {
              setUserMessage(false);
              setUsername("");
              setPassword(generator.generate({ length: 8, numbers: true }));
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

  const ApprovalList = props.users.map((potential, i) => {
    console.log(potential);
    const style = potential.approver_uid != null ? { color: "green" } : {};

    return (
      <li
        style={style}
        key={potential.potentialmember_uid}
        onClick={() =>
          onClickHandler(potential.potentialmember_uid, potential.email)
        }
      >
        {potential.email}
      </li>
    );
  });

  async function onClickHandler(uid, email) {
    setPotentialUid(uid);
    setEmail(email);
    setTitle("...Loading");
    dispatch({
      type: "reset"
    });
    toggle();
    const response = await axios.get("/api/user/getPotentialMember", {
      params: { uid }
    });
    setTitle(response.data.fullname);
    setMember(response.data);
  }

  function toggle() {
    setModal(!modal);
  }

  const submitHandler = () => {
    if (userMessage) {
      toggle();
      return;
    }

    axios
      .post("/api/user/createUser", {
        email: email,
        giteaAccount: giteaAccount,
        potential_uid: potentialUid,
        username: username,
        password: password,
        permissions: state,
        notes: notes
      })
      .then(function (response) {
        if (response.data === "complete") {
          alert("user registered successfully");

          dispatch({ type: "reset" });
          setUserMessage(true);
        } else {
          alert(
            "something went wrong, probably used a username already assigned"
          );
        }
      });
  };

  async function validateUsernameHandler() {
    const response = await axios.get("/api/user/checkUsername", {
      params: { username: username }
    }); //start here
    setTitle(response.data.fullname);
    if (response.data === "available") {
      setValidateUsername(response.data);
    } else {
      setValidateUsername(response.data);
    }
  }

  return (
    <div>
      <h1>Approve Potential members</h1>
      <h2>membership application list</h2>
      <ul>{ApprovalList}</ul>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          <ReadQuestions member={member} />
          <div style={{ padding: "10px", border: "solid black 1px" }}>
            <h5>permissions</h5>
            {permissionChecks}
          </div>
          <label>
            <p>Username</p>
            <input
              value={username}
              onChange={(e) => {
                setValidateUsername(false);
                setUsername(e.target.value);
              }}
            ></input>
          </label>
          <button onClick={validateUsernameHandler}>validate username</button>
          {JSON.stringify(validateUsername)}
          <br />
          <label>
            Gitea account
            <input
              type="checkbox"
              checked={giteaAccount}
              onChange={(e) => {
                setGiteaAccount(!giteaAccount);
              }}
            />
          </label>
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
          <button onClick={() => submitHandler()}>submit</button>
          {userMessage && (
            <div>
              <div style={{ border: "solid black 1px" }}>
                <p>Welcome to the Politically Active Christians Team!</p>
                <p>
                  You are now a member of a unique community and have been given
                  access to information not normally available to the public.
                </p>
                <p>
                  The systems we use are fairly complex, but that is the price
                  we pay for decentralization and self hosting our own servers.
                  There are two systems you will use. PACCENTER and gitea.
                  Additional training on these tools will be provided
                </p>
                <p>
                  <Link href="https://www.paccenter.org">
                    https://www.paccenter.org
                  </Link>{" "}
                </p>
                <p>username: {username}</p>
                <p>password: {password}</p>
                <p>Second tool: gitea</p>
                <p>
                  <Link href="https://git.bonner.hopto.org/">
                    https://git.bonner.hopto.org/
                  </Link>{" "}
                </p>
                <p>username: {username}</p>
                <p>password: {password}</p>
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AdminPage;

export async function getServerSideProps(ctx) {
  let text = `Select email,potentialmember_uid,approver_uid from potentialmembers where submitted=TRUE`;
  let values = [];
  const dbResponse = await db.query(text, values);
  return { props: { users: dbResponse.rows } };
}
