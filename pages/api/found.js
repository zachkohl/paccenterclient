export default (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 404;
  res.end(JSON.stringify({ name: "Nextjs" }));
};
