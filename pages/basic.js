import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/layout";
import { useFetchUser } from "../lib/user";

export default function Basic(props) {
  const { user, loading } = useFetchUser();
  const [campaigns, setCampaigns] = useState("");
  useEffect(() => {
    axios
      .post("api/demo", {
        firstName: "Fred",
        lastName: "Flintstone"
      })
      .then(response => setCampaigns(JSON.stringify(response.data)));
  }, []);
  return (
    <Layout user={user} loading={loading}>
      <h1>Basic API CALL</h1>

      <p>{campaigns}</p>
    </Layout>
  );
}
