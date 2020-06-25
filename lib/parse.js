const axios = require("axios");
const parser = require("node-html-parser");
const entityDecoder = require("html-entities").AllHtmlEntities;
const qs = require("querystring");

const getURL = (query, page = 1) => {
  if (typeof page !== "number") {
    page = 1;
  }
  query = qs.escape(query);
  const start = (Number(page) - 1) * 10 + 1;
  // const url = `https://search.naver.com/search.naver?&where=news&query=${query}&sm=tab_pge&sort=0&photo=0&field=0&reporter_article=&pd=0&ds=&de=&docid=&nso=so:r,p:all,a:all&mynews=0&cluster_rank=37&start=${start}`;
  const url = `http://qwerasdfzxcv.com/`; // test url for response Error
  return url;
};

const getResponse = async (url) => {
  try {
    return await axios.get(url);
  } catch (err) {
    console.log("getResponse Error");
    return err;
  }
};

// TODO : 중요! 한 페이지를 로딩시킬 때 getRes를 두 번 호출 -> 개구림
// => 어차피 기사, 연관검색어는 같은 URL을 쓰니까 한 번만 호출하는걸로.

const getArticle = async (query, page) => {
  const url = getURL(query, page);

  const articles = [];

  await getResponse(url)
    .then((res) => {
      if (res instanceof Error) {
        articles.push([["문제가 생겼습니다.", "#"]]);
        return;
      }
      const elements = getElements(res, "a._sp_each_title");
      const entities = new entityDecoder();
      elements.forEach((element) => {
        const title = entities.decode(element.rawText);
        const href = element.getAttribute("href");
        const article = [title, href];
        articles.push(article);
      });
    })
    .catch((err) => {
      console.log("getResponse Error");
    });

  return articles;
};

const getRecommend = async (query) => {
  const url = getURL(query);

  const keywords = [];

  await getResponse(url)
    .then((res) => {
      if (res instanceof Error) {
        keywords.push([["문제가 생겼습니다.", "#"]]);
        return;
      }
      const elements = getElements(res, "ul._related_keyword_ul li a");
      const entities = new entityDecoder();
      elements.forEach((element) => {
        const keyword = entities.decode(element.rawText);
        keywords.push(keyword);
      });
    })
    .catch((err) => {
      console.log("getRecommend Error");
    });

  return keywords;
};

const getElements = (res, selector) => {
  const document = parser.parse(res.data, { lowerCaseTagName: true });
  const elements = document.querySelectorAll(selector);
  return elements;
};

exports.getArticle = getArticle;
exports.getRecommend = getRecommend;
