import fetch from "isomorphic-unfetch";

import auth0 from "../../lib/auth0";
import config from "../../lib/config";

export default async function demo(req, res) {
  console.log(req.body);
  res.setHeader("set-cookie", "test=test");
  res.send("hello world");
  // try {
  //   const tokenCache = auth0.tokenCache(req, res);

  //   const { accessToken } = await auth0.getSession(req);
  //   //console.log(accessToken);
  //   const url = `http://localhost:80/api/CheckCampaigns`;
  //   const response = await fetch(url, {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`
  //     }
  //   });
  //   //const data = await response.json();
  //   //console.log(data);
  //   res.send(response);
  //   //res.status(200).json(data);
  // } catch (error) {
  //   console.error(error);
  //   res.status(error.status || 500).json({
  //     code: error.code,
  //     error: error.message
  //   });
  // }
}
