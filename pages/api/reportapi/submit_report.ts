import axios from "axios";
import btoa from "btoa";
import getEmail from "../../../lib/apiHelpers/getEmail";
import checkPermission from "../../../lib/checkPermission";
import withSession from "../../../lib/session";
import formidable from "formidable";
var fs = require('fs');
var Minio = require("minio");

var minioClient = new Minio.Client({
  endPoint: "min.bonner.hopto.org",
  useSSL: true,
  accessKey: process.env.minioaccess,
  secretKey: process.env.miniosecret,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

async function submitReport(req, res,) {
  const check = await checkPermission(req, "report");

  if (check) {
    const user = req.session.get("user");
    try {
      //***********************SAVE FILE TO MINIO */
      const form = new formidable.IncomingForm();
      form.parse(req, async function (err, fields, files) {
        if (err) return console.log(err);
        if (files.file) {
          saveFile(files.file, fields.fileName,0);

        }

        if (fields.markdown && fields.markdown != "") {
          console.log('files', files)
          console.log('fields', fields)
         // saveMarkdownReport(fields.markdown, fields.fileName,user, 0);

        }
      
      });
      res.send("save complete");
    } catch (err) {
      console.log("err", err);
      res.send(err)
    }
  } else {
    res.send("access denied");
  }
}

async function saveFile(file, name,counter) {
  try {
    const fileName =
      name + (counter > 0 ? counter.toString() : "");

var fileStream = fs.createReadStream(file.path);
var fileStat = fs.stat(file.path,( function(error2, stats){
  if(error2){
    console.log(error2)
    throw new Error(error2)
  }
  minioClient.putObject('meetings', fileName, fileStream, stats.size, function(err3, objInfo) {
    if(err3) {
        return console.log(err3) // err should be null
    }
    console.log("Success", objInfo)
}) 
}))
  
 } catch (e) {
    console.log("err", e);
    if (counter < 5) {
      saveFile(file, name,counter + 1);
    } else {
      throw new Error(
        "Problem saving report. Filename needs to be unique, so try adding random numbers to the end"
      );
    }
  }
}

async function saveMarkdownReport(markdown, name, user, counter) {
  try {
    const date = new Date();
    const dateTime = date.toISOString();
    //console.log();

    const fileName =
      name + (counter > 0 ? counter.toString() : "") + ".md";
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
