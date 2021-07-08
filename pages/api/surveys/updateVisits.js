import axios from "axios";
import btoa from "btoa";
import getEmail from "../../../lib/apiHelpers/getEmail";
import checkPermission from "../../../lib/checkPermission";
import withSession from "../../../lib/session";
import db from "../../../lib/postgresSetup";
import templates from '../../../lib/surveyTemplates'
import updateUser from "../user/updateUser";
import buildJob from '../../../lib/buildJob';



async function updateVisits(req, res,) {
    const check = await checkPermission(req, "surveys");

    if (check) {
        const user = req.session.get("user");
        try {

            const jobUuid = await buildJob('update visit',user)


            
//notes: https://www.alibabacloud.com/blog/how-does-postgresql-implement-batch-update-deletion-and-insertion_596030
//test03=# update test set info=tmp.info from (values (1,'new1'),(2,'new2'),(6,'new6')) as tmp (id,info) where test.id=tmp.id;  
const updates = req.body.toUpdate;
if(updates.length===0){
    res.send('no updates detected');
    return;
}
console.log(updates)
let startString = `update visits set notes=tmp.notes, visited=tmp.visited from (values `
for(let i=0;i<updates.length;i++){
    startString = startString + ` ('${updates[i].id}', '${jobUuid}',${updates[i].visited},'${updates[i].notes}'),`
}
startString = startString.slice(0,-1);

const endString = startString + `) as tmp (visit_uid,job_uuid,visited,notes) where visits.visit_uid::text=tmp.visit_uid`

console.log(endString)

const dbResponse = await db.query(endString,[]);

res.send('database updated')
        } catch (err) {
            console.log("err", err);
            res.send(err)
        }
    } else {
        res.send("access denied");
    }
}




export default withSession(updateVisits);
