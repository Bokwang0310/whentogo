import React from "react";
import "../styles/main.css";

function Main() {
  return (
    <div>
      <header>
        <h1>When To Go!</h1>
      </header>
      <article>
        <div className="article">Hello, world!</div>
      </article>
      <footer>
        <div className="footer-1">
          <span className="none" role="img" aria-label="page">
            🚀
          </span>
          <p className="show">Search</p>
        </div>
        <div className="footer-2">
          <span className="none" role="img" aria-label="page">
            🚀
          </span>
          <p className="show">Calculate</p>
        </div>
      </footer>
    </div>
  );
}

export default Main;
