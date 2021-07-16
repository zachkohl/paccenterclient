import fetchJson from "../../../lib/fetchJson";
import withSession from "../../../lib/session";
import bcrypt from "bcrypt";
import db from "../../../lib/postgresSetup";
import checkPermission from "../../../lib/checkPermission";

var api_key = process.env.MAILGUN_API_KEY;
var MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
var MAILGUN_PUBLIC_KEY = process.env.MAILGUN_PUBLIC_KEY;
var MAILGUN_SMTP_LOGIN = process.env.MAILGUN_SMTP_LOGIN;
var MAILGUN_SMTP_PASSWORD = process.env.MAILGUN_SMTP_PASSWORD;
var MAILGUN_SMTP_PORT = process.env.MAILGUN_SMTP_PORT;
var MAILGUN_SMTP_SERVER = process.env.MAILGUN_SMTP_SERVER;
var domain = "paccenter.org";
const mailgun = require("mailgun-js");
const mg = mailgun({ apiKey: api_key, domain: domain });

export default withSession(async (req, res) => {
  const check = await checkPermission(req, "volunteer");
  if (check || true) {
    const user_uid = req.body.user_uid;
    const email = req.body.email;

    //validate email system
    console.log(email);
    try {
      //
      //generate new potentialmember row RETURNING *
      let text = `INSERT INTO potentialmembers(email) VALUES($1) RETURNING *`;
      const response = await db.query(text, [email]);

      const uuid = response.rows[0].potentialmember_uid;

      const url = `https://www.paccenter.org/signupform/${uuid}?email=${email}`;
      //generate link, send link
      console.log(url);
      //
      sendEmail(email, url);
      res.send({ status: "complete", url: url });
      //send email to paccenter@protonmail.com

      //create stuff for validation form

      //later, create validation form, validation approval system+activator APIs (gitea, telegram)

      //build training videos for gab
    } catch (e) {
      res.send("failed. Try another email address");
    }
  } else {
    res.send("access denied");
  }
});

function sendEmail(email, url) {
  const data = {
    from: "DO_NOT_REPLY<admin@paccenter.org>",
    to: email,
    subject: "PACCENTER Application link",
    text: `Congratulations: you have been recommended to join the Politically Active Christians Team. Please follow the below link to request membership and receive access to our data repositories.
    ${url}`
  };
  mg.messages().send(data, function (error, body) {
    if (error) console.log(error);
    console.log("email sent");
  });
}
