import React, { useState } from "react";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import "react-mde/lib/styles/css/react-mde-all.css";

type options = "write" | "preview";

function MarkdownEditor(props) {
  const [selectedTab, setSelectedTab] = useState<options>("write");

  const save = async function* (data) {
    alert("feature not yet supported");
    return false;
  };

  return (
    <div className="container">
      <ReactMde
        value={props.value}
        onChange={props.setValue}
        selectedTab={selectedTab}
        onTabChange={(option) => setSelectedTab(option)}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(<ReactMarkdown source={markdown} />)
        }
        childProps={{
          writeButton: {
            tabIndex: -1,
          },
        }}
        paste={{
          saveImage: save,
        }}
      />
    </div>
  );
}

export default MarkdownEditor;
