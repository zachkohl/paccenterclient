require('dotenv').config()
const db = require("../lib/postgresSetup");
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const puppeteer = require('puppeteer');
const axios = require('axios');
const readAPI = require('./mapMulti');
async function readCSV(){


    fs.createReadStream(path.resolve(__dirname, 'assets', 'mapSeedData.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', async row => {
  
        /**
         * Here we are attempting to read from the CSV and use it to 
         * A: get data from the public api
         * B: reformat the API data into something we can use with our database
         * C: put it in the database
         *
         */

    try{
        if(row.address.length>5){
   response = await readAPI(row.address)
        }

}catch(error){
    console.log('database error',error)
}




// await browser.close();
    })
    .on('end', rowCount => console.log(`Parsed ${rowCount} rows into maps! check the database for results`));

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
