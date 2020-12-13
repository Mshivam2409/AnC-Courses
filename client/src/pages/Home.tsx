import Banner from "components/Banner";
import { ArrowDownOutlined } from "@ant-design/icons";
import React from "react";
import { Row, Col } from "antd";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Banner />
      <NavLink to="/search">
        <ArrowDownOutlined
          style={{
            fontSize: 40,
            position: "absolute",
            bottom: "10vh",
            justifySelf: "center",
            left: 0,
            right: 0,
            margin: "auto",
          }}
        />
      </NavLink>
    </div>
  );
};

export default Home;
