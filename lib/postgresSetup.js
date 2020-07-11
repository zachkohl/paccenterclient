//Database +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var { Pool, Client } = require("pg");

var pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
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
