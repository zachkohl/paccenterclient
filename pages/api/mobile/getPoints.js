const db = require("../../../lib/postgresSetup");

export default async (req, res) => {
  try {
    let text = `SELECT DISTINCT ON (geog) ST_AsGeoJson(geog) AS geog,id AS pointid from kcdatadump2 WHERE pct='1'`;
    let values = [];

    const dbResponse = await db.query(text, values);
    console.log(dbResponse);
    const payload = dbResponse.rows.map((row) => {
      return {
        geoJson: JSON.parse(row.geog),
        id: row.pointid,
      };
    });

    res.send(payload);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
