require('dotenv').config()
const db = require("../lib/postgresSetup");
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const puppeteer = require('puppeteer');

async function readCSV(){


    fs.createReadStream(path.resolve(__dirname, 'assets', 'mapSeedData.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', async row => {
        //process each row in the csv
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const apiAddress = row.address;
     await page.goto(apiAddress);
      const content = await page.$('pre');
      const text = await (await content.getProperty('textContent')).jsonValue();
      blob = JSON.parse(text)
console.log(blob)
      let data = JSON.stringify(text);
fs.writeFileSync('map.json', text);
try{
        let sql = `INSERT INTO MAPS(name,source,geom) VALUES($1,$2,ST_GeomFromGeoJSON('$3'))`;
    let values = [row.name,row.address,blob.features[0].geometry];

    const dbResponse = await db.query(sql, values);
}catch(error){
    console.log('database error',error)
}




await browser.close();
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
