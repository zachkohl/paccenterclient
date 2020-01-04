import ReactDOM from "react-dom";
import React from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import Link from "next/link";

const index = props => {
  return (
    <Provider store={store}>
      <p>welcome to PACCENTER</p>
    </Provider>
  );
};
export default index;
