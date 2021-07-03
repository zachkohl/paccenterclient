import react, { useState, useEffect } from "react";
import Home from "../components/Home";
import useUser from "../lib/useUser";
import axios from "axios";

function CalendarUpdatePage(props) {
  const [attender, setAttender] = useState("");
  const [question, setQuestion] = useState("");
  const [uid, setUid] = useState(props.uid);
  const [data, setData] = useState("");
  const [description, setDescription] = useState(props.description);
  const { user } = useUser({ redirectTo: "/login", permission: "calendar" });
  if (!user || user.isLoggedIn === false) {
    return <div>loading...</div>;
  }
  async function submitQuestionHandler() {
    const payload = "question: " + question;

    const response = await axios.post("/api/calupdate", {
      name: payload,
      uid,
    });
    if (response) {
      alert("event updated");
      window.location.reload();
    }
  }

  async function submitAttenderHandler() {
    const payload = "attending: " + attender;

    const response = await axios.post("/api/calupdate", {
      name: payload,
      uid,
    });
    if (response) {
      alert("event updated");
      window.location.reload();
    }
  }

  async function updateDescription() {
    const payload = description;

    const response = await axios.post("/api/calDescriptionUpdate", {
      newDescription: payload,
      uid,
    });
    if (response) {
      alert("event updated");
      window.location.reload();
    }
  }

  return (
    <div>
      <h1>Add volunteer or question to event</h1>
      <label>
        Add attender
        <input value={attender} onChange={(e) => setAttender(e.target.value)} />
      </label>
      <div style={{ margin: "10px" }}>
        <button onClick={submitAttenderHandler}>Submit Attender</button>
      </div>
      <label>
        Add question
        <input value={question} onChange={(e) => setQuestion(e.target.value)} />
      </label>
      <div style={{ margin: "10px" }}>
        <button onClick={submitQuestionHandler}>Submit Question</button>
      </div>
      <div>
        <h3>event notes</h3>
        <p>
          (This website grabs a fresh copy of the event details and notes on
          every refresh; your phone only refreshes the notes every 5 minutes or
          so, keep this in mind if you don't see stuff update on your phone
          right away)
        </p>
        <div
          style={{
            border: "1px solid black",
            display: "inline-block",
            padding: "20px",
          }}
        >
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <button onClick={updateDescription}>update description</button>
        </div>
      </div>
      <div>
        <b>full event details from the ics file</b>
        <pre>{props.data}</pre>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const address =
    process.env.NODE_ENV === "production"
      ? "https://pythonpacapi.herokuapp.com/getFacts"
      : "http://localhost:5000/getFacts";
  try {
    const response = await axios.post(address, {
      ...ctx.query,
      key: process.env.pythonapi,
    });
    return { props: { ...ctx.query, ...response.data } };
  } catch (error) {
    console.log(error);
    return {};
  }
}

export default CalendarUpdatePage;
