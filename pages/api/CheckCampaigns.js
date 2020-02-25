const axios = require("axios");

async function login(req, res) {
  console.log("got here");
  const cookies = req.headers.cookie;
  const slice1 = cookies.split("bearer=")[1];
  const token = slice1.split(";")[0];
  console.log(token);
  const checkUser = await axios.get("http://localhost:/api/CheckCampaigns", {
    headers: { cookie: `bearer=${token}` }
  });

  res.send(checkUser.data);
}
export default login;
