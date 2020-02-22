import React, { useState } from "react";
import Head from "next/head";
import Cookies from "js-cookie";
//import ToolLinks from "./ToolLinks";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import Link from "next/link";
import styled from "styled-components";
const GreyLink = styled.a`
  color: grey;
`;
function Layout(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);
  console.log(props.campaignList);
  const justCampaigns = Object.keys(props.campaignList);
  const campaignList = justCampaigns.map(campaign => {
    console.log(campaign);
    return (
      <option value={campaign} key={campaign}>
        {campaign}
      </option>
    );
  });

  const logout = async () => {
    if (typeof window != "undefined") {
      Cookies.remove("bearer", { path: "/" });
      window.location.href = `http://localhost:3000/`;
    }
  };

  return (
    <div>
      <style jsx>{`
        .header {
          background-color: #f5aa42;
          height: 4em;
          width: 100%;
          display: flex;
        }

        .campaignSelector {
          float: right;
        }

        .sideBar {
          width: 10vw;
          height: 100vh;
          float: left;
          background-color: blue;
        }

        .contentArea {
          posistion: relative;
        }
      `}</style>
      <Head>
        <title>{props.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="header">
        <div>
          <h1>PACCENTER</h1>
        </div>
        <select className="campaignSelector">{campaignList}</select>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>Account</DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={logout}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="sideBar">{"<ToolLinks />"}</div>
      <div className="contentArea">{props.children}</div>
    </div>
  );
}

export default Layout;
