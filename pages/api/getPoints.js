const db = require("../../lib/postgresSetup");

export default async (req, res) => {
  try {
    const bounds = req.body.bounds;
    console.log(bounds);

    const southWest = `${bounds._southWest.lng} ${bounds._southWest.lat}`;

    const northEast = `${bounds._northEast.lng} ${bounds._northEast.lat}`;

    const northWest = `${bounds._southWest.lng} ${bounds._northEast.lat}`;
    const southEast = `${bounds._northEast.lng} ${bounds._southWest.lat}`;

    const geoString = `ST_GeomFromText('POLYGON((${southWest}, ${southEast}, ${northEast}, ${northWest}, ${southWest}))')`;
    console.log(geoString);

    const exampleString = `ST_GeomFromText('POLYGON((-71.1776585052917 42.3902909739571,-71.1776820268866 42.3903701743239,-71.1776063012595 42.3903825660754,-71.1775826583081 42.3903033653531,-71.1776585052917 42.3902909739571))',4267)`;

    // let text = `INSERT INTO ptest(geog) VALUES(${geoString}) RETURNING *;`;
    // let values = [];

    let text = `SELECT ST_AsGeoJson(geog),id FROM kcdatadump2 WHERE ST_CoveredBy(kcdatadump2.geog,${geoString});`;
    let values = [];

    const dbResponse = await db.query(text, values);

    const payload = dbResponse.rows.map((row) => {
      return { geoJson: JSON.parse(row.st_asgeojson), id: row.id };
    });

    res.send(payload);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
