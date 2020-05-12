const db = require("../../lib/postgresSetup");

export default async (req, res) => {
  try {
    let text = `SELECT   a.id AS pointid, a.street AS street, a.streetnum AS streetnum, b.number AS number, c.id AS walkinglistid
    from kcdatadump2 a 
    full join visits b on a.id = b.pointid 
    full join walkinglists c on b.walkinglistid = c.id  
   WHERE c.id=$1 ORDER BY number`;
    let values = [req.body.walkinglistId];

    const dbResponse = await db.query(text, values);
    if (dbResponse.name === "error") {
      res.send({ error: true });
    } else {
      // console.log(dbResponse.rows);
      res.send({ error: false, rows: dbResponse.rows });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
