const app = require("express")();
const axios = require("axios");
const parser = require("node-html-parser");
const entityDecoder = require("html-entities").AllHtmlEntities;

const port = 8080;

app.get("/news/api/topic", async (req, res) => {
  const obj = {};
  await getArticle("hello", 1).then((a) => {
    obj.List = a;
  });
  await getRecommend("hello").then((a) => {
    obj.Recommend = a;
  });
  res.send(obj);
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

const getResponse = async (url) => {
  try {
    return await axios.get(url);
  } catch (error) {
    console.error(error);
  }
};

function getURL(query, page = 1) {
  const start = (Number(page) - 1) * 10 + 1; // 들어오는 숫자 거르는 프로세스 만들기
  const url = `https://search.naver.com/search.naver?&where=news&query=${query}&sm=tab_pge&sort=0&photo=0&field=0&reporter_article=&pd=0&ds=&de=&docid=&nso=so:r,p:all,a:all&mynews=0&cluster_rank=37&start=${start}`;
  return url;
}

function getElements(res, selector) {
  const document = parser.parse(res.data, { lowerCaseTagName: true });
  const elements = document.querySelectorAll(selector);
  return elements;
}

async function getArticle(query, page) {
  const url = getURL(query, page);

  const articles = [];

  await getResponse(url)
    .then((res) => {
      const elements = getElements(res, "a._sp_each_title");
      const entities = new entityDecoder();
      elements.forEach((element) => {
        const title = entities.decode(element.rawText);
        const href = element.getAttribute("href");
        const article = [title, href];
        articles.push(article);
      });
    })
    .catch((err) => console.error(err));

  return articles;
}

async function getRecommend(query) {
  const url = getURL(query);

  const keywords = [];

  await getResponse(url)
    .then((res) => {
      const elements = getElements(res, "ul._related_keyword_ul li a");
      const entities = new entityDecoder();
      elements.forEach((element) => {
        const keyword = entities.decode(element.rawText);
        keywords.push(keyword);
      });
    })
    .catch((err) => console.error(err));

  return keywords;
}
