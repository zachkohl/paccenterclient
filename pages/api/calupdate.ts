const db = require("../../lib/postgresSetup");
const axios = require("axios");
export default async (req, res) => {
  const params = req.body;

  const address =
    process.env.NODE_ENV === "production"
      ? "https://pythonpacapi.herokuapp.com/update"
      : "http://localhost:5000/update";

  console.log(params);

  const response = await axios.post(address, {
    ...params,
    key: process.env.pythonapi,
  });
  console.log(response.data);
  res.send(params);
};
