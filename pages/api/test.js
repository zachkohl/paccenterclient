export default (req, res) => {
  // res.setHeader("Content-Type", "application/json");
  //  res.statusCode = 404;

  console.log("data");
  res.end(JSON.stringify({ name: "Nextjs" }));
};
