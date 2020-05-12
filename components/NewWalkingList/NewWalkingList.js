import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
function NewWalkingList(props) {
  const [name, setName] = useState("");
  const [lists, setLists] = useState("");
  function submit(e) {
    axios
      .post("/api/newWalkingList", {
        name: name,
      })
      .then(function (response) {
        console.log(response.data.name);
        if (response.data.name === "error") {
          alert("error, you probably used a name already assigned to a list");
        } else {
          updateList();
        }
      });
  }
  function updateList() {
    axios.get("/api/getWalkingList").then(function (response) {
      console.log(response.data);
      if (response.data.error == true) {
        alert("error: walking lists cannot be fetched");
      } else {
        console.log(response.data);
        const rows = response.data.rows;
        console.log(rows);
        const newLists = rows.map((row) => {
          return (
            <li key={row.id}>
              <Link href={`/list/${row.id}`}>
                <a>{row.name}</a>
              </Link>{" "}
              <Link href={`/printlist/${row.id}`}>
                <a>print</a>
              </Link>
            </li>
          );
        });
        console.log(newLists);
        setLists(newLists);
      }
    });
  }
  useEffect(() => {
    updateList();
  }, []);

  return (
    <div>
      <h3>Walking List</h3>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <div>
        <button onClick={submit}>Create</button>
      </div>
      <ul>{lists}</ul>
    </div>
  );
}

export default NewWalkingList;
