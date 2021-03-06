import React from "react";
import "../styles/main.css";
import { Link } from "react-router-dom";

function Main() {
  return (
    <>
      <header>
        <h1>When To Go!</h1>
      </header>
      <article>
        <div className="article">Hello, world!</div>
      </article>
      <footer>
        <div className="footer-1">
          <Link to="/news?page=1" className="show">
            Search
          </Link>
        </div>
        <div className="footer-2">
          <Link to="/calc" className="show">
            Calculate
          </Link>
        </div>
      </footer>
    </>
  );
}

export default Main;
