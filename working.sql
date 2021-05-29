--  CREATE TABLE users (
--   users_id serial PRIMARY KEY, 
--   users_username VARCHAR (255) UNIQUE NOT NULL,
--   users_email VARCHAR(255) UNIQUE NOT NULL,
--   users_emailvalidated BOOLEAN,
--   users_storedhash VARCHAR(255) NOT NULL,
--   users_role VARCHAR(255) NOT NULL,
-- users_category VARCHAR(255)
-- );

-- DROP TABLE users;

--  CREATE TABLE users (
--   users_id serial PRIMARY KEY, 
--   users_username VARCHAR (255) UNIQUE NOT NULL,
--   users_storedhash VARCHAR(255) NOT NULL
-- );



--PACCENTER
--from excel
-- {
--   '﻿Voter ID': '10266001',
--   Last: 'AAKHUS',
--   First: 'DOUGLAS',
--   M: 'L',
--   Suffix: '',
--   'Street #': '635',
--   Street: 'E TIGER AVE',
--   'Unit #': '',
--   'Add. 2': '',
--   'Add. 3': '',
--   City: 'POST FALLS',
--   'St.': 'ID',
--   Zip: '83854',
--   'Zip+': '6647',
--   'M. Street #': '635',
--   'M. Street': 'E TIGER AVE',
--   'M. Unit': '',
--   'M. Add. 2': '',
--   'M. Add. 3': '',
--   'M. City': 'POST FALLS',
--   'M. St.': 'ID',
--   'M. Zip': '83854',
--   'M. Zip+': '6647',
--   'M.Country': '',
--   Gender: 'M',
--   '': '57',
--   'Curr.Reg.Date': '11/2/2010',
--   Phone: '2084570694',
--   'L.D.': '3',
--   'Affil.': 'Unaffiliated',
--   'Pct.': '8',
--   'Election Date': '11/6/2012',
--   'Election ': '2012 GENERAL',
--   'Voted/NotVoted': 'VOTED'
-- }




-- create table kcdatadump2(
-- id serial PRIMARY KEY,
-- voterid integer,--       row["﻿Voter ID"],
-- last varchar(255),--       row["Last"],
-- first varchar(255),--        row["First"],
-- m varchar(100),--      row["M"],
-- suffic varchar(100),--     row["Suffix"],
-- streetnum varchar(255),--    row["Street #"],
-- street varchar(255),--     row["Street"],
-- unitnum VARCHAR(255),--     row["Unit #"],
-- add_2 VARCHAR(255),--          row["Add. 2"],
-- add_3 VARCHAR(255),--   row["Add. 3"],
-- City VARCHAR(255),--          row["City"],
-- zip VARCHAR(255),--     row["Zip"],
-- st VARCHAR(255),--   row["St."],
-- zipplus VARCHAR(255),--          row["Zip+"],
-- mstreetnum VARCHAR(255),--     row["M. Street #"],
-- mstreet VARCHAR(255),--     row["M. Street"],
-- munit VARCHAR(255),--   row["M. Unit"],
-- madd_2 VARCHAR(255),--     row["M. Add. 2"],
-- madd_3 VARCHAR(255),--    row["M. Add. 3"],
-- mcity VARCHAR(255),--          row["M. City"],
-- mst VARCHAR(255),--  row["M. St."],
-- mzip VARCHAR(255),--          row["M. Zip"],
-- mziplus VARCHAR(255),--        row["M. Zip+"],
-- mcountry VARCHAR(255),--    row["M.Country"],
-- gender VARCHAR(255),--       row["Gender"],
-- age VARCHAR(255),--      row[""],
-- currregdate VARCHAR(255),--     row["Curr.Reg.Date"],
-- phone VARCHAR(255),--          row["Phone"],
-- ld VARCHAR(255),--        row["L.D."],
-- affil VARCHAR(255),--     row["Affil."],
-- pct VARCHAR(255),-- row["Pct."],
-- electiondate VARCHAR(255),--   row["Election Date"],
-- election VARCHAR(255),--   row["Election "],
-- votednotvoted VARCHAR(255),--      row["Voted/NotVoted"],
-- geog geography(POINT),--     geoString,
-- bingdump jsonb,--     JSON.stringify(blob),
-- csvdump jsonb-- JSON.stringify(row),
-- );











--     create table kcdatadump3(
-- id serial PRIMARY KEY,
-- voterid integer,--       row["﻿Voter ID"],
-- last varchar(255),--       row["Last"],
-- first varchar(255),--        row["First"],
-- m varchar(100),--      row["M"],
-- suffic varchar(100),--     row["Suffix"],
-- streetnum varchar(255),--    row["Street #"],
-- street varchar(255),--     row["Street"],
-- unitnum VARCHAR(255),--     row["Unit #"],
-- add_2 VARCHAR(255),--          row["Add. 2"],
-- add_3 VARCHAR(255),--   row["Add. 3"],
-- City VARCHAR(255),--          row["City"],
-- zip VARCHAR(255),--     row["Zip"],
-- st VARCHAR(255),--   row["St."],
-- zipplus VARCHAR(255),--          row["Zip+"],
-- mstreetnum VARCHAR(255),--     row["M. Street #"],
-- mstreet VARCHAR(255),--     row["M. Street"],
-- munit VARCHAR(255),--   row["M. Unit"],
-- madd_2 VARCHAR(255),--     row["M. Add. 2"],
-- madd_3 VARCHAR(255),--    row["M. Add. 3"],
-- mcity VARCHAR(255),--          row["M. City"],
-- mst VARCHAR(255),--  row["M. St."],
-- mzip VARCHAR(255),--          row["M. Zip"],
-- mziplus VARCHAR(255),--        row["M. Zip+"],
-- mcountry VARCHAR(255),--    row["M.Country"],
-- gender VARCHAR(255),--       row["Gender"],
-- age VARCHAR(255),--      row[""],
-- currregdate VARCHAR(255),--     row["Curr.Reg.Date"],
-- phone VARCHAR(255),--          row["Phone"],
-- ld VARCHAR(255),--        row["L.D."],
-- affil VARCHAR(255),--     row["Affil."],
-- pct VARCHAR(255),-- row["Pct."],
-- electiondate VARCHAR(255),--   row["Election Date"],
-- election VARCHAR(255),--   row["Election "],
-- votednotvoted VARCHAR(255),--      row["Voted/NotVoted"],
-- geog geography(POINT),--     geoString,
-- bingdump jsonb,--     JSON.stringify(blob),
-- csvdump jsonb-- JSON.stringify(row),
-- );





