const head = document.querySelector("head");
const aTags = document.querySelectorAll("div.main a");
const section = document.querySelector("section");
// css
const mainCSS = head.querySelector("link.main");
const calcCSS = head.querySelector("link.calc");
const newsCSS = head.querySelector("link.news");

// js
const mainJS = head.querySelector("script.main");
const calcJS = head.querySelector("script.calc");
const newsJS = head.querySelector("script.news");

function changeHead() {
  if (location.hash.substr(2) === "calc") {
    if (mainCSS) {
      head.removeChild(mainCSS);
    } else if (mainJS) {
      head.removeChild(mainJS);
    } else if (newsCSS) {
      head.removeChild(newsCSS);
    } else if (newsJS) {
      head.removeChild(newsJS);
    }
    addScript("./js/calc.js", "calc");
    addStyle("./css/calc.css", "calc");
  } else if (location.hash.substr(2) === "news") {
    if (mainCSS) {
      head.removeChild(mainCSS);
    } else if (mainJS) {
      head.removeChild(mainJS);
    } else if (calcCSS) {
      head.removeChild(calcCSS);
    } else if (calcJS) {
      head.removeChild(calcJS);
    }
    addScript("./js/news.js", "news");
    addStyle("./css/news.css", "news");
  } else {
    if (calcCSS) {
      head.removeChild(calcCSS);
    } else if (calcJS) {
      head.removeChild(calcJS);
    } else if (calcCSS) {
      head.removeChild(calcCSS);
    } else if (calcJS) {
      head.removeChild(calcJS);
    }
    addScript("./js/main.js", "main");
    addStyle("./css/main.css", "main");
  }
}

function addScript(src, className) {
  const script = document.createElement("script");
  script.setAttribute("src", src);
  script.setAttribute("class", className);
  script.setAttribute("defer", "true");
  document.head.appendChild(script);
}

function addStyle(href, className) {
  const link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("href", href);
  link.setAttribute("class", className);
  document.head.appendChild(link);
}

changeHead();

aTags.forEach((a) => {
  a.addEventListener("click", changeHead);
});

section.addEventListener("click", changeHead);
