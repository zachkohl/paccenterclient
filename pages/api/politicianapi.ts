import fs from "fs";
const file = fs.readFileSync("./Elected Offices.csv");
const parse = require("csv-parse/lib/sync");
const _ = require("lodash");
import withSession from "../../lib/session";
import checkPermission from "../../lib/checkPermission";
import {
  juristiction,
  organization,
  meeting,
} from "../../components/reports/juristictionsOrgsMeetings/juristictionTypes";

const records = parse(file, {
  columns: false,
  skip_empty_lines: false,
});
const jurisdictions = {}; //new Set();

for (let i = 1; i < records.length; i++) {
  //jurisdictions.add(records[i][0]);
  _.setWith(
    jurisdictions,
    `[${records[i][0]}][${records[i][1]}][${records[i][2]}]`,
    []
  );
}

for (let i = 1; i < records.length; i++) {
  //jurisdictions.add(records[i][0]);
  jurisdictions[records[i][0]][records[i][1]][records[i][2]].push(
    records[i][4]
  );
}

const areas = _.keys(jurisdictions);

function meetingsGen(meetings): [meeting] {
  let payload = [];
  const meets = _.keys(meetings);
  for (let j = 0; j < meets.length; j++) {
    const meeting: meeting = {
      value: {
        isMeeting: true,
        politicians: meetings[meets[j]],
      },
      label: meets[j],
    };
    payload.push(meeting);
  }
  return payload as [meeting];
}

function orgGen(area) {
  const payload = [];
  const orgs = _.keys(jurisdictions[area]);
  for (let k = 0; k < orgs.length; k++) {
    const meetings: [meeting] = meetingsGen(jurisdictions[area][orgs[k]]);
    const org: organization = {
      value: {
        isOrganization: true,
        meetings: meetings,
      },
      label: orgs[k],
    };

    payload.push(org);
  }
  return payload as [organization];
}

let payload = [];
for (let i = 0; i < areas.length; i++) {
  const orgs: [organization] = orgGen(areas[i]);
  const area: juristiction = {
    value: {
      isJuristiction: true,
      organizations: orgs,
    },
    label: areas[i],
  };
  payload.push(area);
}

export default withSession(async (req, res) => {
  const check = await checkPermission(req, "report");
  if (check) {
    res.send(payload);
  } else {
    res.send("access denied");
  }
});
