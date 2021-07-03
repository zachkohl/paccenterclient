import checkPermission from "../../../lib/checkPermission";
import withSession from "../../../lib/session";
var Minio = require("minio");

var minioClient = new Minio.Client({
  endPoint: "min.bonner.hopto.org",
  useSSL: true,
  accessKey: "minioadmin",
  secretKey: "minioadmin",
});

async function upload(req, res, counter = 0) {
  const check = await checkPermission(req, "report");

  if (check) {
    minioClient.listBuckets((err, buckets) => {
      if (err) return console.log(err);
      console.log(buckets);
      res.send(buckets);
    });
  } else {
    res.send("access denied");
  }
}
export default withSession(upload);
