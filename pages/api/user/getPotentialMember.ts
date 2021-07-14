import withSession from "../../../lib/session";
import db from "../../../lib/postgresSetup";
import checkPermission from "../../../lib/checkPermission";

export default withSession(async (req, res) => {
  const check = await checkPermission(req, "admin");
  if (check) {
    try {
      const text = `select potentialmember_uid, email, fullname, phone, address, story, question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11,submitted from potentialmembers where potentialmember_uid=$1`;
      const values = [req.query.uid];
      const response = await db.query(text, values);

      res.json(response.rows[0]);
    } catch (e) {
      res.send(e);
    }
  } else {
    res.send("access denied");
  }
});
