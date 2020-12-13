import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Store from "store";

const ProtectedRoute = ({
  component: Component,
  ...rest
}: {
  component: React.FC;
} & RouteProps) => {
  const loggedIn = useRecoilValue(Store.User).loggedIn;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (loggedIn) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/unauthorized",
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
