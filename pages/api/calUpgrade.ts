const db = require("../../lib/postgresSetup");
const axios = require("axios");
import checkPermission from "../../lib/checkPermission";
import withSession from "../../lib/session";

export default withSession(async (req, res) => {
  const check = await checkPermission(req, "calendar");
  if (check) {
    const params = req.body;

    const address =
      process.env.NODE_ENV === "production"
        ? "https://pythonpacapi.herokuapp.com/upgrade"
        : "http://localhost:5000/upgrade";

    console.log(params);

    const response = await axios.post(address, {
      ...params,
      key: process.env.pythonapi,
    });
    console.log(response.data);
    res.send(response.data);
  } else {
    res.send("access denied");
  }
});
