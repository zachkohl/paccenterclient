import ReactDOM from "react-dom";
import React from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import Link from "next/link";
import Login from "../components/Login";
import axios from "axios";

const BASE_URL = "http://localhost";
const check = props => {
  return (
    <Provider store={store}>
      <p>{props.user}</p>
    </Provider>
  );
};

check.getInitialProps = async ({ req, res }) => {
  //read request cookie status
  // const connectsid = cookie.get("connect.sid");
  const connectsid = req.headers.cookie;
  const session = req.headers.session;
  console.log(req.headers);
  console.log(connectsid);
  const config = {
    headers: { cookie: connectsid },
    withCredentials: true
  };

  axios
    .get(`${BASE_URL}/api/checkuser`, config)
    .then(function(response) {
      console.log(response);
      if (response.data.status === true) {
        const props = { user: response.data.username };
        return props;
      } else {
        console.log("not logged in");
        res.writeHead(302, {
          Location: "/"
        });
        res.send("not logged in");
      }
    })
    .catch(function(error) {
      console.log(JSON.stringify(error));
    });
};
export default check;
