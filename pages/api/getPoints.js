const db = require("../../lib/postgresSetup");

export default async (req, res) => {
  try {
    const bounds = req.body.bounds;
    // console.log(bounds);

    const southWest = `${bounds._southWest.lng} ${bounds._southWest.lat}`;

    const northEast = `${bounds._northEast.lng} ${bounds._northEast.lat}`;

    const northWest = `${bounds._southWest.lng} ${bounds._northEast.lat}`;
    const southEast = `${bounds._northEast.lng} ${bounds._southWest.lat}`;

    const geoString = `ST_GeomFromText('POLYGON((${southWest}, ${southEast}, ${northEast}, ${northWest}, ${southWest}))')`;
    // console.log(geoString);

    const exampleString = `ST_GeomFromText('POLYGON((-71.1776585052917 42.3902909739571,-71.1776820268866 42.3903701743239,-71.1776063012595 42.3903825660754,-71.1775826583081 42.3903033653531,-71.1776585052917 42.3902909739571))',4267)`;

    // let text = `INSERT INTO ptest(geog) VALUES(${geoString}) RETURNING *;`;
    // let values = [];

    let text = `SELECT DISTINCT ON (a.geog) ST_AsGeoJson(a.geog) AS geog,a.id AS pointid, b.number AS number, c.id AS walkinglistid
    from kcaddresses a 
    full join visits b on a.id = b.pointid 
    full join walkinglists c on b.walkinglistid = c.id  
   WHERE ST_CoveredBy(a.geog,${geoString}) AND (b.walkinglistid=${req.body.walkinglistid} OR b.walkinglistid ISNULL);`;
    let values = [];

    const dbResponse = await db.query(text, values);
    console.log(dbResponse);
    const payload = dbResponse.rows.map((row) => {
      return {
        geoJson: JSON.parse(row.geog),
        id: row.pointid,
        number: row.number,
        walkinglistid: row.walkinglistid,
      };
    });

    res.send(payload);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
