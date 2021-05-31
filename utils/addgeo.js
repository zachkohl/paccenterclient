require("dotenv").config();
const db = require("../lib/postgresSetup");
const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");
const puppeteer = require("puppeteer");
const axios = require("axios");
const bingKey = process.env.bingKey;
async function updateGeo() {
  console.log(
    "Adding geography for selected addresses: expect hang of 30ish seconds at end of script"
  );
  /**
   * 1. Add the columns geog (geography) bingdump (jsonb)
   * 2. read first 100 columns, console.log
   * 3. if no values in geo, run through api
   * 4. confirm
   * 5. run for all
   */

  //read 100 addresses
  let sql = `select * from bcvoterregmarch21 FULL JOIN relationships ON bcvoterregmarch21.bcvoterregmarch21_uid= relationships.parent FULL JOIN points ON relationships.child = points.points_uid ORDER BY "VoterID"`;
  let values = [];
  const dbResponse = await db.query(sql, values);
  let errorFlag = false;
  for (let i = 0; i < dbResponse.rows.length; i++) {
    const row = dbResponse.rows[i];
    const address = `${row.ResHouseNumber ? row.ResHouseNumber : ""} ${
      row.ResPreDir ? row.ResPreDir : ""
    } ${row.ResStreet ? row.ResStreet : ""}, ${
      row.ResCityDesc ? row.ResCityDesc : ""
    } ${row.ResState ? row.ResState : ""}, ${row.ResZip5 ? row.ResZip5 : ""}`;
    console.log(`${row.FirstName} ${row.LastName}: ${address}`);
    if (row.geog === null) {
      console.log("no geography: row", i);

      const location = encodeURIComponent(address);
      try {
        const bing = await axios.get(
          `http://dev.virtualearth.net/REST/v1/Locations?query=${location}&key=${bingKey}`
        );
        errorFlag = false;
        const blob = bing.data.resourceSets[0].resources;

        const geoString = `SRID=4326; POINT(${blob[0].point.coordinates[1]} ${blob[0].point.coordinates[0]})`;
        try {
          let sql = `INSERT INTO points(geog, apidump) VALUES($1,$2) RETURNING *`;
          let values = [geoString, JSON.stringify(blob)];
          const pointInsert = await db.query(sql, values);
          sql = `INSERT INTO relationships(parent, child) VALUES($1,$2) RETURNING *`;
          values = [row.bcvoterregmarch21_uid, pointInsert.rows[0].points_uid];
          const relationshipInsert = await db.query(sql, values);
          console.log("inserted");
        } catch (err) {
          console.log("error inserting point and relationship");
        }
      } catch {
        console.log("bing error");
        if (!errorFlag) {
          i = i - 1;
          errorFlag = true;
        }
      }
    } else {
      console.log("has geography");
    }
  } //end for loop
  return;
}
updateGeo();

module.exports = updateGeo;
