package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/labstack/echo"

	"github.com/Bokwang0310/whentogo/clipping"
)

type newsList struct {
	List [][]string
}

func main() {

	e := echo.New()

	e.Static("/", "public")
	e.GET("/news/api/topic", apiTopicGet)
	e.Logger.Fatal(e.Start(":8080"))
}

func home(c echo.Context) error {
	return c.File("./public/index.html")
}

func apiTopicGet(c echo.Context) error {
	value := c.QueryParam("page")
	page, err := strconv.Atoi(value)
	checkErr(err)
	result := clipping.Clip(page)
	obj := &newsList{List: result}
	jsonResult, err := json.Marshal(obj)
	checkErr(err)
	return c.JSON(http.StatusOK, string(jsonResult))
}

func checkErr(err error) {
	if err != nil {
		log.Fatalln(err)
	}
}
