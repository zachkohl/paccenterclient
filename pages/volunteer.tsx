import { useState, useRef, useEffect } from "react";

import axios from "axios";

function VolunteerSignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [potentialCandidate, setPotentialCandidate] = useState(false);

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("ID");
  const [zip, setZip] = useState("");

  async function HandleSubmit() {
    const payload = {
      firstName,
      lastName,
      phone,
      potentialCandidate,
      street,
      city,
      state,
      zip,
    };
    const response = await axios.post("/api/volunteerApi", payload);

    if (response.data === "complete") {
      alert("Data logged to successfully! Thank you for voluntering!");
      window.location.reload();
    } else {
      alert("Something went wrong on the backend, please try again");
    }
  }

  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <div id="spacer" style={{ margin: "10px" }}>
      <h1 style={{ fontSize: "4rem" }}>
        Sign up to help with political campaigns
      </h1>
      <div id="signupArea">
        <div style={{ margin: "5px" }}>
          <label>
            First Name:{" "}
            <input
              ref={ref}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
          </label>
        </div>
        <div style={{ margin: "5px" }}>
          <label>
            Last Name:{" "}
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></input>
          </label>
        </div>
        <div style={{ margin: "5px" }}>
          <label>
            Phone:{" "}
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></input>
          </label>
        </div>
        <div style={{ margin: "5px" }}>
          <label>
            Email:{" "}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </label>
        </div>
        <div style={{ margin: "10px" }}>
          <div style={{ margin: "5px" }}>
            <label>
              <input
                type="checkbox"
                checked={potentialCandidate}
                onChange={(e) => {
                  setPotentialCandidate(e.target.checked);
                }}
                onKeyPress={(e) => {
                  setPotentialCandidate(!potentialCandidate);
                }}
              ></input>
              I am potentially willing serve as an elected official (everyone
              should check this box){" "}
            </label>
          </div>
          {potentialCandidate && (
            <div>
              <p>
                please enter your address (we need this to try to match you up
                with potential races)
              </p>
              <div style={{ margin: "5px" }}>
                <label>
                  Street:{" "}
                  <input
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  ></input>
                </label>
              </div>
              <div style={{ margin: "5px" }}>
                <label>
                  City:{" "}
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  ></input>
                </label>
              </div>
              <div style={{ margin: "5px" }}>
                <label>
                  State:{" "}
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                  </select>
                </label>
              </div>
              <div style={{ margin: "5px" }}>
                <label>
                  Zip:{" "}
                  <input
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  ></input>
                </label>
              </div>
            </div>
          )}
        </div>
        <div style={{ margin: "10px", marginTop: "50            px" }}>
          <button onClick={HandleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default VolunteerSignupPage;
