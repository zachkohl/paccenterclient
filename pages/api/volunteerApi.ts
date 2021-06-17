const db = require("../../lib/postgresSetup");
const axios = require("axios");
import checkPermission from "../../lib/checkPermission";
import withSession from "../../lib/session";
export default withSession(async (req, res) => {
  const check = await checkPermission(req, "volunteer");
  if (check) {
    try {
      console.log(req.body);
      const {
        firstName,
        lastName,
        phone,
        potentialCandidate,
        street,
        city,
        state,
        zip,
      } = req.body;

      const address = `${street} ${city} ${state}`;

      let text = "";
      let values = [];

      if (potentialCandidate) {
        const response = await axios.get(
          "https://maps.googleapis.com/maps/api/geocode/json",
          {
            params: {
              key: process.env.GOOGLEKEY,
              address: address,
            },
          }
        );

        const result = response.data.results[0];
        const geometry = result.geometry;
        console.log(geometry);
        const lat = geometry.location.lat;

        const lng = geometry.location.lng;
        const geoString = `SRID=4326; POINT(${lng} ${lat})`;

        text = `
      INSERT INTO volunteerSignup(
        first,
        last,
        phone,
        willingToServeAsCandiate,
        street,
        city,
        state,
        zip,
        geog,
        googleDump
        )
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *;`;
        values = [
          firstName,
          lastName,
          phone,
          potentialCandidate,
          street,
          city,
          state,
          zip,
          geoString,
          result,
        ];
        const getUser = await db.query(text, values);
        if (getUser === null) {
          res.send("fail");
          return;
        }
        res.send("complete");
      } else {
        text = `
      INSERT INTO volunteerSignup(
        first,
        last,
        phone,
        willingToServeAsCandiate,
        street,
        city,
        state,
        zip
        )
      VALUES($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *;`;
        values = [
          firstName,
          lastName,
          phone,
          potentialCandidate,
          street,
          city,
          state,
          zip,
        ];
        const getUser = await db.query(text, values);
        if (getUser === null) {
          res.send("fail");
          return;
        }
        res.send("complete");
      }
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  } else {
    res.send("access denied");
  }
});
