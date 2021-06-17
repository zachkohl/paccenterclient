import withSession from "../../../lib/session";
import db from "../../../lib/postgresSetup";
import checkPermission from "../../../lib/checkPermission";

export default withSession(async (req, res) => {
  const check = await checkPermission(req, "admin");
  if (check) {
    try {
      const text = `DELETE FROM users where user_uid=$1`;
      const values = [req.body.user_uid];
      const response = await db.query(text, values);

      res.send("complete");
    } catch (e) {
      res.send(e);
    }
  } else {
    res.send("access denied");
  }
});
