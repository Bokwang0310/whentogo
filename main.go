package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/labstack/echo"

	"github.com/Bokwang0310/whentogo/clipping"
)

func main() {
	e := echo.New()

	e.Static("/", "client/public")
	e.GET("/news/api/topic", apiTopicGet)

	e.Logger.Fatal(e.Start(":8080"))
}

type newsList struct {
	List      [][]string
	Recommend []string
}

func apiTopicGet(c echo.Context) error {
	page := parsePage(c)
	query := parseQuery(c)
	result := clipping.Clip(query, page)
	//
	recommend := clipping.Recommend("등교 개학")

	obj := &newsList{List: result, Recommend: recommend}
	jsonResult, err := json.Marshal(obj)
	checkErr(err)
	return c.JSON(http.StatusOK, string(jsonResult))
}

func checkErr(err error) {
	if err != nil {
		log.Fatalln(err)
	}
}

func parsePage(c echo.Context) int {
	queryString := c.QueryParam("page")
	page, err := strconv.Atoi(queryString)
	if err != nil {
		page = 1
	}
	return page
}

func parseQuery(c echo.Context) string {
	queryString := c.QueryParam("query")
	return queryString
}
