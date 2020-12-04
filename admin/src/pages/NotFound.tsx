import React, { useEffect, useState } from "react";
import "assets/scss/404.scss";
const NotFound = () => {
  const [top, setTop] = useState<number | null>(null);
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    document.body.classList.add("bg");
    window.addEventListener("mousemove", (event) => {
      setTop(event.pageY);
      setLeft(event.pageX);
    });
    return () => {
      document.body.classList.remove("bg");
      window.removeEventListener("mousemove", (event) => {
        setTop(event.pageY);
        setLeft(event.pageX);
      });
    };
  });
  return (
    <React.Fragment>
      <div className="text">
        <h1>404</h1>
        <h2>Uh, Ohh</h2>
        <h3>
          Sorry we cant find what you are looking for 'cuz its so dark in here
        </h3>
      </div>
      <div
        className="torch"
        id="torch"
        style={{ top: top as number, left: left as number }}
      ></div>
    </React.Fragment>
  );
};

export default NotFound;
