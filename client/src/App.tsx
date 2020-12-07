import React from "react";
import "App.css";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import ErrorPage from "pages/Error";
import Course from "pages/Course";
import Home from "pages/Home";

const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/course/:cid" component={Course} />
        <Route path="/error/:code" component={ErrorPage} />
        <Redirect to="/home" />
      </Switch>
    </HashRouter>
  );
};

export default App;
