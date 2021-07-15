import fetchJson from "../../../lib/fetchJson";
import withSession from "../../../lib/session";
import bcrypt from "bcrypt";
import db from "../../../lib/postgresSetup";
import checkPermission from "../../../lib/checkPermission";
import axios from "axios";

export default withSession(async (req, res) => {
  const check = await checkPermission(req, "admin");
  const { user_uid } = req.session.get("user");
  if (check) {
    const username = req.body.username;
    const password = req.body.password;
    const permissions = req.body.permissions;
    const notes = req.body.notes;

    try {
      const hashed = await bcrypt.hash(password, 10);
      let text = `INSERT INTO USERS(username,hash,permissions,notes) VALUES($1,$2,$3,$4) RETURNING *`;
      let values = [username, hashed, permissions, notes];
      const response = await db.query(text, values);

      if (response.rows.length > 0) {
        if (req.body.potential_uid) {
          console.log("got here");
          const date = Date();
          text = `UPDATE potentialmembers SET user_uid=$1, approver_uid=$2  WHERE potentialmember_uid=$3`;
          values = [
            response.rows[0].user_uid,
            user_uid,
            req.body.potential_uid
          ];
          const potentialResponse = await db.query(text, values);
        }

        if (req.body.giteaAccount && req.body.email) {
          const payload = {
            email: req.body.email,
            must_change_password: false,
            password: password,
            send_notify: false,
            username: username
          };

          const adddress = `https://paccenterbot:${process.env.paccenterbot}@git.bonner.hopto.org/api/v1/admin/users`;
          const axiosResponse = await axios.post(adddress, payload);
          const users = axiosResponse.data;
        }

        res.send("complete");
      } else {
        res.send("failure");
      }
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  } else {
    res.send("access denied");
  }
});
