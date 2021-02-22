import useOry from "hooks/useOry";
import ErrorPage from "pages/error";
import React, { ComponentType } from "react";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";
import { keto } from "services/keto";
import { kratos } from "services/kratos";

const PrivateRoute = (props: {
  component: ComponentType<RouteComponentProps>;
  loaderComponent: ComponentType;
  routeRedirect: string;
  path: string;
}) => {
  const [loading, error, session] = useOry(kratos, keto);

  const {
    component: Component,
    loaderComponent: LoaderComponent,
    routeRedirect,
    path,
    ...rest
  } = props;

  return (
    <React.Fragment>
      {loading && <LoaderComponent />}
      {!loading && !error && (
        <Route
          {...rest}
          path={path}
          render={(props) => {
            return session.active ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: routeRedirect,
                }}
              />
            );
          }}
        />
      )}
      {!loading && error && <ErrorPage id={500} />}
    </React.Fragment>
  );
};

export default PrivateRoute;
