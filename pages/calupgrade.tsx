import react, { useState } from "react";
import Home from "../components/Home";
import useUser from "../lib/useUser";
import axios from "axios";

function CalUpgradePage(props) {
  const { user } = useUser({ redirectTo: "/login", permission: "calendar" });
  const [name, setName] = useState("");
  if (!user || user.isLoggedIn === false) {
    return <div>loading...</div>;
  }

  async function submitHandler() {
    const response = await axios.post("/api/calUpgrade", { name });
  }

  return (
    <div>
      <h1>Event Upgrade Tool</h1>

      <div style={{ margin: "100px" }}>
        <button onClick={submitHandler}>
          Upgrade events to include nav link
        </button>
      </div>
    </div>
  );
}

export default CalUpgradePage;
