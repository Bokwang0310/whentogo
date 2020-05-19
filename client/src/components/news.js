import React, { useState, useEffect } from "react";
import "../styles/news.css";
import { Link } from "react-router-dom";
import { useQueryParam, NumberParam } from "use-query-params";

function News() {
  const [newsList, setNewsList] = useState([["뉴스를 로드 중 입니다", "#"]]);
  const [currentPage, setCurrentPage] = useQueryParam("page", NumberParam);

  useEffect(() => {
    const page = currentPage;
    const url = `/news/api/topic?page=${page}`;
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        const newsArr = JSON.parse(json).List;
        setNewsList(newsArr);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [currentPage]);

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
      <footer>
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
