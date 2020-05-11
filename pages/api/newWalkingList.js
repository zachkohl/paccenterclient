const db = require("../../lib/postgresSetup");

export default async (req, res) => {
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
};
