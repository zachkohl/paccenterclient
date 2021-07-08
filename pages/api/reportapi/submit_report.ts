import axios from "axios";
import btoa from "btoa";
import checkPermission from "../../../lib/checkPermission";
import withSession from "../../../lib/session";



async function submitReport(req, res) {
  const check = await checkPermission(req, "report");
console.log(req.body)
  if (check) {
    const user = req.session.get("user");
    try {

        if (req.body.markdown && req.body.markdown != "") {
     
          saveMarkdownReport(req.body.markdown, req.body.fileName, user, 0);
          res.send("save complete");
        }else{
          res.send("empty report, not transmitted to the datastore");
        }
    
    } catch (err) {
      console.log("err", err);
      res.send(err);
    }
  } else {
    res.send("access denied");
  }
}


async function saveMarkdownReport(markdown, name, user, counter) {
  try {
    const date = new Date();
    const dateTime = date.toISOString();
    //console.log();

    const fileName = name + (counter > 0 ? counter.toString() : "") + ".md";
    //  const email = await getEmail(req.body.userName, req.body.password);
    //`https://debBot:oo$C$NIweTJ9@bonner.hopto.org/api/v1/repos/zachk/demo/contents/${fileName}`,
    const message = `created via web submission tool by user:${user.username}`;
    const adddress = `https://paccenterbot:${process.env.paccenterbot}@git.bonner.hopto.org/api/v1/repos/pac/workspace/contents/${fileName}`;
    const response = await axios.post(
      adddress,
      {
        author: {
          email: "paccenter@protonmail.com",
          name: user.username,
        },
        branch: "master",
        committer: {
          email: "paccenter@protonmail.com",
          name: user.username,
        },
        content: btoa(markdown),
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
  } catch (e) {
    console.log("err", e);
    if (counter < 5) {
      saveMarkdownReport(markdown, name, user, counter + 1);
    } else {
      throw new Error(
        "Problem saving report. Filename needs to be unique, so try adding random numbers to the end"
      );
    }
  }
}

export default withSession(submitReport);
