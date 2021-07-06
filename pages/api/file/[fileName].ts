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

//https://stackoverflow.com/questions/32083781/serving-mp3-files-in-nodejs-for-use-in-audio-tag/45436118

async function listFileLinks(req, res,) {
    const check = await checkPermission(req, "files");
    if (check) {
      const { fileName } = req.query;
      
        try {
console.log('listFIles hit')
          const links = await  minioClient.getObject('meetings', fileName)
         
         console.log(links.length)
          
          var rangePreTrim = req.rawHeaders.findIndex((header)=> header==='Range')>0?req.rawHeaders[req.rawHeaders.findIndex((header)=> header==='Range')+1]:"";

const range = rangePreTrim?.replace("bytes=","").split('-');





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
