import "assets/scss/login.scss";

import { LoginFlow } from "@ory/kratos-client";
import { Col, Row } from "antd";
import logo from "assets/img/logo192.png";
import { KratosForm } from "components/KratosForm";
import { KratosMessages } from "components/KratosMessages";
import React, { useCallback, useEffect, useState } from "react";
import { initialiseRequest } from "services/kratos";

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
      <div className="background">
        <Row>
          <Col span={18}>
            <div className="header">
              <img src={logo} />
              <h1>Academics and Career Council</h1>
              <h4>Courses and Reviews Portal</h4>
            </div>
          </Col>
          <Col span={6}>
            <div id="login-password" className="form">
              {form && (
                <KratosForm
                  submitLabel="Sign in"
                  action={form.action}
                  fields={form.fields}
                  messages={form.messages}
                />
              )}
              {messages && <KratosMessages messages={messages} />}
            </div>
          </Col>
          {/* <hr className="divider" /> */}
          {/* <div className="alternative-actions">
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
        </div> */}
          {/* </Vanta> */}
        </Row>
      </div>
    </div>
  );
};

export default Login;
