import react, { useState, useEffect } from "react";
import db from "../lib/postgresSetup";
import useUser from "../lib/useUser";

import { useRouter } from "next/router";


function FilesPage(props) {
  const { user } = useUser({ redirectTo: "/login", permission: "files" });


  if (!user || user.isLoggedIn === false) {
    return <div>loading...</div>;
  } else {
    return (
      <div style={{ marginLeft: "10px" }}>
        <h1>Files</h1>
    
      </div>
    );
  }
}

export async function getServerSideProps(ctx) {
 
}

export default FilesPage;