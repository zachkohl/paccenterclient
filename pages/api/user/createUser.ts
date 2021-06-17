import fetchJson from "../../../lib/fetchJson";
import withSession from "../../../lib/session";
import bcrypt from "bcrypt";
import db from "../../../lib/postgresSetup";
import checkPermission from "../../../lib/checkPermission";

export default withSession(async (req, res) => {
  const check = await checkPermission(req, "admin");
  if (check) {
    const username = req.body.username;
    const password = req.body.password;
    const permissions = req.body.permissions;
    const notes = req.body.notes;
    try {
      const hashed = await bcrypt.hash(password, 10);
      const text = `INSERT INTO USERS(username,hash,permissions,notes) VALUES($1,$2,$3,$4) RETURNING *`;
      const values = [username, hashed, permissions, notes];
      const response = await db.query(text, values);

      if (response.rows.length > 0) {
        res.send("complete");
      } else {
        res.send("failure");
      }
    } catch (e) {
      res.send(e);
    }
  } else {
    res.send("access denied");
  }
});
