import React from "react";

import { Button, Row, Tabs } from "antd";
import { LazyLog, ScrollFollow } from "react-lazylog";
import { BACKEND_LOGS } from "config/backend";

const { TabPane } = Tabs;
const Logs = () => {
  return (
    <div className="card-container">
      <Tabs type="card">
        {BACKEND_LOGS.map((service, index) => {
          return (
            <TabPane tab={service.name} key={index}>
              <div style={{ height: "50vh" }}>
                {/* <Row> */}
                <LazyLog url={service.url} style={{ height: "50vh" }} />
                {/* </Row> */}
                {/* <Row>
                  <Button>Download</Button>
                </Row> */}
              </div>
              <div style={{ paddingTop: 10 }}>
                <a href={service.url} download>
                  <Button>Download</Button>
                </a>
              </div>
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};

export default Logs;
