import react, { useState } from "react";
import Home from "../components/Home";
import useUser from "../lib/useUser";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useRouter } from "next/router";

function CalendarPage(props) {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [uid, setUid] = useState("");
  const toggle = () => setModal(!modal);
  const router = useRouter();
  const { user } = useUser({ redirectTo: "/login" });
  const [name, setName] = useState("");
  if (!user || user.isLoggedIn === false) {
    return <div>loading...</div>;
  }

  const localizer = momentLocalizer(moment); // or globalizeLocalizer
  async function selectHandler(event) {
    toggle();
    setNotes(event.description);
    setTitle(event.title);
    setUid(event.uid);
  }

  async function goToHandler() {
    router.push(`/calupdate?uid=${uid}`);
  }

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={props.events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "95vh" }}
        onSelectEvent={selectHandler}
      />
      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>{title}</ModalHeader>
          <ModalBody>
            <pre>{notes}</pre>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={goToHandler}>
              Go to edit details
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}

CalendarPage.getInitialProps = async (ctx) => {
  const address =
    process.env.NODE_ENV === "production"
      ? "https://pythonpacapi.herokuapp.com/getAll"
      : "http://localhost:5000/getAll";

  const response = await axios.post(address, {
    ...ctx.query,
    key: process.env.pythonapi,
  });
  const events = JSON.parse(response.data.events);
  return { ...ctx.query, events: events };
};

export default CalendarPage;
