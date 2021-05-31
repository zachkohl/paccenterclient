const db = require("../../lib/postgresSetup");

export default withSession(async (req, res) => {
  const user = req.session.get("user");
  if (user) {
    try {
      let text = `SELECT * from walkinglists`;
      let values = [];

      const dbResponse = await db.query(text, values);
      if (dbResponse.name === "error") {
        res.send({ error: true });
      } else {
        console.log(dbResponse.rows);
        res.send({ error: false, rows: dbResponse.rows });
      }
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  } else {
    res.send("access denied");
  }
});
