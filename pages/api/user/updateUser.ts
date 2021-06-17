import fetchJson from "../../../lib/fetchJson";
import withSession from "../../../lib/session";
import bcrypt from "bcrypt";
import db from "../../../lib/postgresSetup";

export default withSession(async (req, res) => {
  const user_uid = req.body.user_uid;
  const username = req.body.username;
  const password = req.body.password;
  const permissions = req.body.permissions;
  const updatePassword = req.body.updatePassword;
  const notes = req.body.notes;
  if (updatePassword) {
    const hashed = await bcrypt.hash(password, 10);
    try {
      const text = `UPDATE users SET notes=$1, permissions=$2, hash=$3 WHERE user_uid=$4`;
      const values = [notes, permissions, hashed, user_uid];
      const response = await db.query(text, values);

      res.send("complete");
    } catch (e) {
      res.send(e);
    }
  } else {
    try {
      const text = `UPDATE users SET notes=$1, permissions=$2 WHERE user_uid=$3`;
      const values = [notes, permissions, user_uid];
      const response = await db.query(text, values);
      res.send("complete");
    } catch (e) {
      res.send(e);
    }
  }
});
