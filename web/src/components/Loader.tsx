import Spin from "antd/lib/spin";
import React from "react";

const Loader = () => {
  return (
    <Spin tip="Loading...">
      <div style={{ width: "100%", height: "100vh" }}></div>
    </Spin>
  );
};

export default Loader;
