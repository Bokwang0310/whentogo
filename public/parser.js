const page = 1;

function getNewsList() {
  const url = `http://localhost:8080/news/api/topic?page=${page}`;
  fetch(url, { mode: "cors" })
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      console.log(JSON.parse(json));
    })
    .catch((err) => {
      console.error(err);
    });
}

getNewsList();
