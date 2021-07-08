import axios from "axios";
import btoa from "btoa";
import getEmail from "../../../lib/apiHelpers/getEmail";
import checkPermission from "../../../lib/checkPermission";
import withSession from "../../../lib/session";

var fs = require("fs");
var Minio = require("minio");

var minioClient = new Minio.Client({
  endPoint: "min.bonner.hopto.org",
  useSSL: true,
  accessKey: process.env.minioaccess,
  secretKey: process.env.miniosecret,
});

async function submitReport(req, res) {
  const check = await checkPermission(req, "report");

  if (check) {
    try {
      const presignedUrl = await minioClient.presignedPutObject(
        "meetings",
        req.body.fileName,
        24 * 60 * 60
      );
      console.log(presignedUrl);
      res.send(presignedUrl);
    } catch (err) {
      console.log("err", err);
      res.send(err);
    }
  } else {
    res.send("access denied");
  }
}

export default withSession(submitReport);
