import React, { useState, useEffect } from "react";
import "../styles/news.css";
import { Link } from "react-router-dom";
import { useQueryParam, NumberParam } from "use-query-params";

// TODO : 관련 검색어 포맷, CSS CSS CSS CSS 제발 CSS, 코드 정리, 에러햄들링(404에러, JSON)
function News() {
  const [newsList, setNewsList] = useState([["뉴스를 로드 중 입니다", "#"]]);
  const [recommendList, setRecommendList] = useState([
    "관련 검색어 로드 중입니다",
  ]);
  const [query, setQuery] = useState("개학 연기");

  const [currentPage, setCurrentPage] = useQueryParam("page", NumberParam);

  useEffect(() => {
    const url = `/news/api/topic?query=${query}&page=${currentPage}`;
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        const newsArr = json.List;
        const recommnedArr = json.Recommend;

        setNewsList(newsArr);
        setRecommendList(recommnedArr);
      })
      .catch((err) => {
        console.error(err); // 에러핸들링
      });
  }, [query, currentPage]);

  const liTags = [];
  newsList.forEach((news, i) => {
    liTags.push(
      <li key={i}>
        <a href={news[1]}>{news[0]}</a>
      </li>
    );
  });

  const tag = [];
  recommendList.forEach((word) => {
    tag.push('"' + word + '"');
  });
  console.log(tag.join(","));

  return (
    <>
      <header>
        <h1>When To Go! vNews</h1>
      </header>
      <article>
        <ul>{liTags}</ul>
      </article>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          e.preventDefault();
          setQuery(e.target.value);
        }}
      />
      <div className="indexContainer">
        <button
          onClick={() => {
            setCurrentPage(1);
          }}
        >
          1
        </button>
        <button
          onClick={() => {
            setCurrentPage(2);
          }}
        >
          2
        </button>
      </div>
      <div className="recommend">{tag.join(", ")}</div>
      <footer className="newsFooter">
        <div className="footer-2">
          <span className="none" role="img" aria-label="page">
            🚀
          </span>
          <Link to="/calc" className="show">
            Calculate
          </Link>
        </div>
      </footer>
    </>
  );
}

export default News;
