const db = require("../../lib/postgresSetup");
const auth = require("../../lib/auth");
export default async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const hash = await auth.hash(password);
    console.log(hash);
    let text =
      "INSERT INTO users(users_username,users_storedhash) VALUES($1,$2) RETURNING *;";
    let values = [username, hash];

    const getUser = await db.query(text, values);
    if (getUser === null) {
      res.send("fail");
      return;
    }

    res.send("complete");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
