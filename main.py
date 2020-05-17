import requests
from bs4 import BeautifulSoup

# 페이지의 경우 1부터 시작해서 10씩 증가 (한 페이지에 10개 토픽 나타난다.)
url = f"https://search.naver.com/search.naver?&where=news&query=%EA%B0%9C%ED%95%99%20%EC%97%B0%EA%B8%B0&sm=tab_pge&sort=0&photo=0&field=0&reporter_article=&pd=0&ds=&de=&docid=&nso=so:r,p:all,a:all&mynews=0&cluster_rank=37&start=1"

resp = requests.get(url)

print()
print(resp.headers)
print()

html = resp.text

bs = BeautifulSoup(html, "html.parser")
tag = bs.select("ul.type01 li dl dt a._sp_each_title")[1]

href = tag["href"]
print(href)

for strong in tag.findAll("strong"):
    strong.unwrap()

text = tag.contents
print(text)

clear = "".join(text)
print(clear)
