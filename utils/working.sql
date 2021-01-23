//This file is sql that has been run on the sql database. Useful for recreating the database. 
//it is also incomplete, it is more like a working doc, hence the name.
//This is mainly to show how to setup a geography table. 

CREATE TABLE maps (
    uuid uuid DEFAULT uuid_generate_v4 (),
    name VARCHAR NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    source VARCHAR NOT NULL,
    perimeter GEOGRAPHY(multipolygon),
    PRIMARY KEY (uuid)
);

-- SELECT AddGeometryColumn(
--   'maps',
--   'geom', 
--   3857,
--   'multipolygon',
--   2
-- );