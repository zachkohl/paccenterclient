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
var domain = "www.paccenter.org";
var mailgun = require("mailgun-js")({
  apiKey: api_key,
  domain: MAILGUN_DOMAIN
});

export default withSession(async (req, res) => {
  try {
    let text = `SELECT submitted from potentialmembers WHERE potentialmember_uid=$1`;
    const response = await db.query(text, [req.body.potentialmember_uid]);

    if (!response.rows[0].submitted) {
      text = `UPDATE potentialmembers SET submitted=TRUE WHERE potentialmember_uid=$1`;
      const response = await db.query(text, [req.body.potentialmember_uid]);

      res.send("complete");

      //TODO: email alert to admins
    } else {
      res.send("already submitted");
    }
  } catch (e) {
    console.log(e);
    res.send("something went wrong");
  }
});
