const db = require("../../lib/postgresSetup");
const axios = require("axios");
export default async (req, res) => {
  const params = req.body;

  const address =
    process.env.NODE_ENV === "production" ? "" : "http://localhost:5000/create";

  console.log(params);

  const response = await axios.post(address, params);
  console.log(response.data);
  res.send(response.data);
};