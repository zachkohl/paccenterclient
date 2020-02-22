const axios = require("axios");

async function login(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const axiosResult = await axios.post("http://localhost:80/login", {
    username: username,
    password: password
  });
  console.log(axiosResult.data);
  if (axiosResult.data.status === "login complete") {
    const slice1 = axiosResult.headers["set-cookie"][0].split("bearer=");
    const tokenString = slice1[1].split(";")[0];
    // console.log(tokenString);
    // res.setHeader("Set-Cookie", `bearer=${tokenString}`);
    // res.send(axiosResult.data);
    const cookie = `bearer=${tokenString}`;
    res.send(JSON.stringify({ success: true, token: tokenString }));
  } else {
    res.send("denied");
  }
}
export default login;
