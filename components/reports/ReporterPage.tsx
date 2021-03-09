import React, { useState, useEffect } from "react";
import MarkdownEditor from "./MarkdownEditor";
import SaveDialog from "./SaveDialog";
import Button from "@material-ui/core/Button";
import axios from "axios";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";
import Select from "react-select";
function reporterPage() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("**Hello world!!!**");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fileName, setFileName] = useState("");
  const [juristiction, setJuristiction] = useState({
    value: {
      isJuristiction: false,
      organizations: [],
    },
    label: "",
  });
  const [organization, setOrganization] = useState({
    value: {
      isOrganization: false,
      meetings: [],
    },
    label: "",
  });
  const [meeting, setMeeting] = useState({
    value: {
      isMeeting: false,
    },
    label: "",
  });

  useEffect(() => {
    const place =
      juristiction.label + "_" + organization.label + "_" + meeting.label + "-";

    const time =
      selectedDay?.year.toString() +
      "-" +
      selectedDay?.month.toString() +
      "-" +
      selectedDay?.day.toString();
    setFileName(place + time);
    console.log(place);
    console.log(time);
  }, [juristiction, organization, meeting, selectedDay]);

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

  const Sandpoint = {
    isJuristiction: true,
    organizations: [
      {
        value: {
          isOrganization: true,
          meetings: [{ value: { isMeeting: true }, label: "meeting" }],
        },
        label: "City_Council",
      },
    ],
  };

  const BonnerCounty = {
    isJuristiction: true,
    organizations: [
      {
        value: {
          isOrganization: true,
          meetings: [{ value: "example value", label: "meeting" }],
        },
        label: "Board_of_Commissioners",
      },
      { value: "strawberry", label: "Bonnery County" },
    ],
  };

  const jurisdictions = [
    { value: Sandpoint, label: "Sandpoint" },
    { value: BonnerCounty, label: "Bonnery County" },
  ];

  return (
    <div>
      <h1>Situation Report</h1>
      Date of event:
      <DatePicker
        value={selectedDay}
        onChange={setSelectedDay}
        inputPlaceholder="Select day of event"
        shouldHighlightWeekends
      />
      <br />
      <label>
        Select Juristiction
        <Select
          options={jurisdictions}
          onChange={(option) => setJuristiction(option)}
          instanceId="1"
        />
      </label>
      {juristiction.value.isJuristiction && (
        <label>
          Select organization
          <Select
            options={juristiction.value.organizations}
            onChange={(option) => setOrganization(option)}
            instanceId="2"
          />
        </label>
      )}
      {organization.value.isOrganization && (
        <label>
          Select meeting
          <Select
            options={organization.value.meetings}
            onChange={(option) => setMeeting(option)}
            instanceId="3"
          />
        </label>
      )}
      <br />
      <label>
        filename:
        <input value={fileName} onChange={(e) => setFileName(e.target.value)} />
      </label>
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
