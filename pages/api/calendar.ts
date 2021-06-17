import axios from "axios";
import checkPermission from "../../lib/checkPermission";
import withSession from "../../lib/session";
export default withSession(async (req, res) => {
  const check = await checkPermission(req, "calendar");
  if (check) {
    const user = req.session.get("user");
    const params = req.body;
    if (user) {
      const address =
        process.env.NODE_ENV === "production"
          ? "https://pythonpacapi.herokuapp.com/create"
          : "http://localhost:5000/create";

      const response = await axios.post(address, {
        ...params,
        key: process.env.pythonapi,
      });
      res.send(response.data);
    } else {
      res.send("access denied");
    }
  }
});
