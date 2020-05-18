import React from "react";
import "../styles/news.css";
import { Link } from "react-router-dom";

function News() {
  return (
    <div>
      <header>
        <h1>When To Go! vNews</h1>
      </header>
      <article>
        <div className="detail">빠륵</div>
        <div className="only-day">미륵</div>
      </article>
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
    </div>
  );
}

export default News;
