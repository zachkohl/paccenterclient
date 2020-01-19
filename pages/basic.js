import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/layout";
import { useFetchUser } from "../lib/user";

export default function Basic(props) {
  const { user, loading } = useFetchUser();
  const [campaigns, setCampaigns] = useState("");
  useEffect(() => {
    axios(
      "https://paccenterapi.herokuapp.com/api/CheckCampaigns"
    ).then(response => setCampaigns(response));
  }, []);
  return (
    <Layout user={user} loading={loading}>
      <h1>Basic API CALL</h1>

      <p>{campaigns}</p>
    </Layout>
  );
}
