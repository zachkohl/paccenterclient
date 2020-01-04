import ReactDOM from "react-dom";
import React from "react";
// import "../style.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import Value from "../components/value";
import Add from "../components/add";
import Subtract from "../components/subtract";
import NewRole from "../components/newrole";
import Header from "../components/Header";
import DisplayRoles from "../components/DisplayRoles";
import "../style.css";
import Link from "next/link";

const index = props => {
  return (
    <Provider store={store}>
      <Header />
      <NewRole />
      <DisplayRoles />
      <Link href="/backup">
        <a>backup data</a>
      </Link>
    </Provider>
  );
};
export default index;
