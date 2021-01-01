import React, { useEffect } from "react";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import Store from "store";
import ProtectedRoute from "components/shared/ProtectedRoute";
import Unauthorized from "pages/Unauthorized";
import AddCourse from "pages/AddCourse";
import Dashboard from "pages/Dashboard";
import NotFound from "pages/NotFound";
import SignIn from "pages/SignIn";
import EditCoursePage from "pages/EditCourse";
import Change from "pages/Change";
import Reset from "pages/Reset";

const App = () => {
  const loggedIn = useRecoilValue(Store.User).loggedIn;
  const resetUser = useResetRecoilState(Store.User);
  useEffect(() => {
    if (loggedIn === false) {
      resetUser();
    }
  }, [loggedIn]);
  return (
    <BrowserRouter basename="/admin">
      <Switch>
        {/* //AnC@2020 */}
        <Route path="/forgot" component={Reset} />
        <Route path="/404" component={NotFound} />
        <Route path="/signin" component={SignIn} />
        <Route path="/unauthorized" component={Unauthorized} />
        <Route path="/change/:token" component={Change} />
        <ProtectedRoute path="/home" component={Dashboard} />
        <ProtectedRoute path="/edit/:cid" component={EditCoursePage} />
        <ProtectedRoute path="/add" component={AddCourse} />
        <Redirect from="*" to="/signin" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
