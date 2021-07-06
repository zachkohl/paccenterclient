import axios from "axios";
import btoa from "btoa";
import getEmail from "../../lib/apiHelpers/getEmail";
import checkPermission from "../../lib/checkPermission";
import withSession from "../../lib/session";
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

async function listFileLinks(req, res,) {
    const check = await checkPermission(req, "files");

    if (check) {
        const user = req.session.get("user");
        try {

          const links = await  minioClient.getObject('meetings', 'Sandpoint_City Council_meeting-2021-7-10_test.jpg')

          links.pipe(res);

        } catch (err) {
            console.log("err", err);
            res.send(err)
        }
    } else {
        res.send("access denied");
    }
}




export default withSession(listFileLinks);
