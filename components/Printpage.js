import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

function PrintWalkingList(props) {
  const router = useRouter();
  const { listId } = router.query;
  const [list, setList] = useState("");
  function updateList() {
    axios
      .post("/api/getList", { walkinglistId: listId })
      .then(function (response) {
        console.log(response.data);
        if (response.data.error == true) {
          alert("error: walking lists cannot be fetched");
        } else {
          console.log(response.data);
          const rows = response.data.rows;
          console.log(rows);
          const newLists = rows.map((row) => {
            return (
              <tr key={row.pointid}>
                <td style={{ border: "1px solid black" }}>
                  {Math.round(row.number)}
                </td>
                <td>{row.street}</td> <td>{row.streetnum}</td>
              </tr>
            );
          });
          console.log(newLists);
          setList(newLists);
        }
      });
  }
  useEffect(() => {
    updateList();
  }, []);

  return (
    <table>
      <tbody>{list}</tbody>
    </table>
  );
}

export default PrintWalkingList;
