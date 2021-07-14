import withSession from "../../../lib/session";
import db from "../../../lib/postgresSetup";
import checkPermission from "../../../lib/checkPermission";
import axios from "axios";

export default withSession(async (req, res) => {
  const check = await checkPermission(req, "admin");
  if (check) {
    try {
      console.log('hello')
      const text = `select username from users where username=$1`;
      const values = [req.query.username];
      const response = await db.query(text, values);
console.log(response.rows)
      if(response.rows.length>0){

        res.send('notAvailable')
        return;
      }else{
        console.log('hello2')
        const adddress = `https://paccenterbot:${process.env.paccenterbot}@git.bonner.hopto.org/api/v1/admin/users`;
        const axiosResponse = await axios.get(
          adddress,
        );
const users = axiosResponse.data;
for(let i=0;i<users.length;i++){
  if(users[i].username===req.query.username){
    res.send('not available on gitea');
    return;
  }
}
res.send('available');


      }
    } catch (e) {
      res.send(e);
    }
  } else {
    res.send("access denied");
  }
});
