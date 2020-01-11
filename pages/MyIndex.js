import ReactDOM from "react-dom";
import React from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import Link from "next/link";
import Login from "../components/Login";
import demonstration from "../utilities/config";

const index = props => {
  return (
    <Provider store={store}>
      <Login />
    </Provider>
  );
};
export default index;
