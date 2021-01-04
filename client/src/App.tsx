import React, { useEffect } from "react";
import "App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import ErrorPage from "pages/Error";
import Course from "pages/Course";
import Home from "pages/Home";
import Search from "pages/Search";
import Axios from "axios";
import url from "utils/api";
import SignIn from "pages/SignIn";
import ProtectedRoute from "components/ProtectedRoute";
import SignUp from "pages/SignUp";
import { useSetRecoilState } from "recoil";
import { UserState } from "store";

const App = () => {
  const setUser = useSetRecoilState(UserState);
  useEffect(() => {
    const credentials = localStorage.getItem("anc-courses");
    console.log(credentials);
    if (credentials && JSON.parse(credentials).expireTime > Date.now()) {
      setUser(JSON.parse(credentials));
    }
    Axios.get(url("wakeup")).then(() => console.log("Connection Success"));
  }, []);
  return (
    <BrowserRouter basename="/courses">
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <ProtectedRoute path="/search" component={Search} />
        <ProtectedRoute path="/course/:cid" component={Course} />
        <Route path="/error/:code" component={ErrorPage} />
        <Redirect to="/home" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
