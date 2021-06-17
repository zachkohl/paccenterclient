import withSession from "../../../lib/session";
import db from "../../../lib/postgresSetup";
import checkPermission from "../../../lib/checkPermission";

export default withSession(async (req, res) => {
  const check = await checkPermission(req, "admin");
  if (check) {
    const text = `Select username,user_uid,permissions,notes from users`;
    const values = [];
    const response = await db.query(text, values);

    res.send(response.rows);
  } else {
    res.send("access denied");
  }
});
