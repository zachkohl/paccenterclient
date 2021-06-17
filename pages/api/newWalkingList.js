const db = require("../../lib/postgresSetup");
import withSession from "../../lib/session";
export default withSession(async (req, res) => {
  const check = await checkPermission(req, "dev");
  if (check) {
    try {
      let text = `INSERT INTO WalkingLists(NAME,NEXTVISIT) VALUES($1,$2)`;
      let values = [req.body.name, 1];

      const dbResponse = await db.query(text, values);
      if (dbResponse.name === "error") {
        res.send({ error: true });
      } else {
        res.send({ error: false });
      }
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  } else {
    res.send("access denied");
  }
});
