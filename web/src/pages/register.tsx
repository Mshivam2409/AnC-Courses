import React, { useEffect, useState } from "react";
import { RegistrationFlow } from "@ory/kratos-client";
import { initialiseRequest } from "services/kratos";
import { KratosMessages } from "components/KratosMessages";
import { KratosForm } from "components/KratosForm";
import { login } from "services/auth";

const Register = () => {
  const [requestResponse, setRequestResponse] = useState<RegistrationFlow>();

  useEffect(() => {
    const request = initialiseRequest({
      type: "register",
    }) as Promise<RegistrationFlow>;
    request.then((request) => setRequestResponse(request)).catch(() => {});
  }, [setRequestResponse]);

  const form = requestResponse?.methods?.password?.config;
  const messages = requestResponse?.messages;

  return (
    <div className="auth">
      <div className="container">
        <h5 className="subheading">
          Welcome to SecureApp! <br />
          Use the form below to sign up:
        </h5>
        <div id="registration-password">
          {messages && <KratosMessages messages={messages} />}
          {form && (
            <KratosForm
              submitLabel="Sign up"
              action={form.action}
              fields={form.fields}
              messages={form.messages}
            />
          )}
        </div>
        <hr className="divider" />
        <div className="alternative-actions">
          <p>
            <button onClick={() => login({ setReferer: false })} className="a">
              Already have an account? Log in instead
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
