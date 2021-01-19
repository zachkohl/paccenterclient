require('dotenv').config()
const db = require("../lib/postgresSetup");
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const puppeteer = require('puppeteer');
const axios = require('axios');

async function readCSV(){


    fs.createReadStream(path.resolve(__dirname, 'assets', 'mapSeedData.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', async row => {
        //process each row in the csv
    //     const browser = await puppeteer.launch();
    //     const page = await browser.newPage();
    //     const apiAddress = row.address;
    //  await page.goto(apiAddress);
    //   const content = await page.$('pre');
    //   const text = await (await content.getProperty('textContent')).jsonValue();
    //   blob = JSON.parse(text)

    try{
   response = await axios.get(row.address)
    blob = response.data;
// console.log(blob)
     let data = JSON.stringify(blob);

       console.log(blob.features[0].geometry.rings[0])

const latLong = blob.features[0].geometry.rings[0];

let coordinates = '';
for(let i=0;i<latLong.length;i++){
    coordinates = coordinates + latLong[i][0] + ' ' + latLong[i][1]
    if(i<latLong.length-1){
        coordinates =  coordinates + ', '
    }
}

//fs.writeFileSync('map.json', data);

const testdata = `ST_GeogFromText('POLYGON((-116.049168634002 48.5179618100009, -117.032367779002 48.9768856540008 ,-116.049168634002 48.5179618100009))')`

        let sql = `INSERT INTO MAPS(name,source,perimeter) VALUES('test2','need to learn to escape web addresses',ST_GeogFromText('POLYGON((${coordinates}))'));`;
    let values = [];
    fs.writeFileSync('map.txt', sql);
  const dbResponse = await db.query(sql, values);
}catch(error){
    console.log('database error',error)
}




// await browser.close();
    })
    .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));

/**
 * TODO: put stuff in the database
 */
    // let text = `select * from users`;
    // let values = [];

    // const dbResponse = await db.query(text, values);
    // console.log(dbResponse.rows)
 

    console.log('readCSV complete')
}
readCSV()
