import axios from "axios";
import btoa from "btoa";
import getEmail from "../../../lib/apiHelpers/getEmail";
import checkPermission from "../../../lib/checkPermission";
import withSession from "../../../lib/session";
async function submitReport(req, res, counter = 0) {
  const check = await checkPermission(req, "report");

  if (check) {
    const user = req.session.get("user");
    try {
      const date = new Date();
      const dateTime = date.toISOString();
      //console.log();

      const fileName =
        req.body.fileName + (counter > 0 ? counter.toString() : "") + ".md";
      console.log(fileName);
      //  const email = await getEmail(req.body.userName, req.body.password);
      //`https://debBot:oo$C$NIweTJ9@bonner.hopto.org/api/v1/repos/zachk/demo/contents/${fileName}`,
      const message = `created via web submission tool by user:${user.username}`;
      const adddress = `https://paccenterbot:${process.env.paccenterbot}@git.bonner.hopto.org/api/v1/repos/pac/workspace/contents/${fileName}`;
      const response = await axios.post(
        adddress,
        {
          author: {
            email: "paccenter@protonmail.com",
            name: req.body.userName,
          },
          branch: "master",
          committer: {
            email: "paccenter@protonmail.com",
            name: user.username,
          },
          content: btoa(req.body.markdown),
          dates: {
            author: dateTime,
            committer: dateTime,
          },
          message: message,
        },
        {
          auth: {
            username: "paccenterbot",
            password: process.env.paccenterbot,
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
