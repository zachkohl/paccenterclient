import react, { useState, useRef, useEffect, useReducer } from "react";
const db = require("../../lib/postgresSetup");
import useUser from "../../lib/useUser";
import { DataGrid } from "@material-ui/data-grid";

import { useRouter } from "next/router";
import Link from "next/link";
import MaterialTable from "material-table";

function VisitsPage(props) {
  const { user } = useUser({ redirectTo: "/login" });
  const selected = useRef([]);
  const [visits, setVisits] = useState(props.visits);
  const columns = [
    { field: "name", title: "Name", editable: "never" },
    { field: "address", title: "Address", editable: "never" },
  ];

  if (!user || user.isLoggedIn === false) {
    return <div>loading...</div>;
  } else {
    return (
      <div style={{ margin: "10px" }}>
        <h1>List Page</h1>
        <div style={{ maxWidth: "auto" }}>
          <MaterialTable
            data={visits}
            columns={columns}
            options={{
              exportButton: true,
              pageSize: 100,
              pageSizeOptions: [5, 10, 25, 50, 100, 1000],
              selection: true,
            }}
            cellEditable={{
              onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                return new Promise((resolve, reject) => {
                  console.log("newValue: " + newValue);
                  console.log(columnDef);
                  const visitsUpdate = [...visits];
                  //@ts-ignore
                  const index = rowData.tableData.id;
                  console.log(index);
                  const newData = (rowData[columnDef.field] = newValue);
                  visitsUpdate[index] = rowData;
                  setVisits([...visitsUpdate]);
                  setTimeout(resolve, 1000);
                });
              },
            }}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const visitsUpdate = [...visits];
                    const index = oldData.tableData.id;
                    visitsUpdate[index] = newData;
                    setVisits([...visitsUpdate]);

                    resolve();
                  }, 1000);
                }),
            }}
            actions={[
              {
                tooltip: "Save updates to visits",
                icon: "save",
                onClick: (evt, data) => {
                  console.log("evt", evt);
                  console.log("data", data);
                  console.log("selected", selected.current);
                },
              },
            ]}
            onSelectionChange={(rows) => {
              selected.current = rows;
            }}
          />
        </div>
      </div>
    );
  }
}

function comparer(a, b) {
  if (a.reStreet < b.resStreet) {
    return -1;
  } else if (a.reStreet > b.resStreet) {
    return 1;
  } else if (a.resHouseNumber < b.resHouseNumber) {
    return -1;
  } else if (a.resHouseNumber > b.resHouseNumber) {
    return 1;
  } else {
    return 0;
  }
}

function comparerSortStreets(a, b) {
  if (a.ResStreet < b.ResStreet) {
    return -1;
  } else if (a.ResStreet > b.ResStreet) {
    return 1;
  } else if (
    parseInt(a.ResHouseNumber) % 2 === 0 &&
    parseInt(b.ResHouseNumber) % 2 != 0
  ) {
    return -1;
  } else if (
    parseInt(a.ResHouseNumber) % 2 != 0 &&
    parseInt(b.ResHouseNumber) % 2 === 0
  ) {
    return 1;
  } else if (a.ResHouseNumber < b.ResHouseNumber) {
    return -1;
  } else if (a.ResHouseNumber > b.ResHouseNumber) {
    return 1;
  } else {
    return 0;
  }
}

export async function getServerSideProps(ctx) {
  const uid = ctx.params.uid;
  let text = `select "FirstName","LastName","ResHouseNumber","ResPreDir","ResStreet","ResCityDesc","ResState","ResZip5",visits_uid as "id","notes" from bcvoterregmarch21 JOIN visits ON bcvoterregmarch21_uid=voter_uid WHERE survey_uid=$1`;
  let values = [uid];
  const dbResponse = await db.query(text, values);

  function sortByStreet(rows) {
    function comparer(a, b) {
      if (a.ResStreet < b.ResStreet) {
        return -1;
      } else if (a.ResStreet > b.ResStreet) {
        return 1;
      } else if (
        parseInt(a.ResHouseNumber) % 2 === 0 &&
        parseInt(b.ResHouseNumber) % 2 != 0
      ) {
        return -1;
      } else if (
        parseInt(a.ResHouseNumber) % 2 != 0 &&
        parseInt(b.ResHouseNumber) % 2 === 0
      ) {
        return 1;
      } else if (
        parseInt(a.ResHouseNumber) % 2 === 0 &&
        parseInt(b.ResHouseNumber) % 2 === 0
      ) {
        if (a.ResHouseNumber < b.ResHouseNumber) {
          return -1;
        } else if (a.ResHouseNumber > b.ResHouseNumber) {
          return 1;
        } else {
          return 0;
        }
      } else if (
        parseInt(a.ResHouseNumber) % 2 != 0 &&
        parseInt(b.ResHouseNumber) % 2 != 0
      ) {
        if (a.ResHouseNumber < b.ResHouseNumber) {
          return 1;
        } else if (a.ResHouseNumber > b.ResHouseNumber) {
          return -1;
        } else {
          return 0;
        }
      }
    }
    const sorted = rows.sort(comparer);
    return sorted;
  }
  //ResHouseNumber
  const sortedRows = sortByStreet(dbResponse.rows);

  const visits = sortedRows.map((visit) => {
    const address = `${visit.ResHouseNumber ? visit.ResHouseNumber : ""} ${
      visit.ResPreDir ? visit.ResPreDir : ""
    } ${visit.ResStreet ? visit.ResStreet : ""}, ${
      visit.ResCityDesc ? visit.ResCityDesc : ""
    } ${visit.ResState ? visit.ResState : ""}, ${
      visit.ResZip5 ? visit.ResZip5 : ""
    }`;
    const name = `${visit.FirstName ? visit.FirstName : ""} ${
      visit.LastName ? visit.LastName : ""
    }`;
    const notes = visit.notes == null ? "" : visit.notes;
    return { address, name, notes };
  });

  return { props: { visits: visits } };
}

export default VisitsPage;
