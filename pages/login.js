import ReactDOM from "react-dom";
import React from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import Link from "next/link";
import Login from "../components/Login";
import Layout from "../components/layout";
const index = props => {
  return (
    <Provider store={store}>
      <Layout>
        <Login />
      </Layout>
    </Provider>
  );
};
export default index;
