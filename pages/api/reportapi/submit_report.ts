import axios from "axios";
import btoa from "btoa";
import getEmail from "../../../lib/apiHelpers/getEmail";
export default async (req, res) => {
  try {
    const date = new Date();
    const dateTime = date.toISOString();
    //console.log();

    const fileName = req.body.fileName + ".md";

    const email = await getEmail(req.body.userName, req.body.password);

    const response = await axios.post(
      `https://debBot:oo$C$NIweTJ9@bonner.hopto.org/api/v1/repos/zachk/demo/contents/${fileName}`,
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
    console.log(err);
    res.send(err);
  }
};
