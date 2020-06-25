const app = require("express")();
const port = 8080;

const getArticle = require("./lib/parse").getArticle;
const getRecommend = require("./lib/parse").getRecommend;

app.get("/news/api/topic", async (req, res) => {
  const queryString = req.query;
  const obj = {};

  await getArticle(queryString.query, queryString.page).then((article) => {
    obj.List = article;
  });
  await getRecommend(queryString.query).then((recommend) => {
    obj.Recommend = recommend;
  });

  res.send(obj);
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
