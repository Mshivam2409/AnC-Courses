import SignUpForm from "components/SignUpForm";
import React from "react";

const SignUp = () => {
  return (
    <div
      className="site-input-group-wrapper"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10%",
        overflow: "hidden",
      }}
    >
      <SignUpForm />
    </div>
  );
};

export default SignUp;