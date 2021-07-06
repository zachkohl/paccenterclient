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
const stats =  await  minioClient.statObject('meetings', fileName)
const dataStream = await  minioClient.getObject('meetings', fileName)
if(fileName.split('.')[1]!='mp3'){
    dataStream.pipe(res);
    return;
}


const size = stats.size;


  
              console.log('top')
              res.writeHead(200,{
                  "accept-Ranges":"bytes",
                  "Content-Type":"audio/mpeg",
                  "Content-Length": size
              })
              dataStream.pipe(res);


        } catch (err) {
            console.log("err", err);
            res.send(err)
        }
    } else {
        res.send("access denied");
    }
}




export default withSession(listFileLinks);
