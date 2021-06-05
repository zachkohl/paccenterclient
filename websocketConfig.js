const WebSocket = require("ws");
var { Client } = require("pg");
// pg.connnect("postgres://postgres:postgres@localhost:5433/paccenter", function (
//   err,
//   client
// ) {
//   if (err) {
//     console.log(err);
//   }
//   client.on("notification", function (msg) {
//     console.log("do we ever get inside notification?");
//     console.log(msg);
//     const payload = JSON.parse(msg.payload);
//     ws.clients.forEach(function each(client) {
//       if (client.readyState === WebSocket.OPEN) {
//         console.log(msg);
//         client.send(msg.payload);
//       }
//     });
//   });
//   client.query("LISTEN new_order");
// });
console.log("got websocket config setup");
function websocketConfig(ws) {
  node: {
    fs: "empty";
  }
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
  client.connect();

  client.on("notification", function (msg) {
    console.log("do we ever get inside notification?");
    console.log(msg);
    const payload = JSON.parse(msg.payload);
    ws.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        console.log(msg);
        client.send(msg.payload);
      }
    });
  });
  client.query("LISTEN new_order");

  // ws.on("connection", function connection(wsInner) {
  //   console.log("connection activated");
  //   wsInner.on("message", function incoming(data) {
  //     console.log(data);
  //     const request = JSON.parse(data);
  //   });
  // });
}
module.exports = websocketConfig;
