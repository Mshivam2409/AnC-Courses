import NotFound from "pages/NotFound";
import SignIn from "pages/SignIn";
import React, { Fragment, useEffect } from "react";
import {
  Switch,
  Route,
  Redirect,
  HashRouter,
  useHistory,
} from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import Store from "store";

const App = () => {
  const loggedIn = useRecoilValue(Store.User).loggedIn;
  const resetUser = useResetRecoilState(Store.User);
  useEffect(() => {
    if (loggedIn === false && window.location.hash !== "#/signin") {
      resetUser();
      window.location.hash = "#/signin";
    }
  }, [loggedIn]);
  return (
    <HashRouter>
      <Switch>
        <Route path="/signin" component={SignIn} />
        {loggedIn && (
          <Fragment>
            <Route path="/" />
            <Route path="/edit/:cid" />
            <Route path="/add" />
          </Fragment>
        )}
        <Route path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </HashRouter>
  );
};

export default App;
