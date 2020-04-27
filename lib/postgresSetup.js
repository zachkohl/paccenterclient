//Database +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var { Pool, Client } = require("pg");

var pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "paccenter",
  password: "postgres",
  port: 5433,
});

async function query(text, values) {
  //P stands for promise
  //Query
  const clientP = await pool.connect();
  return new Promise(async (resolve, reject) => {
    await clientP
      .query(text, values)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
      .finally(clientP.release());
  }); //end new promise
} //end query
module.exports.query = query;
module.exports.pool = pool;