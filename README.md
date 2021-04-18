# paccenterclient
A hot mess of various projects that bring friends together and help save the world


We need to build this out so that it is easy to add plugins.

## big ideas
this project started with the goal of being a campaign management platform, it is rapidly turning into a project for interfacing with locally hosted systems used for information gathering by citizens to build distributed data stores. Call me for more details. 

## Original vision: Campaign management

We want a way to manage campaigns. Each campaign then gets its own admins who manage their volunteers. Volunteers get access to specific tools for their campaign.

Tools include

1. walking list generator
2. Walking list assigner
3. Walking list feedback gathering
4. Leaderboard stats (based off of walking list feedback).

There should also be a mobile app that allows visiting voters with realtime updates of all the volunteers efforts. The goal is to make door knocking a sport. 

There should also be a feature for delivering signs to voters who have requested one. 

## othe notes:

### Vision for "running" feature
1. We need a way to get maps from arcGIS pro into the maps table
   1. https://support.esri.com/en/technical-article/000002438
   2. 
2. Put in maps for key races
3. Prepare map search process (for getting more maps)

### How to get ArcGISPro maps into database
1. Download ARcGISPro file from government website
2. Open in ArcGISPro
   1. Convert to shape file and save on harddrive (see https://support.esri.com/en/technical-article/000002438)
   2. Make sure to change coordinate system to WGS 1984 
      1. Once in the export dialog (see article), 
      2. go to environments -> output coordinate system. 
      3. Click the globe
      4. WSG 1984 can be found under geographic coordinate system -> world
   3. Make sure to save the shape file somewhere you can find it. 
3. Use PostGIS Shapefile Import/Export Manager
   1. Connect to database (use credentials from .env)
   2. Add the file
   3. Select options -> check the box fpor "Load into GEOGRAPHY column"
   4. Click Import
4. Verify new table in PGAdmin or other tool. The importer should have built a new table with the name of the shapefile.
5. Move this table into the maps table by using a the moveMap script that is part of this repository. Make sure to update the ./utils/moveToMapsTable file with the correct name and source variables before running. 
