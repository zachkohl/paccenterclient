import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Layout.module.css";
import useUser from "../lib/useUser";
import Link from "next/link";
export default function Home(props) {
  const [loggedInStatus, setLoggedInStatus] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setLoggedInStatus(user.isLoggedIn ? "logged in" : "not logged in");
      setIsLoggedIn(user.isLoggedIn);
    }
  }, [user]);
  async function logout() {
    const response = await axios.get("/api/logout");
    window.location.reload();
  }

  return (
    <div className={styles.background}>
      <div>
        <h2>Welcome to PACCENTER!</h2>

        {!isLoggedIn && (
          <div>
            <p>
              {" "}
              To view our cool extra tools, please log in using your bonner
              gitea username and password
            </p>
            <a href="/login">Login</a>{" "}
          </div>
        )}
      </div>
      {isLoggedIn && (
        <div>
          {user.permissions["calendar"] && (
            <div>
              <Link href="https://cal.bonner.hopto.org/user1/eccc554d-2a25-6b9e-ee95-59d96066cea4/">
                https://cal.bonner.hopto.org/user1/eccc554d-2a25-6b9e-ee95-59d96066cea4/
              </Link>
              <p>
                above is the link to the pac calendar. Please subscribe to it
                with your phone or other software
              </p>
              <p>
                {"This is the link to browser based calendar "}
                <a href="/calendar">Calendar</a>{" "}
              </p>
            </div>
          )}
          {user.permissions["districtLookup"] && (
            <p>
              {" "}
              <a href="/running">Check what districts you are in (BETA)</a>{" "}
            </p>
          )}
          {user.permissions["report"] && (
            <p>
              {" "}
              <a href="/report">Submit meeting or event notes</a>{" "}
            </p>
          )}
          {user.permissions["volunteer"] && (
            <p>
              {" "}
              <a href="/volunteer">Volunteer</a>{" "}
            </p>
          )}
          {user.permissions["admin"] && (
            <p>
              {" "}
              <a href="/admin">Administer paccenter accounts</a>{" "}
            </p>
          )}
          <p>
            {" "}
            <button onClick={logout}>Logout</button>{" "}
          </p>
        </div>
      )}
    </div>
  );
}
