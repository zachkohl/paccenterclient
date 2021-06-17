import db from "../lib/postgresSetup";
import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import NewUser from "../components/RegisterNewUser";
import axios from "axios";
import UpdateUser from "../components/UpdateUser";
import useUser from "../lib/useUser";
function AdminPage(props) {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState(<div>hello world</div>);
  const [users, setUsers] = useState(props.users);
  const [newUser, setNewUser] = useState(false);
  const [formUser, setFormUser] = useState({});
  const { user } = useUser({ redirectTo: "/login", permission: "admin" });
  if (!user || user.isLoggedIn === false) {
    return <div>loading...</div>;
  }

  const userList = users.map((userx, i) => (
    <li key={i} onClick={() => onClickHandler(userx)}>
      {userx.username}
    </li>
  ));

  async function updateUsers() {
    const response = await axios.get("api/user/listUsers");
    setUsers(response.data);
    setFormUser({});
  }

  async function onClickHandler(usery) {
    setFormUser(usery);
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
            <UpdateUser
              toggle={toggle}
              updateUsers={updateUsers}
              user={formUser}
            />
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
