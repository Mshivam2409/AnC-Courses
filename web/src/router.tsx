import { Spin } from "antd";
import { PrivateRoute } from "auth";
import Dashboard from "pages/dashboard";
import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter
      basename={process.env.NODE_ENV === "production" ? "/courses" : ""}
    >
      <Switch>
        <PrivateRoute
          path="/cpanel"
          component={Dashboard}
          loaderComponent={Spin}
          routeRedirect="/login"
        />
        <Route path="/admin" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
