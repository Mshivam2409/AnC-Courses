import PrivateRoute from "components/PrivateRoute";
import Loader from "components/Loader";

// import Login from "pages/login";
import { Test } from "pages/Test";
// import Register  from "pages/register";
import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Course from "pages/course";

// const Dashboard = lazy(() => {
//   return import("pages/dashboard");
// });

// const Register = lazy(() => {
//   return import("pages/register");
// });

const Login = lazy(() => {
  return import("pages/login");
});

// const Course = lazy(() => {
//   return import("pages/course");
// });

const Router = () => {
  // const location = useLocation();
  // console.log(location);
  return (
    // <TransitionGroup>
    //   <CSSTransition key={location.key} classNames="fade" timeout={300}>
    <Switch>
      <Suspense fallback={Loader}>
        {/* <PrivateRoute
              path="/cpanel"
              component={Dashboard}
              loaderComponent={Loader}
              routeRedirect="/"
            /> */}
        {/* <Route path="/registration" component={Register} />
         */}
      </Suspense>
      <Suspense fallback={Loader}>
        {/* <PrivateRoute
              path="/course/:cid"
              component={Course}
              loaderComponent={Loader}
              routeRedirect="/login"
            /> */}
      </Suspense>
      <Route path="/login" component={Login} />
      <Route path="/c" component={Course} />
      <Route path="/admin" component={Test} />
      <Redirect to="/" />
    </Switch>
    //   </CSSTransition>
    // </TransitionGroup>
  );
};

export default Router;
