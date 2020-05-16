const form = document.querySelector(".form");
const originInput = form.querySelector("#origin");
const changedInput = form.querySelector("#changed");
const article = document.querySelector("article");
const btn = document.querySelector("button");

const footer = document.querySelector("footer");
const footerSection = footer.querySelectorAll("div");

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
  const onlyDay = article.querySelector(".only-day");
  const detail = article.querySelector(".detail");
  switch (diff.length) {
    case undefined:
      onlyDay.innerText = `${diff}일 밀렸습니다`;
      detail.innerText = "";
      break;

    case 3:
      detail.innerText = `${diff[1]}개월, ${diff[2]}일 밀렸습니다`;
      onlyDay.innerText = `총 ${diff[0]}일 밀렸습니다`;
      break;

    default:
      detail.innerText = `${diff[1]}년, ${diff[2]}개월, ${diff[3]}일 밀렸습니다`;
      onlyDay.innerText = `총 ${diff[0]}일 밀렸습니다.`;
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

function handleSectionEnter(e) {
  const target = e.target;
  const p = target.querySelector("p");
  const span = target.querySelector("span");
  p.classList.replace("show", "none");
  span.classList.replace("none", "show");

  target.classList.add("hover");
}

function handleSectionLeave(e) {
  const target = e.target;
  const p = target.querySelector("p");
  const span = target.querySelector("span");
  p.classList.replace("none", "show");
  span.classList.replace("show", "none");

  target.classList.remove("hover");
}

function init() {
  btn.addEventListener("click", handleSubmit);
  footerSection.forEach((section) => {
    section.addEventListener("mouseenter", handleSectionEnter);
    section.addEventListener("mouseleave", handleSectionLeave);
  });
}

init();
