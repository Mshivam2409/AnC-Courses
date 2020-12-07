import React from "react";
import { Result, Button } from "antd";
import { NavLink, useHistory, useParams } from "react-router-dom";

const ErrorPage = (props: any) => {
  const id: any = useParams();
  const history = useHistory();
  const message = () => {
    switch (id.code) {
      case "404":
        return "Sorry, the page you visited does not exist.";
      case "500":
        return "We have some troubles connecting to our servers. Try again shortly!";
      default:
        return "Sorry, the page you visited does not exist.";
    }
  };
  return (
    <Result
      status={id.code || 404}
      title={id.code || "404"}
      subTitle={message() || "Unknown Error"}
      extra={
        <NavLink to="/home">
          <Button
            type="primary"
            onClick={() => {
              if (id.code === "500") history.goBack();
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
