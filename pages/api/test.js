module.exports = (req, res) => {
  res
    .writeHead(200, {
      "Set-Cookie": "mycookie=test",
      "Content-Type": "text/plain"
    })
    .end("hello world");
};
