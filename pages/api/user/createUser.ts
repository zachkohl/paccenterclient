import fetchJson from "../../../lib/fetchJson";
import withSession from "../../../lib/session";
import bcrypt from "bcrypt";
import db from "../../../lib/postgresSetup";
import checkPermission from "../../../lib/checkPermission";
import axios from "axios";

var api_key = process.env.MAILGUN_API_KEY;
var domain = "paccenter.org";
const mailgun = require("mailgun-js");
const mg = mailgun({ apiKey: api_key, domain: domain });

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
          const adddress2 = `https://paccenterbot:${process.env.paccenterbot}@git.bonner.hopto.org/api/v1/repos/pac/workspace/collaborators/${username}`;
          const axiosResponse2 = await axios.put(adddress2, {
            permission: "write"
          });
          const users2 = axiosResponse.data;

          sendEmail(req.body.email, username, password);
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

function sendEmail(email, username, password) {
  console.log(email);
  const data = {
    from: "DO_NOT_REPLY<admin@paccenter.org>",
    to: email,
    subject: "PACCENTER credentials",
    text: `Welcome to the Politically Active Christians Team!
    You are now a member of a unique community and have been given access to information not normally available to the public.

    The systems we use are fairly complex, but that is the price
    we pay for decentralization and self hosting our own servers.
    There are two systems you will use. PACCENTER and gitea.
    Additional training on these tools will be provided

    https://www.paccenter.org
    username: ${username}
    password: ${password}

    https://git.bonner.hopto.org/
    username: ${username}
    password: ${password}

Also know that we have a telegram group called bonnergit. However we don't have it setup yet to auto add users (feature hopefully coming). 
The telegram channel has a bot that posts every time a report is submitted, just ask if you want access. 

Training videos:
Calendar: https://tv.gab.com/channel/supersonicredpill/view/introduction-to-paccenter-and-calendar-tool-60f04d219de421f6bc85ff29
Input tool: https://tv.gab.com/channel/supersonicredpill/view/paccenter-input-tool-60f0e94cf8e106cf139336a0


Please refer any questions or need for technical support to an administrator or email paccenter@protonmail.com
    `
  };
  mg.messages().send(data, function (error, body) {
    if (error) console.log(error);
    console.log("email sent");
  });
}
