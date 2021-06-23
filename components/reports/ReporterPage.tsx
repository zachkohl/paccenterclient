import React, { useState, useEffect, useRef } from "react";
import ReactMde, { Command, Suggestion } from "react-mde";
import ReactMarkdown from "react-markdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import SaveDialog from "./SaveDialog";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import axios from "axios";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";
import Select from "react-select";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import {
  juristiction,
  organization,
  meeting,
} from "./juristictionsOrgsMeetings/juristictionTypes";

import validator from "validator";
function reporterPage(props) {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      popover: {
        pointerEvents: "none",
      },
      paper: {
        padding: theme.spacing(1),
      },
    })
  );

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);

  type mdeMode = "write" | "preview";
  const textOp = useRef(null);
  const politicians = useRef(null);
  const [politicianButtons, setPoliticianButtons] = useState(["test"]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTab, setSelectedTab] = useState("write" as mdeMode);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fileName, setFileName] = useState("");
  const [juristiction, setJuristiction] = useState<juristiction>({
    value: {
      isJuristiction: false,
      organizations: [],
    },
    label: "",
  });
  const [organization, setOrganization] = useState<organization>({
    value: {
      isOrganization: false,
      meetings: [],
    },
    label: "",
  });
  const [meeting, setMeeting] = useState<meeting>({
    value: {
      isMeeting: false,
      politicians: [],
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

    if (!validator.isAscii(value)) {
      alert(
        "Your report has non Ascii characters, which are not allowed. Please remove any special, strange, characters and try again."
      );
      return;
    }

    const response = await axios.post("/api/reportapi/submit_report", {
      markdown: value,
      userName: userName,
      password: password,
      fileName: fileName,
    });
    alert(response.data);
    window.location.reload();
  }

  function loadSuggestions(text): Promise<Suggestion[]> {
    return new Promise((accept, reject) => {
      setTimeout(() => {
        const suggestions = [
          {
            preview: "TaxOffLand",
            value: "#TaxOffLand",
          },
          {
            preview: "Morality",
            value: "#morality",
          },
          {
            preview: "KeyLocalIssue3",
            value: "#keyissue3",
          },
          {
            preview: "KeyLocalIssue4",
            value: "#keyissue4",
          },
        ].filter((i) => i.preview.toLowerCase().includes(text.toLowerCase()));
        accept(suggestions as unknown as Promise<Suggestion[]>);
      }, 100);
    });
  }
  function handlePolitician(name) {
    if (textOp) {
      const string = ` #${name}`;
      textOp.current.textApi.replaceSelection(string);
    }
  }

  useEffect(() => {
    const list = meeting.value.politicians.map((politician) => {
      return (
        <li key={politician} onClick={(e) => handlePolitician(politician)}>
          {politician}
        </li>
      );
    });
    console.log(list);
    politicians.current = list;
  }, [meeting]);

  const politicianCommand: Command = {
    icon: () => (
      <span role="img" aria-label="Politician">
        <PopupState variant="popover" popupId="demo-popup-popover">
          {(popupState) => (
            <span>
              <span color="primary" {...bindTrigger(popupState)}>
                Politician
              </span>
              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <ul>{politicians.current}</ul>
              </Popover>
            </span>
          )}
        </PopupState>
      </span>
    ),
    execute: (opts) => {
      textOp.current = opts;
    },
  };
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
          options={props.records}
          onChange={(option) => setJuristiction(option)}
          instanceId="1"
        />
      </label>
      <br />
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
      <br />
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
      <ReactMde
        value={value}
        onChange={setValue}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(<ReactMarkdown source={markdown} />)
        }
        loadSuggestions={loadSuggestions}
        suggestionTriggerCharacters={["#"]}
        commands={{
          politician: politicianCommand,
        }}
        toolbarCommands={[
          ["header", "bold", "italic", "strikethrough"],
          ["link", "quote", "code"],
          ["unordered-list", "ordered-list", "checked-list"],
          ["politician"],
        ]}
      />
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Save
      </Button>
      <SaveDialog open={open} onClose={handleClose}>
        <br />
        <Button onClick={push}>Submit</Button>
      </SaveDialog>
    </div>
  );
}

export default reporterPage;
