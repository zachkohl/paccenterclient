import axios from "axios";
import btoa from "btoa";
import getEmail from "../../../lib/apiHelpers/getEmail";
import checkPermission from "../../../lib/checkPermission";
import withSession from "../../../lib/session";
import surveyTemplates from '../../../lib/surveyTemplates'



async function newSurvey(req, res,) {
    const check = await checkPermission(req, "surveys");

    if (check) {
        const user = req.session.get("user");
        try {
            const payload = surveyTemplates.map((survey) => survey.name)
            res.send(payload);
        } catch (err) {
            console.log("err", err);
            res.send(err)
        }
    } else {
        res.send("access denied");
    }
}




export default withSession(newSurvey);
