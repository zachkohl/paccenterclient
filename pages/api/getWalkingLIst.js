const db = require("../../lib/postgresSetup");

export default async (req, res) => {
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
};
