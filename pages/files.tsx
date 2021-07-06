import react, { useState, useEffect } from "react";
import db from "../lib/postgresSetup";
import useUser from "../lib/useUser";

import { useRouter } from "next/router";
import axios from "axios";
import React from "react";
import Link from "next/link";

function FilesPage(props) {
  const [files, setFiles] = useState([]);
  const { user } = useUser({ redirectTo: "/login", permission: "files" });

  async function getFiles() {
    const response = await axios.get("./api/listFiles");
    if (typeof response.data === "object") {
      setFiles(response.data);
    } else {
      console.log("error downloading file names");
    }
  }

  console.log("helloo2");
  useEffect(() => {
    getFiles();
  }, []);

  const fileLinks = files.map((file) => {
    console.log(file);
    return (
      <li key={file.name}>
        <Link href={`./api/file/${file.name}`}>
          <a>{file.name}</a>
        </Link>
      </li>
    );
  });

  if (!user || user.isLoggedIn === false) {
    return <div>loading...</div>;
  } else {
    return (
      <div style={{ marginLeft: "10px" }}>
        <h1>Files</h1>
        <p>
          to save a file, please right click the link and select "save link as"
        </p>
        <ul>{fileLinks}</ul>
      </div>
    );
  }
}

export default FilesPage;
