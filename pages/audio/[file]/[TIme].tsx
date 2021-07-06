import react, { useState, useEffect } from "react";
import db from "../../../lib/postgresSetup";
import useUser from "../../../lib/useUser";
import ReactAudioPlayer from "react-audio-player";
import { useRouter } from "next/router";
import axios from "axios";
import React, { useRef } from "react";
import Link from "next/link";

function FilesPage(props) {
  const [files, setFiles] = useState([]);
  const { user } = useUser({ redirectTo: "/login", permission: "files" });
  const audio = useRef(null);
  const router = useRouter();
  const { file, Time } = router.query;

  if (!user || user.isLoggedIn === false) {
    return <div>loading...</div>;
  } else {
    return (
      <div style={{ marginLeft: "10px" }}>
        <h1>Audio</h1>
        <ReactAudioPlayer
          src={`/api/file/${file}`}
          autoPlay
          controls
          ref={audio}
          onCanPlayThrough={() => {
            console.log(audio.current.audioEl.current.currentTime);
          }}
        />
      </div>
    );
  }
}

export default FilesPage;
