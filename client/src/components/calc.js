import React from "react";
import "../styles/calc.css";
import { Link } from "react-router-dom";

function Calc() {
  return (
    <div>
      <header>
        <h1>When To Go! vCalculate</h1>
      </header>
      <form>
        <p>
          <label>
            기존 개학 예정일
            <input id="origin" type="date" value="2020-03-02" readOnly />
          </label>
        </p>
        <p>
          <label>
            현재 바뀐 개학일
            <input id="changed" type="date" value="2020-06-03" readOnly />
          </label>
        </p>
      </form>
      <div className="btn-wrapper">
        <button>
          <span role="img" aria-label="go">
            💨
          </span>
        </button>
      </div>
      <article>
        <div className="detail">빠륵</div>
        <div className="only-day">미륵</div>
      </article>
      <footer>
        <div className="footer-1">
          <span className="none" role="img" aria-label="page">
            🚀
          </span>
          <Link to="/news" className="show">
            Search
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default Calc;
