package clipping

import (
	"log"
	"net/http"
	"strconv"

	"github.com/PuerkitoBio/goquery"
)

// Clip with page index
func Clip(page int) [][]string {
	start := (page-1)*10 + 1 // 1 : 1, 2 : 11, 3 : 21 ...
	url := "https://search.naver.com/search.naver?&where=news&query=%EA%B0%9C%ED%95%99%20%EC%97%B0%EA%B8%B0&sm=tab_pge&sort=0&photo=0&field=0&reporter_article=&pd=0&ds=&de=&docid=&nso=so:r,p:all,a:all&mynews=0&cluster_rank=37&start=" + strconv.Itoa(start)
	resp, err := http.Get(url)
	checkStatus(resp, err)

	defer resp.Body.Close()

	doc, err := goquery.NewDocumentFromReader(resp.Body)
	checkErr(err)

	searchTopics := doc.Find("a._sp_each_title")

	result := [][]string{}
	result = extractTopic(searchTopics, result)

	return result
}

func extractTopic(searchTopics *goquery.Selection, result [][]string) [][]string {
	searchTopics.Each(func(i int, topic *goquery.Selection) {
		topicTitle := topic.Text()
		topicHref, success := topic.Attr("href")
		if success == false {
			log.Fatalln("Failed to load href")
		}
		result = append(result, []string{topicTitle, topicHref})
	})
	return result
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
