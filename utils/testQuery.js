require("dotenv").config();
const db = require("../lib/postgresSetup");

async function createVisits() {
  let sql = `SELECT bcvoterregmarch21_uid, "FirstName", "LastName" from bcvoterregmarch21 where precinct='WASH'  ORDER BY "VoterID" LIMIT 100`;
  let values = [];
  const dbResponse = await db.query(sql, values);

  for (let i = 0; i < dbResponse.rows.length; i++) {
    const row = dbResponse.rows[i];

    const uuid = "bb8ed562-c269-11eb-bb4d-0ec9ee39a1c1";

    let sql = `INSERT INTO visits(survey_uid,voter_uid) VALUES($1,$2) RETURNING *`;
    let values = [uuid, row.bcvoterregmarch21_uid];
    const innerResponse = await db.query(sql, values);
    console.log(innerResponse.rows[0]);
  }

  return;
}

async function testQuery() {}

testQuery();

module.exports = testQuery;
