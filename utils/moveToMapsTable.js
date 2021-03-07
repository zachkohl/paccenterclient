require('dotenv').config()
const db = require("../lib/postgresSetup");
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const puppeteer = require('puppeteer');
const axios = require('axios');
const readAPI = require('./mapMulti');

// const tableName = `idahocities3`;
// const source = "March 6 2021 idaho cities data dump";
async function moveTableToMaps(tableName){

    //This is commented out to keep the script from accidentially being run
    // let sql = `select * from ${tableName}`;
    // let values = [];

    const dbResponse = await db.query(sql, values);

    console.log(dbResponse.rows[0])


    for(let i = 0;i<dbResponse.rows.length;i++){
        let sql = `INSERT INTO MAPS(name,source,perimeter) VALUES($1,$2,$3);`;
        let values = [dbResponse.rows[i].name,source,dbResponse.rows[i].geog];
        console.log(`inserting ${dbResponse.rows[i].name}`)
        const insertResponse = await db.query(sql, values);

    }
console.log("maps table has been updated")

}

moveTableToMaps(tableName);