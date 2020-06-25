const app = require("express")();
const axios = require("axios");
const parser = require("node-html-parser");
const entityDecoder = require("html-entities").AllHtmlEntities;
const port = 8080;

app.get("/news/api/topic", (req, res) => {
  const obj = {
    List: [
      ["Naver", "https://naver.com/"],
      ["Google", "https://google.co.kr/"],
    ],
    Recommend: [1, 2, 3],
  };
  res.send(obj);
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

function getObj(query, page) {
  const url = `https://search.naver.com/search.naver?&where=news&query=${query}&sm=tab_pge&sort=0&photo=0&field=0&reporter_article=&pd=0&ds=&de=&docid=&nso=so:r,p:all,a:all&mynews=0&cluster_rank=37&start=${page}`;
}

const getHTML = async () => {
  try {
    return await axios.get(url);
  } catch (error) {
    console.error(error);
  }
};

getHTML().then((html) => {
  const root = parser.parse(html.data, { lowerCaseTagName: true });
  const rawText = root.querySelector("a._sp_each_title").rawText; // querySelectorAll로 배열로 싹 긁어오기

  const entities = new entityDecoder();
  console.log(entities.decode(rawText)); // + 배열 각 요소에 함수를 적용하고 다시 배열로 반환하는 함수 필요 : map인지 filter인지

  // go 잔해들 싹 지우고 프론트에서도 json 포맷 새로 갈자
  // 폴더구조도 client-server 말고 그냥 통합해서 노드모듈+패키지json+얀락 하나로 같이 쓰기
  // -> 기존 모듈 싹 지우고 클라에 있는 패키지json에 노드 서버에 썼던 의존 다 추가 그리고 yarn으로 설치
});
