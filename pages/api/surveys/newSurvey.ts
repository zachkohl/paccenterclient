import axios from "axios";
import btoa from "btoa";
import getEmail from "../../../lib/apiHelpers/getEmail";
import checkPermission from "../../../lib/checkPermission";
import withSession from "../../../lib/session";
import db from "../../../lib/postgresSetup";
import templates from '../../../lib/surveyTemplates'



async function newSurvey(req, res,) {
    const check = await checkPermission(req, "surveys");

    if (check) {
        const user = req.session.get("user");
        try {

//create the job
const notes = "created survey (dev test in development)";
const text = `INSERT INTO JOBS (user_uid,notes) VALUES($1,$2) RETURNING *`;
const values = [user.user_uid,notes];
const jobQuery = await db.query(text,values);
const jobUid = jobQuery.rows[0].jobs_uid;

//build the survey
const surveyResponse = await db.query("INSERT INTO surveys (job,name) VALUES ($1,$2) RETURNING *",[jobUid,req.body.surveyName])
const surveyUid = surveyResponse.rows[0].survey_uid;
//setup the right template code
const template = templates.find(template => template.name ===req.body.template)
const templateText = template.text;

//get the visits
const responseGetVisits = await db.query(templateText,[])

//build the visits
const prototypeNotes = {visited:false}
let buildVisits = `INSERT INTO visits (voter_uid,survey_uid,notes) VALUES `;
for(let i=0;i<responseGetVisits.rows.length;i++){
    buildVisits = buildVisits + `('${responseGetVisits.rows[i].bcvoterregmarch21_uid}', '${surveyUid}','${JSON.stringify(prototypeNotes)}'), `
}
buildVisits = buildVisits.slice(0,-2) + ';'
console.log(buildVisits)


//run it
const responseBuildVisits = await db.query(buildVisits,[]);

//if all goes well, send a complete;


res.send('complete')
        } catch (err) {
            console.log("err", err);
            res.send(err)
        }
    } else {
        res.send("access denied");
    }
}




export default withSession(newSurvey);
