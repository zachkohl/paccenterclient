import react, { useState, useEffect } from "react";
import db from "../lib/postgresSetup";
import useUser from "../lib/useUser";
import surveyTemplates from "../lib/surveyTemplates";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
function SurveysPage(props) {
  const [selectedTemp, setSelectedTemp] = useState("");
  const [surveyName, setSurveyName] = useState("");
  const [modal, setModal] = useState(false);
  const { user } = useUser({ redirectTo: "/login", permission: "surveys" });
  const router = useRouter();
  function toggle() {
    setModal(!modal);
  }

  const surveys = props.surveys.map((survey) => {
    return (
      <li key={survey.survey_uid}>
        <Link href={`/visits/${survey.survey_uid}`}>{survey.name}</Link>
      </li>
    );
  });

  const templates = props.templates.map((template) => (
    <option key={template}>{template}</option>
  ));

  async function createNewSurvey() {
    toggle();
  }

  async function createSurvey() {
    if (surveyName === "") {
      alert("please enter a name");
      return;
    }

    const response = await axios.post("api/surveys/newSurvey", {
      surveyName: surveyName,
      template: selectedTemp,
    });

    if (response.data === "complete") {
      router.replace(router.asPath);
      setSurveyName("");
      toggle();
    } else {
      alert("something went wrong");
    }
  }

  if (!user || user.isLoggedIn === false) {
    return <div>loading...</div>;
  } else {
    return (
      <div style={{ marginLeft: "10px" }}>
        <h1>Survey Page</h1>
        <p>create new Template</p>
        <select
          value={selectedTemp}
          onChange={(e) => setSelectedTemp(e.target.value)}
        >
          {templates}
        </select>
        <button onClick={createNewSurvey}>
          Create new survey from template
        </button>
        <ul>{surveys}</ul>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>create new survey</ModalHeader>
          <ModalBody>
            <label>
              survey name:
              <input
                value={surveyName}
                onChange={(e) => setSurveyName(e.target.value)}
              ></input>
            </label>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={createSurvey}>
              Create Survey
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export async function getServerSideProps(ctx) {
  const templates = surveyTemplates.map((survey) => survey.name);

  let text = `select survey_uid,name from surveys`;
  let values = [];

  const dbResponse = await db.query(text, values);
  return { props: { surveys: dbResponse.rows, templates: templates } };
}

export default SurveysPage;
