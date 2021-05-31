import react, { useState, useEffect } from "react";
import Home from "../components/Home";
import useUser from "../lib/useUser";
import axios from "axios";

function CalendarUpdatePage(props) {
  const { user } = useUser({ redirectTo: "/login" });
  if (!user || user.isLoggedIn === false) {
    return <div>loading...</div>;
  }
  const [name, setName] = useState("");
  const [uid, setUid] = useState(props.uid);
  const [data, setData] = useState("");
  const [description, setDescription] = useState("");

  async function submitHandler() {
    const response = await axios.post("/api/calupdate", { name, uid });
    if (response) {
      alert("event updated");
      window.location.reload();
    }
  }

  return (
    <div>
      <h1>Add volunteer or question to event</h1>
      <label>
        Name of event attender or text of question:
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <div style={{ margin: "100px" }}>
        <button onClick={submitHandler}>Submit change</button>
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
          <pre>{props.description}</pre>
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
