import React, { useState } from "react";
import axios from "axios";
import Router from "next/router";
import styles from "./Layout.module.css";

export default function Signup(props) {
  const [newSignupName, setNewSignupName] = useState("");
  const [newSignupEmail, setNewSignupEmail] = useState("");
  const [newSignupPhone, setNewSignupPhone] = useState("");
  const [newSignupAddress1, setNewSignupAddress1] = useState("");
  const [newSignupAddress2, setNewSignupAddress2] = useState("");
  const [newSignupCity, setNewSignupCity] = useState("");
  const [newSignupCounty, setNewSignupCounty] = useState("");
  const [newSignupState, setNewSignupState] = useState("");
  const [newSignupZip, setNewSignupZip] = useState("");


  const submitHandler = (e) => {
    axios
      .post("/api/newSignup", {
        signupname:     newSignupName,
        signupemail:    newSignupEmail,
        signupphone:    newSignupPhone,
        signupaddress1: newSignupAddress1,
        signupaddress2: newSignupAddress2,
        signupcity:     newSignupCity,
        signupcounty:   newSignupCounty,
        signupstate:    newSignupState,
        signupzip:      newSignupZip,
      })
      .then(function (response) {
        if (response.data === "complete") {
          Router.push({
            pathname: "/dashboard",
          });
        }
      });
  };


  return (
    <div className={styles.form}>
      <div>


        <h4>Sign Up a New Person</h4>
        
        <label><p>Name:</p></label>
        <input
          placeholder='Name'
          value={newSignupName}
          onChange={(e) => setNewSignupName(e.target.value)} />
          
        <label><p>Email:</p></label>
        <input
          placeholder='Email'
          value={newSignupEmail}
          onChange={(e) => setNewSignupEmail(e.target.value)} />
       
        <label><p>Phone:</p></label>
        <input
          placeholder='Phone'
          value={newSignupPhone}
          onChange={(e) => setNewSignupPhone(e.target.value)} />
 
        <label><p>Address 1:</p></label>
        <input
          placeholder='Address 1'
          value={newSignupAddress1}
          onChange={(e) => setNewSignupAddress1(e.target.value)} />
 
        <label><p>Address 2:</p></label>
        <input
          placeholder='Address 2'
          value={newSignupAddress2}
          onChange={(e) => setNewSignupAddress2(e.target.value)} />
 
        <label><p>City:</p></label>
        <input
          placeholder='City'
          value={newSignupCity}
          onChange={(e) => setNewSignupCity(e.target.value)} />
 
        <label><p>County:</p></label>
        <input
          placeholder='County'
          value={newSignupCounty}
          onChange={(e) => setNewSignupCounty(e.target.value)} />
 
        <label><p>State:</p></label>
        <input
          placeholder='State'
          value={newSignupState}
          onChange={(e) => setNewSignupState(e.target.value)} />
 
        <label><p>ZIP Code:</p></label>
        <input
          placeholder='ZIP Code'
          value={newSignupZip}
          onChange={(e) => setNewSignupZip(e.target.value)} />




        <button onClick={submitHandler} className={styles.button}>Sign Up</button>
      
      </div>
    </div>
  );
}

