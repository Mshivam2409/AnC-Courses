import React, { Fragment } from "react";
import "assets/scss/Banner.scss";
import logo from "assets/img/logo192.png";
import { useEffect } from "react";
const Banner = () => {
  useEffect(() => {
    document.body.classList.add("body-banner");
    return () => {
      document.body.classList.remove("body-banner");
    };
  });
  return (
    <Fragment>
      <ul id="scene">
        <li className="layer" data-depth="0.0" />
        <li className="layer" data-depth="0.10">
          <div className="background" />
        </li>
        <li className="layer" data-depth="0.10">
          <div id="particules">
            <div className="first" id="star" />
          </div>
        </li>
        <li className="layer" data-depth="0.15">
          <div id="particules">
            <div className="second" id="star" />
          </div>
        </li>
        <li className="layer" data-depth="0.20">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
        </li>
        <li className="layer" data-depth="0.30">
          <div className="text">
            <p className="sub-title">Courses Reviews</p>
          </div>
        </li>
        <li className="layer" data-depth="0.40">
          <div className="text">
            <h1>Courses</h1>
          </div>
        </li>
        <li className="layer" data-depth="0.42">
          <div id="particules">
            <div className="third" id="star" />
          </div>
        </li>
        <li className="layer" data-depth="0.60">
          <div id="particules">
            <div className="fourth" id="star" />
          </div>
        </li>
      </ul>
    </Fragment>
  );
};

export default Banner;
