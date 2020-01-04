import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import store from "../redux/store";
import "../style.css";
import Link from "next/link";

const Inner = props => {
  const [text, setText] = useState("");
  const globalState = useSelector(state => JSON.stringify(state, null, 2));
  const dispatch = useDispatch();
  useEffect(() => {
    setText(globalState);
  }, []); //only runs when component is mounted
  const onClickHandler = () => {
    try {
      const payload = JSON.parse(text);
      dispatch({ type: "BACKUP", payload: payload });
    } catch (error) {
      alert(error);
    }
  };

  const onChangeHandler = event => {
    setText(event.target.value);
    console.log(text);
  };
  return (
    <div>
      <textarea value={text} onChange={onChangeHandler}></textarea>
      <button onClick={onClickHandler}>update state and local storage</button>
    </div>
  );
};

const backup = props => {
  return (
    <Provider store={store}>
      <h1>backup your local storage</h1>
      <p>
        simply copy the json text in the textarea box to notepad or some other
        text editor. Save the file.
      </p>
      <p>
        to restore your backup, simply open your saved text file and paste in
        the data, then click the "update state and local storage" button.
      </p>
      <p>
        There is not server communication with this app, everything is based off
        of local storage. if you screw something up and start getting crazy
        errors, contact the developer for help fixing the sitaution.
      </p>
      <Link href="/index">
        <a>back to main app</a>
      </Link>
      <Inner />
    </Provider>
  );
};
export default backup;
