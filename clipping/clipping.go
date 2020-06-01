package clipping

import (
	"log"
	"net/http"
	"net/url"
	"strconv"

	"github.com/PuerkitoBio/goquery"
)

// Clip with page index
func Clip(query string, page int) [][]string {

	query = url.QueryEscape(query)
	start := strconv.Itoa((page-1)*10 + 1) // 1 : 1, 2 : 11, 3 : 21 ...
	url := "https://search.naver.com/search.naver?&where=news&query=" + query + "&sm=tab_pge&sort=0&photo=0&field=0&reporter_article=&pd=0&ds=&de=&docid=&nso=so:r,p:all,a:all&mynews=0&cluster_rank=37&start=" + start
	resp, err := http.Get(url)
	checkStatus(resp, err)

	defer resp.Body.Close()

	doc, err := goquery.NewDocumentFromReader(resp.Body)
	checkErr(err)

	searchTopics := doc.Find("a._sp_each_title")

	result := extractTopic(searchTopics)

	return result
}

func extractTopic(searchTopics *goquery.Selection) [][]string {
	target := [][]string{}
	searchTopics.Each(func(i int, topic *goquery.Selection) {
		topicTitle := topic.Text()
		topicHref, success := topic.Attr("href")
		if success == false {
			log.Fatalln("Failed to load href")
		}
		target = append(target, []string{topicTitle, topicHref})
	})
	return target
}

func checkErr(err error) {
	if err != nil {
		log.Fatalln(err)
	}
}

func checkStatus(resp *http.Response, err error) {
	checkErr(err)
	if resp.StatusCode != 200 {
		log.Fatalln("Response failed with Status :", resp.Status)
	}
}