-- csvdump jsonb
-- );

-- CREATE TABLE walkingLists
-- (
--     id serial PRIMARY KEY,
--     name VARCHAR (255) UNIQUE NOT NULL,
--     created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
--     nextVisit NUMERIC (5, 2)
-- );

-- CREATE TABLE visits
-- (
--     walkinglistid integer REFERENCES walkinglists(id) ON UPDATE CASCADE ON DELETE CASCADE,
--     pointid integer REFERENCES kcdatadump2(id) ON UPDATE CASCADE ON DELETE CASCADE,
--     number  NUMERIC (5, 2),
--     CONSTRAINT visit_pkey PRIMARY KEY (walkinglistid,pointid)
-- );


create table volunteerSignup(
uuid uuid DEFAULT uuid_generate_v4 (),
last varchar(255),
first varchar(255),
street varchar(255),
City VARCHAR(255),
State VARCHAR(255),
zip VARCHAR(255),
phone VARCHAR(255),
email VARCHAR(255),
willingToServeAsCandiate BOOLEAN,
geog geography(POINT),
googleDump jsonb,
singupDate TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (uuid)
)


-- CREATE TABLE KCADDRESSES AS 
-- SELECT
-- DISTINCT ON (geog) geog,
-- id,
--  streetnum ,
-- street,
-- unitnum,
--  add_2,
-- add_3,
-- City,
-- zip,
-- st,
-- zipplus,
-- bingdump 
-- FROM kcdatadump2;

--     create table kcdatadump3(
-- id serial PRIMARY KEY,
-- voterid integer,--       row["﻿Voter ID"],
-- last varchar(255),--       row["Last"],
-- first varchar(255),--        row["First"],
-- m varchar(100),--      row["M"],
-- suffic varchar(100),--     row["Suffix"],
-- streetnum varchar(255),--    row["Street #"],
-- street varchar(255),--     row["Street"],
-- unitnum VARCHAR(255),--     row["Unit #"],
-- add_2 VARCHAR(255),--          row["Add. 2"],
-- add_3 VARCHAR(255),--   row["Add. 3"],
-- City VARCHAR(255),--          row["City"],
-- zip VARCHAR(255),--     row["Zip"],
-- st VARCHAR(255),--   row["St."],
-- zipplus VARCHAR(255),--          row["Zip+"],
-- mstreetnum VARCHAR(255),--     row["M. Street #"],
-- mstreet VARCHAR(255),--     row["M. Street"],
-- munit VARCHAR(255),--   row["M. Unit"],
-- madd_2 VARCHAR(255),--     row["M. Add. 2"],
-- madd_3 VARCHAR(255),--    row["M. Add. 3"],
-- mcity VARCHAR(255),--          row["M. City"],
-- mst VARCHAR(255),--  row["M. St."],
-- mzip VARCHAR(255),--          row["M. Zip"],
-- mziplus VARCHAR(255),--        row["M. Zip+"],
-- mcountry VARCHAR(255),--    row["M.Country"],
-- gender VARCHAR(255),--       row["Gender"],
-- age VARCHAR(255),--      row[""],
-- currregdate VARCHAR(255),--     row["Curr.Reg.Date"],
-- phone VARCHAR(255),--          row["Phone"],
-- ld VARCHAR(255),--        row["L.D."],
-- affil VARCHAR(255),--     row["Affil."],
-- pct VARCHAR(255),-- row["Pct."],
-- electiondate VARCHAR(255),--   row["Election Date"],
-- election VARCHAR(255),--   row["Election "],
-- votednotvoted VARCHAR(255),--      row["Voted/NotVoted"],
-- geog geography(POINT),--     geoString,
-- bingdump jsonb,--     JSON.stringify(blob),
-- csvdump jsonb-- JSON.stringify(row),
-- );


 ALTER TABLE bcvoterregmarch21 add column uid uuid NOT NULL DEFAULT uuid_generate_v1();
--https://stackoverflow.com/questions/9789736/how-to-implement-a-many-to-many-relationship-in-postgresql
   create table relationships(
relationships_uid uuid DEFAULT uuid_generate_v1 (),
parent uuid,
child uuid,
   PRIMARY KEY (uuid)
)



   create table points(
relationships_uid uuid DEFAULT uuid_generate_v1(),
geog geography(POINT),
apidump jsonb,
   PRIMARY KEY (uuid)
)


--had to do some slight modifications to created tables, see above for current version (as of May 29 7:11 am 2021)
ALTER TABLE relationships 
RENAME COLUMN uuid TO uid;