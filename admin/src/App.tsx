import React, { useEffect } from "react";
import { Switch, Route, Redirect, HashRouter } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import Store from "store";
import ProtectedRoute from "components/shared/ProtectedRoute";
import Unauthorized from "pages/Unauthorized";
import AddCourse from "pages/AddCourse";
import Dashboard from "pages/Dashboard";
import NotFound from "pages/NotFound";
import SignIn from "pages/SignIn";
import EditCoursePage from "pages/EditCourse";

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
        {/* //AnC@2020 */}
        <Route path="/signin" component={SignIn} />
        {/* <Route path="/signup" component={SignUp} /> */}
        <Route path="/404" component={NotFound} />
        <Route path="/unauthorized" component={Unauthorized} />
        <ProtectedRoute path="/home" component={Dashboard} />
        <ProtectedRoute path="/edit/:cid" component={EditCoursePage} />
        <ProtectedRoute path="/add" component={AddCourse} />
        <Redirect to="/signin" />
      </Switch>
    </HashRouter>
  );
};

export default App;
