const form = document.querySelector(".form");
const originInput = form.querySelector(".origin");
const changedInput = form.querySelector(".changed");
const article = document.querySelector("article");

function parseDate(htmlDate) {
  const cleanedStr = htmlDate.toString().split("-").join("");

  // Indexing Year, Month, Day from date string
  const y = cleanedStr.substr(0, 4);
  const m = cleanedStr.substr(4, 2);
  const d = cleanedStr.substr(6, 2);

  return (date = new Date(y, m - 1, d));
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

function insert(diff) {
  switch (diff.length) {
    case undefined:
      article.innerText = `${diff}일 밀림`;
      break;

    case 3:
      article.innerText = `${diff[1]}월 하고 ${diff[2]}일 밀림 총 ${diff[0]}일 밀림`;
      break;

    default:
      article.innerText = `${diff[1]}년 하고 ${diff[2]}월 하고 ${diff[3]}일 밀림 총 ${diff[0]}일 밀림`;
      break;
  }
}

function handleSubmit(e) {
  e.preventDefault();
  const originDate = parseDate(originInput.value);
  const changedDate = parseDate(changedInput.value);
  const diff = getDiff(originDate, changedDate);
  insert(diff);
}

function init() {
  form.addEventListener("submit", handleSubmit);
}

init();
