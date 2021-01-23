require('dotenv').config()
const db = require("../lib/postgresSetup");
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const puppeteer = require('puppeteer');
const axios = require('axios');

async function readAPI(apiAddress){

    try{

  //  const apiAddress = `https://services.arcgis.com/91hXl6NfvLGEi8x5/arcgis/rest/services/Idaho_City_Taxing_Districts/FeatureServer/2/query?outFields=*&where=1%3D1&f=geojson`
   response = await axios.get(apiAddress)
    blob = response.data;
if(blob.type==='FeatureCollection'){
    console.log('This may take a while...')
    for(let i=0;i<blob.features.length;i++){
addFeatureToDB(blob.features[i],apiAddress);
    }
}else if(blob.geometryType==='esriGeometryPolygon'){
 await   addesriGeometryPolygon(blob.features,apiAddress);
}else{
    console.log('This API is returning a JSON structure we do not yet have a function built for. Please review the API output and add a function to deal with it.')
}

//     console.log(blob);//do testing

// const latLong = blob.features[0].geometry.rings[0];

// let coordinates = '';
// for(let i=0;i<latLong.length;i++){
//     coordinates = coordinates + latLong[i][0] + ' ' + latLong[i][1]
//     if(i<latLong.length-1){
//         coordinates =  coordinates + ', '
//     }
// }

//         let sql = `INSERT INTO MAPS(name,source,perimeter) VALUES('test2','need to learn to escape web addresses',ST_GeogFromText('MULTIPOLYGON(((${coordinates})))'));`;
//     let values = [];
//     fs.writeFileSync('map.txt', sql);
//   const dbResponse = await db.query(sql, values);
//   console.log('map successfully stored in database')


}catch(error){
    console.log('database error',error)
}
}

async function addFeatureToDB(feature,source){

    const name = feature.properties.NAME;
    if(feature.geometry.type!="Polygon"){
        console.log(`Warining: ${name} does not appear to be of type Polygon. This will probably cause problems`)
    }
    const latLong = feature.geometry.coordinates[0];
    const coordinates = await latLongToString(latLong);
    let sql = `INSERT INTO MAPS(name,source,perimeter) VALUES($1,$2,ST_GeogFromText('MULTIPOLYGON(((${coordinates})))'));`;
    let values = [name,source];
    const dbResponse = await db.query(sql, values);

}

async function latLongToString(latLong){ 
    
    let coordinates = '';
for(let i=0;i<latLong.length;i++){

    coordinates = coordinates + latLong[i][0] + ' ' + latLong[i][1]
    if(i<latLong.length-1){
        coordinates =  coordinates + ', '
    }

}

return coordinates;
}


async function addesriGeometryPolygon(feature,source){

    const name = feature[0].attributes.NAME;
    const latLong = feature[0].geometry.rings[0];
  //  console.log(latLong)
    const coordinates = await latLongToString(latLong);
    let sql = `INSERT INTO MAPS(name,source,perimeter) VALUES($1,$2,ST_GeogFromText('MULTIPOLYGON(((${coordinates})))'));`;
    let values = [name,source];
  const dbResponse = await db.query(sql, values);
}


module.exports = readAPI;
