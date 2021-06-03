import react, { useState, useEffect } from "react";
const db = require("../lib/postgresSetup");
import useUser from "../lib/useUser";

import { useRouter } from "next/router";
import Link from "next/link";

function SurveysPage(props) {
  const { user } = useUser({ redirectTo: "/login" });

  const surveys = props.surveys.map((survey) => {
    return (
      <li key={survey.survey_uid}>
        <Link href={`/visits/${survey.survey_uid}`}>{survey.name}</Link>
      </li>
    );
  });

  if (!user || user.isLoggedIn === false) {
    return <div>loading...</div>;
  } else {
    return (
      <div style={{ marginLeft: "10px" }}>
        <h1>Survey Page</h1>
        <ul>{surveys}</ul>
      </div>
    );
  }
}

export async function getServerSideProps(ctx) {
  let text = `select survey_uid,name from surveys`;
  let values = [];
  const dbResponse = await db.query(text, values);
  return { props: { surveys: dbResponse.rows } };
}

export default SurveysPage;
