const db = require("../../lib/postgresSetup");
const auth = require("../../lib/auth");
export default async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    //const hash = await generateHash.hash(password);
    //get username
    let text = "Select * from users where users_username=$1";
    let values = [username];

    const getUser = await db.query(text, values);
    console.log(getUser);
    if (getUser == null) {
      res.send("fail");
      return;
    }
    //compare
    let match = await auth.compare(password, getUser.rows[0].users_storedhash);

    if (match) {
      auth.setToken(res, { name: username });
      res.send("complete");
      return;
    } else {
      res.send("fail");
      return;
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
