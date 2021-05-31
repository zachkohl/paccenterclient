import axios from "axios";
import btoa from "btoa";
import getEmail from "../../../lib/apiHelpers/getEmail";
import withSession from "../../../lib/session";
async function submitReport(req, res, counter = 0) {
  const user = req.session.get("user");
  if (user) {
    try {
      const date = new Date();
      const dateTime = date.toISOString();
      //console.log();

      const fileName =
        req.body.fileName + (counter > 0 ? counter.toString() : "") + ".md";
      console.log(fileName);
      const email = await getEmail(req.body.userName, req.body.password);
      //`https://debBot:oo$C$NIweTJ9@bonner.hopto.org/api/v1/repos/zachk/demo/contents/${fileName}`,

      const adddress = `https://${req.body.userName}:${req.body.password}@bonner.hopto.org/api/v1/repos/SITREPS/vault/contents/${fileName}`;
      const response = await axios.post(
        adddress,
        {
          author: {
            email: email,
            name: req.body.userName,
          },
          branch: "master",
          committer: {
            email: email,
            name: req.body.userName,
          },
          content: btoa(req.body.markdown),
          dates: {
            author: dateTime,
            committer: dateTime,
          },
          message: "created via web submission tool",
        },
        {
          auth: {
            username: req.body.userName,
            password: req.body.password,
          },
        }
      );

      res.send("save complete");
    } catch (err) {
      //  console.log(err);
      if (counter < 5) {
        submitReport(req, res, counter + 1);
      } else {
        res.send(
          "Error. Check your credentials. Also the filename needs to be unique, so try adding random numbers to the end"
        );
      }
    }
  } else {
    res.send("access denied");
  }
}
export default withSession(submitReport);
