const db = require("../../lib/postgresSetup");
const axios = require('axios');
export default async (req, res) => {
    console.log(req.body.address)

const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json",{params:{
    key:"AIzaSyDgEY8Z2Ue-a-4fPUYGVexOZklbC5fmpcs",
    address:req.body.address
}});

if(response.data.results.length>0){
    const result = response.data.results[0];
    const geometry = result.geometry;
    console.log(geometry)
    const lat = geometry.location.lat;
    const lng = geometry.location.lng;


    let text = `SELECT name from maps where ST_INTERSECTS(CAST(ST_SetSRID( ST_Point($1, $2), 4326) AS geography), perimeter) ORDER BY name;
    `;
    let values = [lng,lat];

    const dbResponse = await db.query(text, values);
    console.log(dbResponse);
res.send(dbResponse.rows)


}else{
    console.log(response.data)
}



};
