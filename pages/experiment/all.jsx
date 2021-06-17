import react, { useState, useEffect } from "react";
// const db = require("../../lib/postgresSetup");
import useUser from "../../lib/useUser";
import { DataGrid } from "@material-ui/data-grid";

import { useRouter } from "next/router";
import Link from "next/link";
import MaterialTable from "material-table";

function VisitsPage(props) {
  const { user } = useUser({ redirectTo: "/login" });

  const columns = [
    { field: "name", title: "Name" },
    { field: "address", title: "Address" },
    // { field: "FirstName", title: "First name" },
    // { field: "LastName", title: "Last name" },
    // { field: "ResHouseNumber", title: "ResHouseNumber" },
    // { field: "ResPreDir", title: "ResPreDir" },
    // { field: "ResStreet", title: "ResStreet" },

    // { field: "ResCityDesc", title: "ResCityDesc" },
    // { field: "ResState", title: "ResState" },
    // { field: "ResZip5", title: "ResZip5" },
  ];

  const visits = props.visits.map((visit) => {
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
    return { address: address, name: name };
  });

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
          />
        </div>
      </div>
    );
  }
}

export async function getServerSideProps(ctx) {
  // // let text = `select "FirstName","LastName","ResHouseNumber","ResPreDir","ResStreet","ResCityDesc","ResState","ResZip5",visits_uid as "id" from bcvoterregmarch21 JOIN visits ON bcvoterregmarch21_uid=voter_uid WHERE survey_uid=$1`;
  // let text = `select "FirstName","LastName","ResHouseNumber","ResPreDir","ResStreet","ResCityDesc","ResState","ResZip5" from bcvoterregmarch21`;

  // let values = [];
  // //  let values = [uid];
  // const dbResponse = await db.query(text, values);
  return { props: { visits: [] } };
}

export default VisitsPage;
