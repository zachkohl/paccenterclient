import React, { useState } from "react";
import MarkdownEditor from "./MarkdownEditor";
import SaveDialog from "./SaveDialog";
import Button from "@material-ui/core/Button";
import axios from "axios";
function reporterPage() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("**Hello world!!!**");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fileName, setFileName] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
  };

  async function push(e) {
    for (let i = 0; i < fileName.length; i++) {
      if (fileName[i] === ".") {
        alert(
          "please do not use a period in your filename. The .md will be addeded on the server. Fix your filename and try again"
        );
        return;
      }
    }

    const response = await axios.post("/api/reportapi/submit_report", {
      markdown: value,
      userName: userName,
      password: password,
      fileName: fileName,
    });
    alert(response.data);
  }

  return (
    <div>
      filename:
      <input value={fileName} onChange={(e) => setFileName(e.target.value)} />
      <MarkdownEditor value={value} setValue={setValue} />
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Save
      </Button>
      <SaveDialog open={open} onClose={handleClose}>
        Username:
        <input value={userName} onChange={(e) => setUserName(e.target.value)} />
        Password:
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <Button onClick={push}>Submit</Button>
      </SaveDialog>
    </div>
  );
}

export default reporterPage;
