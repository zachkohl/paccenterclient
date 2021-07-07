const surveyTemplates = [
  {
    name: "washington precinct Rupublicans and Independents",
    text: `select "bcvoterregmarch21_uid" from bcvoterregmarch21 WHERE ("PartyDesc"='Republican' OR "PartyDesc"='Unaffiliated') AND "PrecinctLabel"='WASHINGTON';`,
  },
  { name: "test", text: `` },
];

export default surveyTemplates;
