import { Button, Tabs } from "antd";
import { BACKEND_LOGS } from "config/backend";
import React from "react";
import { LazyLog } from "react-lazylog";

const { TabPane } = Tabs;
const Logs = () => {
  return (
    <div className="card-container">
      <Tabs type="card">
        {BACKEND_LOGS.map((service, index) => {
          return (
            <TabPane tab={service.name} key={index}>
              <div style={{ height: "50vh" }}>
                <LazyLog url={service.url} style={{ height: "50vh" }} />
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
