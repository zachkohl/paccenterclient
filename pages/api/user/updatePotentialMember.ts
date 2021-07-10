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
  domain: MAILGUN_DOMAIN,
});

export default withSession(async (req, res) => {

try{
  const  {
        potentialmember_uid,
        fullname,
        phone,
        story,
        address,
        question1,
        question2,
        question3,
        question4,
        question5,
        question6,
        question7,
        question8,
        question9,
        question10,
      } = req.body;





    let text = `UPDATE potentialmembers SET fullname=$1,phone=$2,story=$3,address=$4,question1=$5,question2=$6,question3=$7,question4=$8,question5=$9,question6=$10,question7=$11,question8=$12,question9=$13,question10=$14 WHERE potentialmember_uid=$15`;
    const response = await db.query(text, [fullname,
        phone,
        story,
        address,
        question1,
        question2,
        question3,
        question4,
        question5,
        question6,
        question7,
        question8,
        question9,
        question10,potentialmember_uid]);

res.send('complete')

    }catch(e){
        console.log(e)
        res.send("something went wrong");
    }

});
