import db from "../lib/postgresSetup";
import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import NewUser from "../components/NewUser";
import axios from "axios";
import UpdateUser from "../components/UpdateUser";
function AdminPage(props) {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState(<div>hello world</div>);
  const [users, setUsers] = useState(props.users);
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({});

  const userList = users.map((user, i) => (
    <li key={i} onClick={() => onClickHandler(user)}>
      {user.username}
    </li>
  ));

  async function updateUsers() {
    const response = await axios.get("api/user/listUsers");
    setUsers(response.data);
    setUser({});
  }

  async function onClickHandler(user) {
    console.log(user);
    setUser(user);
    setNewUser(false);
    toggle();
  }

  function toggle() {
    setModal(!modal);
  }

  async function newUserHandler() {
    toggle();
    setTitle("New User");
    setNewUser(true);
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <button onClick={newUserHandler}>new user</button>
      <ul>{userList}</ul>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          {newUser && <NewUser toggle={toggle} updateUsers={updateUsers} />}
          {!newUser && (
            <UpdateUser toggle={toggle} updateUsers={updateUsers} user={user} />
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
  let text = `Select username,user_uid,permissions,notes from users`;
  let values = [];
  const dbResponse = await db.query(text, values);

  return { props: { users: dbResponse.rows } };
}
