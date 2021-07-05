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

async function listFiles(req, res,) {
    const check = await checkPermission(req, "files");

    if (check) {
        const user = req.session.get("user");
        try {


            const promise = new Promise((resolve,reject)=>{    
            let files = []
            var stream = minioClient.listObjects('meetings', '', true)
            stream.on('data', function (obj) { files.push(obj) })
            stream.on('end', () => {
                resolve(files)
            })
            stream.on('error', function (err) {
                console.log(err)
                reject(err)
            })
        })

        const payload = await promise;
        res.send(payload)
        } catch (err) {
            console.log("err", err);
            res.send(err)
        }
    } else {
        res.send("access denied");
    }
}




export default withSession(listFiles);
