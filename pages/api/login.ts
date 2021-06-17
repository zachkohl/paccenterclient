import fetchJson from "../../lib/fetchJson";
import withSession from "../../lib/session";
import db from "../../lib/postgresSetup";
import bcrypt from "bcrypt";
export default withSession(async (req, res) => {
  const { username, password } = await req.body;

  const text = `select permissions,hash,user_uid from users where username=$1`;
  const values = [username];
  const response = await db.query(text, values);

  const match = await bcrypt.compare(password, response.rows[0].hash);

  if (match) {
    const user = {
      username: username,
      user_uid: response.rows[0].user_uid,
    };

    req.session.set("user", user);
    await req.session.save();
    res.json({ user: user, message: "complete" });
  }

  // const address = `https://${req.body.username}:${req.body.password}@bonner.hopto.org/api/v1/user`;

  // try {
  //   // we check that the user exists on GitHub and store some data in session
  //   const response = await fetchJson(address);
  // } catch (error) {
  //   const { response: fetchResponse } = error;
  //   res.status(fetchResponse?.status || 500).json(error.data);
  // }
});
