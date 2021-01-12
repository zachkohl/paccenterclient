const db = require("../../lib/postgresSetup");

export default async (req, res) => {
  try {
    const signupname = req.body.signupname;
    const signupemail = req.body.signupemail;
    const signupphone = req.body.signupphone;
    const signupaddress1 = req.body.signupaddress1;
    const signupaddress2 = req.body.signupaddress2;
    const signupcity = req.body.signupcity;
    const signupcounty = req.body.signupcounty;
    const signupstate = req.body.signupstate;
    const signupzip = req.body.signupzip;

console.log("console log one");

    let text = `
      INSERT INTO signup(
      signup_name,
      signup_email,
      signup_phone,
      signup_address_1,
      signup_address_2,
      signup_city,
      signup_county,
      signup_state,
      signup_zip)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *;`
      ;

console.log("console log two");

    let values = [
      signupname,
      signupemail, 
      signupphone,
      signupaddress1,
      signupaddress2,
      signupcity,
      signupcounty,
      signupstate,
      signupzip];
      
console.log("console log three");

      
    const getUser = await db.query(text, values);
      if (getUser === null) {
      res.send("fail");
      return;
    }
console.log("console log four");
    res.send("complete");
console.log("console log five");
  }

  catch (err) {
    console.log(err);
    res.send(err);
  }

console.log("console log six");
};


