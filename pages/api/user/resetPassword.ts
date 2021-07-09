import withSession from "../../../lib/session";
import bcrypt from "bcrypt";
import db from "../../../lib/postgresSetup";


export default withSession(async (req, res) => {

    const user = req.session.get("user");
    const newPassword = req.body.newPassword;


   const uuid = user.user_uid;
   console.log(uuid)
      const hashed = await bcrypt.hash(newPassword, 10);
      try {
        const text = `UPDATE users SET hash=$1 WHERE user_uid=$2`;
        const values = [hashed, uuid];
        const response = await db.query(text, values);

        res.send("complete");
      } catch (e) {
        res.send(e);
      }
});
