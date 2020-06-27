const app = require("express")();
const port = 8080;

const parse = require("./lib/parse").parse;

app.get("/news/api/topic", async (req, res) => {
  const queryString = req.query;
  const query = queryString.query;
  const page = queryString.page;

  const obj = await parse(query, page);

  res.send(obj);
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
