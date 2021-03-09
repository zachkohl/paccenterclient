import axios from "axios";
import btoa from "btoa";
import getEmail from "../../../lib/apiHelpers/getEmail";
async function submitReport(req, res, counter = 0) {
  try {
    const date = new Date();
    const dateTime = date.toISOString();
    //console.log();

    const fileName =
      req.body.fileName + (counter > 0 ? counter.toString() : "") + ".md";
    console.log(fileName);
    const email = await getEmail(req.body.userName, req.body.password);
    const adddress = `https://${req.body.userName}:${req.body.password}@bonner.hopto.org/SITREPS/vault/contents/${fileName}`;
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
        message: "string",
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
}
export default submitReport;
