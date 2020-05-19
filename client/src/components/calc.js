import React, { useState } from "react";
import "../styles/calc.css";
import { Link } from "react-router-dom";

function Calc() {
  const [result, setResult] = useState(["좀 더 디테일", "일 수"]);
  const [originDay, setOriginDay] = useState("2020-03-02");
  const [changedDay, setChangedDay] = useState("2020-06-03");

  function parseDate(htmlDate) {
    const cleanedStr = htmlDate.toString().split("-").join("");

    // Indexing Year, Month, Day from date string
    const y = cleanedStr.substr(0, 4);
    const m = cleanedStr.substr(4, 2);
    const d = cleanedStr.substr(6, 2);

    return new Date(y, m - 1, d);
  }

  function getDiff(fromDay, toDay) {
    const diff = toDay.getTime() - fromDay.getTime();
    const diffDays = diff / 1000 / 60 / 60 / 24; // 두 날짜의 차이 일수

    let year;
    let month;
    let day;

    // All conditions return must include diffDays
    if (diffDays < 30) {
      return diffDays;
    } else if (diffDays < 365) {
      month = Math.floor(diffDays / 30);
      day = diffDays - month * 30;
      return [diffDays, month, day];
    } else {
      year = Math.floor(diffDays / 365);
      month = Math.floor((diffDays - year * 365) / 30);
      day = diffDays - year * 365 - month * 30;
      return [diffDays, year, month, day];
    }
  }

  function diffToString(diff) {
    switch (diff.length) {
      case undefined:
        return [`${diff}일 밀렸습니다`, ""];

      case 3:
        return [
          `${diff[1]}개월, ${diff[2]}일 밀렸습니다`,
          `총 ${diff[0]}일 밀렸습니다`,
        ];

      default:
        return [
          `${diff[1]}년, ${diff[2]}개월, ${diff[3]}일 밀렸습니다`,
          `총 ${diff[0]}일 밀렸습니다.`,
        ];
    }
  }

  function handleClick() {
    const origin = parseDate(originDay);
    const changed = parseDate(changedDay);
    const diff = getDiff(origin, changed);
    const result = diffToString(diff);
    setResult(result);
  }

  return (
    <>
      <header>
        <h1>When To Go! vCalculate</h1>
      </header>
      <form>
        <p>
          <label>
            기존 개학 예정일
            <input
              id="origin"
              type="date"
              value={originDay}
              name="origin"
              onChange={(e) => {
                setOriginDay(e.target.value);
              }}
            />
          </label>
        </p>
        <p>
          <label>
            현재 바뀐 개학일
            <input
              id="changed"
              type="date"
              value={changedDay}
              name="changed"
              onChange={(e) => {
                setChangedDay(e.target.value);
              }}
            />
          </label>
        </p>
      </form>
      <div className="btn-wrapper">
        <button onClick={handleClick}>
          <span role="img" aria-label="go">
            💨
          </span>
        </button>
      </div>
      <article>
        <div className="detail">{result[0]}</div>
        <div className="only-day">{result[1]}</div>
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
    </>
  );
}

export default Calc;
