const app = require("express")();
const axios = require("axios");
const parser = require("node-html-parser");
const entityDecoder = require("html-entities").AllHtmlEntities;

const port = 8080;

app.get("/news/api/topic", (req, res) => {
  const obj = getArticle("hello", 1).then((a) => {
    console.log(a);
    res.send(a);
  });
  console.dir(obj, 3493489);
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

const getHTML = async (url) => {
  try {
    return await axios.get(url);
  } catch (error) {
    console.error(error);
  }
};

// 함수를 분리하자.
async function getArticle(query, page) {
  const start = (Number(page) - 1) * 10 + 1; // 들어오는 숫자 거르는 프로세스 만들기
  const url = `https://search.naver.com/search.naver?&where=news&query=${query}&sm=tab_pge&sort=0&photo=0&field=0&reporter_article=&pd=0&ds=&de=&docid=&nso=so:r,p:all,a:all&mynews=0&cluster_rank=37&start=${start}`;

  const articles = [];

  await getHTML(url)
    .then((res) => {
      const document = parser.parse(res.data, { lowerCaseTagName: true });
      const topics = document.querySelectorAll("a._sp_each_title");

      const entities = new entityDecoder();
      topics.forEach((topic) => {
        const title = entities.decode(topic.rawText);
        const href = topic.getAttribute("href");
        const article = [title, href];
        articles.push(article);
      });
    })
    .catch((err) => console.error(err)); //

  return articles;
}
