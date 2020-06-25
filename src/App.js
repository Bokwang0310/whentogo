// react-router-dom 을 쓰기 때문에 <a href=""> 는 <Link to="">로 바꾸자
// Link 말고 NavLink 란게 있는데 사용자가 현재 위치한 페이지를 시각적으로 보여주거나 할 때 유용하다. (class에 active를 추가 해 준다.)
import React from "react";
import { Route, Switch } from "react-router-dom";

import Main from "./components/main.js";
import Calc from "./components/calc.js";
import News from "./components/news.js";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/calc">
          <Calc />
        </Route>
        <Route path="/news">
          <News />
        </Route>
        <Route path="/">Not Found</Route>
      </Switch>
    </>
  );
}

export default App;
