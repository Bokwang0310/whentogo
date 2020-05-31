package clipping

import (
	"net/http"
	"net/url"

	"github.com/PuerkitoBio/goquery"
)

// Recommend word
func Recommend(query string) []string {
	query = url.QueryEscape(query)
	url := "https://search.naver.com/search.naver?&where=news&query=" + query + "&sm=tab_pge&sort=0&photo=0&field=0&reporter_article=&pd=0&ds=&de=&docid=&nso=so:r,p:all,a:all&mynews=0&cluster_rank=37&start=1"
	resp, err := http.Get(url)
	checkStatus(resp, err)

	defer resp.Body.Close()

	doc, err := goquery.NewDocumentFromReader(resp.Body)
	checkErr(err)

	searchTopics := doc.Find("ul._related_keyword_ul li a")
	result := []string{}
	result = extractRecommned(searchTopics, result)

	return result
}

func extractRecommned(searchRecommned *goquery.Selection, result []string) []string {
	searchRecommned.Each(func(i int, recommend *goquery.Selection) {
		word := recommend.Text()
		result = append(result, word)
	})
	return result
}
