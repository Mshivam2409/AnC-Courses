import Banner from "components/Banner";
import { ArrowDownOutlined } from "@ant-design/icons";
import React from "react";
import { NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserState } from "store";

const Home = () => {
  const loggedIn = useRecoilValue(UserState).loggedIn;
  return (
    <div>
      <Banner />
      <NavLink to={loggedIn ? "/search" : "/signin"}>
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
