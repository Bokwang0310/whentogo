const app = require("express")();
const port = 8080;

const getArticle = require("./lib/parse").getArticle;
const getRecommend = require("./lib/parse").getRecommend;

app.get("/news/api/topic", async (req, res) => {
  console.log(req.query);
  const obj = {};

  await getArticle("hello", 1).then((article) => {
    obj.List = article;
  });
  await getRecommend("hello").then((recommend) => {
    obj.Recommend = recommend;
  });

  res.send(obj);
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
