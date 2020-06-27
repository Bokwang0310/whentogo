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
  const url = `https://search.naver.com/search.naver?&where=news&query=${query}&sm=tab_pge&sort=0&photo=0&field=0&reporter_article=&pd=0&ds=&de=&docid=&nso=so:r,p:all,a:all&mynews=0&cluster_rank=37&start=${start}`;
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

const parse = async (query, page) => {
  const json = {};
  const url = getURL(query, page);

  await getResponse(url).then((res) => {
    if (res instanceof Error) {
      json.List = [["문제가 생겼습니다.", "#"]];
      json.Recommend = ["문제가 생겼습니다."];
      return;
    }

    json.List = getArticle(res);
    json.Recommend = getRecommend(res);
  });

  return json;
};

const getArticle = (res) => {
  const articles = [];

  const elements = getElements(res, "a._sp_each_title");
  const entities = new entityDecoder();
  elements.forEach((element) => {
    const title = entities.decode(element.rawText);
    const href = element.getAttribute("href");
    const article = [title, href];
    articles.push(article);
  });

  return articles;
};

const getRecommend = (res) => {
  const keywords = [];

  const elements = getElements(res, "ul._related_keyword_ul li a");
  const entities = new entityDecoder();
  elements.forEach((element) => {
    const keyword = entities.decode(element.rawText);
    keywords.push(keyword);
  });

  return keywords;
};

const getElements = (res, selector) => {
  const document = parser.parse(res.data, { lowerCaseTagName: true });
  const elements = document.querySelectorAll(selector);
  return elements;
};

exports.parse = parse;
