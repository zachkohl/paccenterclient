import react, { useState } from "react";
import Home from "../components/Home";
import useUser from "../lib/useUser";
import axios from "axios";

function CalendarPage(props) {
  const { user } = useUser({ redirectTo: "/login" });
  const [name, setName] = useState("");
  if (!user || user.isLoggedIn === false) {
    return <div>loading...</div>;
  }

  async function submitHandler() {
    const response = await axios.post("/api/calendar", { name });
  }

  return (
    <div>
      <h1>Event Creation Tool</h1>
      <label>
        Event Name:
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <div style={{ margin: "100px" }}>
        <button onClick={submitHandler}>Create event</button>
      </div>
    </div>
  );
}

export default CalendarPage;
