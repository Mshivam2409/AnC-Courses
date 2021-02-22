import { LoginFlow } from "@ory/kratos-client";
import { KratosForm } from "components/KratosForm";
import { KratosMessages } from "components/KratosMessages";
import config from "config/kratos";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { register } from "services/auth";
import { initialiseRequest } from "services/kratos";

// import { IconLogo } from "components/IconLogo";
const Login = () => {
  const [requestResponse, setRequestResponse] = useState<LoginFlow>();
  // const callback = useCallback(setRequestResponse)
  useEffect(() => {
    const request = initialiseRequest({
      type: "login",
    }) as Promise<LoginFlow>;
    request.then((request) => setRequestResponse(request)).catch(() => {});
  }, []);

  const messages = requestResponse?.messages;
  const form = requestResponse?.methods?.password?.config;

  return (
    <div className="auth">
      <div className="container">
        {/* <IconLogo /> */}
        <h5 className="subheading">Welcome to this example login screen!</h5>
        <div id="login-password">
          {messages && <KratosMessages messages={messages} />}
          {form && (
            <KratosForm
              submitLabel="Sign in"
              action={form.action}
              fields={form.fields}
              messages={form.messages}
            />
          )}
        </div>
        <hr className="divider" />
        <div className="alternative-actions">
          <p>
            <button
              onClick={() => register({ setReferer: false })}
              className="a"
            >
              Register new account
            </button>
          </p>
          <p>
            <Link to={config.routes.recovery.path}>Reset password</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
