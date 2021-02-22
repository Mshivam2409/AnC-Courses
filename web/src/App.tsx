import "App.css";

import { rules } from "services/abac";
import React, { lazy } from "react";
import { AbacProvider } from "react-abac";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { SESSION_STATE } from "store";
import { Test } from "pages/Test";
import { Suspense } from "react";
import Loader from "components/Loader";
// import Course from "pages/course";
import PrivateRoute from "components/PrivateRoute";

const Login = lazy(() => import("pages/login"));
const Dashboard = lazy(() => import("pages/dashboard"));
const Register = lazy(() => import("pages/register"));
const Landing = lazy(() => import("pages/landing"));
const Course = lazy(() => import("pages/course"));

const App = () => {
  const { role } = useRecoilValue(SESSION_STATE);
  console.log(112);
  return (
    <AbacProvider rules={rules} roles={[role]}>
      <BrowserRouter
        basename={process.env.NODE_ENV === "production" ? "/courses" : ""}
      >
        <Switch>
          <Route path="/admin" component={Test} />
          <Suspense fallback={<Loader />}>
            <Route path="/c/:cid" component={Course} />
            <PrivateRoute
              path="/cpanel"
              component={Dashboard}
              loaderComponent={Loader}
              routeRedirect="/"
            />
            <Route path="/c/:cid" component={Course} />

            <Route path="/login" component={Login} />
            <Route path="/registration" component={Register} />
            <Route path="/" component={Landing} />
          </Suspense>
        </Switch>
      </BrowserRouter>
    </AbacProvider>
  );
};

export default App;
