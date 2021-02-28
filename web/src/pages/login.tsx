import { LoginFlow } from "@ory/kratos-client";
import { KratosForm } from "components/KratosForm";
import { KratosMessages } from "components/KratosMessages";
// import Vanta from "components/Vanta";
import config from "config/kratos";
import "assets/scss/login.scss";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { register } from "services/auth";
import { initialiseRequest } from "services/kratos";
import logo from "assets/img/logo192.png";
import { Row, Col } from "antd";

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

  // useScript(
  //   "https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js",
  //   "root"
  // );

  // useScript(
  //   "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.topology.min.js",
  //   "root"
  // );

  // useScript("/static/js/vanta.min.js", "root");

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
          {/* <IconLogo /> */}
          {/* <Vanta> */}
          {/* <h5 className="subheading">Welcome to this example login screen!</h5> */}
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
