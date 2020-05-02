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

    let text = `SELECT ST_AsGeoJson(geog) FROM kcdatadump WHERE ST_CoveredBy(kcdatadump.geog,${geoString});`;
    let values = [];

    const dbResponse = await db.query(text, values);

    const payload = dbResponse.rows.map((row) => {
      console.log(row);
      return JSON.parse(row.st_asgeojson);
    });
    // const text2 = `INSERT INTO ptest(name, geog) VALUES($1,$2) RETURNING *;`;
    // const values2 = ["southWest", `SRID=4326; POINT(${southWest})`];

    // const southWestdb = await db.query(text2, values2);

    // const text3 = `INSERT INTO ptest(name, geog) VALUES($1,$2) RETURNING *;`;
    // const values3 = ["northWest", `SRID=4326; POINT(${northWest})`];

    // const northWestdb = await db.query(text3, values3);

    // const text4 = `INSERT INTO ptest(name, geog) VALUES($1,$2) RETURNING *;`;
    // const values4 = ["southEast", `SRID=4326; POINT(${southEast})`];

    // const southEastdb = await db.query(text4, values4);

    // const text5 = `INSERT INTO ptest(name, geog) VALUES($1,$2) RETURNING *;`;
    // const values5 = ["northEast", `SRID=4326; POINT(${northEast})`];

    // const northEastdb = await db.query(text5, values5);

    // console.log(dbResponse);
    res.send(payload);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
