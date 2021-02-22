import Result from "antd/lib/result";
import Button from "antd/lib/button";
import { ResultStatusType } from "antd/lib/result";
import React, { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";

const ErrorPage = (props: { id: ResultStatusType }) => {
  const history = useHistory();
  React.useEffect(() => {
    window.document.title = `An Error Occured!`;
  });
  const message = () => {
    switch (props.id.toString()) {
      case "403":
        return "Sorry, You are not authorized to view this page!";
      case "404":
        return "Sorry, the page you visited does not exist.";
      case "500":
        return "We have some troubles connecting to our servers. Try again shortly!";
      default:
        return "We have some troubles connecting to our servers. Try again shortly!";
    }
  };
  return (
    <Result
      status={props.id || 500}
      title={props.id || "Internal Server Error"}
      subTitle={message() || "Unknown Error"}
      extra={
        <NavLink to="/home">
          <Button
            type="primary"
            onClick={() => {
              if (props.id.toString() !== "404") history.goBack();
              else if (props.id.toString() === "403") history.push("/login");
              else window.location.reload();
            }}
          >
            Back Home
          </Button>
        </NavLink>
      }
    />
  );
};

export default ErrorPage;
