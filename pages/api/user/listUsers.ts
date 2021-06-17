import withSession from "../../../lib/session";
import db from "../../../lib/postgresSetup";

export default withSession(async (req, res) => {
  const text = `Select username,user_uid,permissions,notes from users`;
  const values = [];
  const response = await db.query(text, values);

  res.send(response.rows);
});
