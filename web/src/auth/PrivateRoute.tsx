import React, { useEffect, useState } from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { useRecoilState } from "recoil";
import { SESSION_STATE } from "store";
import { KRATOS_SESSION } from "auth/index";
import { kratos } from "services/kratos";
import { Role } from "./abac";

const PrivateRoute = (props: {
  component: React.ComponentType<RouteComponentProps>;
  loaderComponent: React.ComponentType;
  routeRedirect: string;
  path: string;
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [session, setSession] = useRecoilState(SESSION_STATE);

  const authorizationChecker = (session: KRATOS_SESSION) => {
    const result = session.active === true;
    return result;
  };

  const authorize = async () => {
    const response = await kratos.whoami();
    if (response.status === 200) {
      setSession({ ...response.data, role: Role.ANONYMOUS });
      setLoading(false);
    }
  };

  const updateAuthorized = (state: boolean) => {
    setLoading(false);
  };

  const checkAccess = () => {
    if (authorizationChecker(session)) {
      updateAuthorized(true);
    } else {
      authorize();
    }
  };

  useEffect(() => {
    checkAccess();
  }, [checkAccess]);

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
      {
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
      }
    </React.Fragment>
  );
};

export default PrivateRoute;
