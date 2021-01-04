import SignInForm from "components/SignInForm";
import React from "react";

const SignIn = () => {
  React.useEffect(() => {
    window.document.title = `SignIn | Courses | AnC`;
  });
  return (
    <div
      className="site-input-group-wrapper"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10%",
      }}
    >
      <SignInForm />
    </div>
  );
};

export default SignIn;
