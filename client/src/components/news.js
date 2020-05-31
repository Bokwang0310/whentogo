import React, { useState, useEffect } from "react";
import "../styles/news.css";
import { Link } from "react-router-dom";
import { useQueryParam, NumberParam } from "use-query-params";

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
        const newsArr = JSON.parse(json).List;
        const recommnedArr = JSON.parse(json).Recommend;
        setRecommendList(recommnedArr);
        setNewsList(newsArr);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [query, currentPage]);

  const liTags = [];
  for (let i = 0; i < newsList.length; i++) {
    liTags.push(
      <li key={i}>
        <a href={newsList[i][1]}>{newsList[i][0]}</a>
      </li>
    );
  }

  console.log(liTags);
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
      <button>search</button>
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
      <div className="recommend">{recommendList}</div>
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
