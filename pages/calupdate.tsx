import react, { useState } from "react";
import Home from "../components/Home";
import useUser from "../lib/useUser";
import axios from "axios";

function CalendarUpdatePage(props) {
  // const { user } = useUser({ redirectTo: "/login" });
  const [name, setName] = useState("");
  const [uid, setUid] = useState(props.uid);
  // if (!user || user.isLoggedIn === false) {
  //   return <div>loading...</div>;
  // }

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
        Event Name:
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <div style={{ margin: "100px" }}>
        <button onClick={submitHandler}>Create event</button>
      </div>
    </div>
  );
}

CalendarUpdatePage.getInitialProps = async (ctx) => {
  return { ...ctx.query };
};

export default CalendarUpdatePage;
