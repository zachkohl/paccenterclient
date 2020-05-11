const WebSocket = require("ws");
function websocketConfig(ws) {
  ws.on("connection", function connection(wsInner) {
    console.log("connection activated");
    wsInner.on("message", function incoming(data) {
      console.log(data);
      const request = JSON.parse(data);
      ws.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          const id = request.pointId;
          console.log(request);
          client.send(JSON.stringify({ id: id }));
        }
      });
    });
  });
}
module.exports = websocketConfig;
