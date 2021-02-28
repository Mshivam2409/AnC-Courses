import React, { useState } from "react";
import { Layout, Menu, Breadcrumb, Result, Typography } from "antd";
import {
  PlusOutlined,
  PieChartOutlined,
  FileOutlined,
  EditOutlined,
  UserOutlined,
  BookOutlined,
  FileSyncOutlined,
} from "@ant-design/icons";
import "assets/dasboard.css";
import { secured } from "react-abac";
import { permissions } from "services/abac";
import { HashRouter, NavLink, Redirect, Route, Switch } from "react-router-dom";
import AddCourse from "components/AddCourse";
import { div } from "@tensorflow/tfjs";
import Loader from "components/Loader";
import AddFiles from "components/AddFiles";
import Logs from "components/Logs";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Dashboard = (props: any) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [openmenu, setOpenmenu] = useState<string>("0");
  const getContent = (key: string) => {
    switch (key) {
      case "7":
        return <AddCourse />;
      case "8":
        return <AddCourse />;
      case "9":
        return <AddFiles />;
      case "10":
        return <Logs />;
      default:
        break;
    }
  };

  const onCollapse = (collapsed: boolean) => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          onSelect={(info) => {
            setOpenmenu(info.key.toString());
          }}
        >
          <SubMenu key="0" title="Reviews">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Approve Reviews
            </Menu.Item>
            <Menu.Item key="2" icon={<BookOutlined />}>
              Option 2
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">Users</Menu.Item>
            <Menu.Item key="4">Secretaries</Menu.Item>
            <Menu.Item key="5">Coordinators</Menu.Item>
            <Menu.Item key="6">Developers</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<BookOutlined />} title="Courses">
            <Menu.Item key="7" icon={<PlusOutlined />}>
              Add Course
            </Menu.Item>
            <Menu.Item key="8" icon={<EditOutlined />}>
              Edit Course
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />}>
            Files
          </Menu.Item>
          <Menu.Item key="10" icon={<FileSyncOutlined />}>
            Logs
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Typography.Title style={{ marginLeft: 30, paddingTop: 6 }}>
            Dashboard
          </Typography.Title>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>

          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {getContent(openmenu)}
          </div>

          {/* <iframe src="http://localhost:3001/.commento/dashboard" /> */}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Made with <span style={{ color: "#e25555" }}>&#9829;</span> by AnC
        </Footer>
      </Layout>
    </Layout>
  );
};

export default secured({
  permissions: permissions.LOGIN_CPANEL,
  mapPropsToData: (props) => props,
  noAccess: () => <Result status="403" title="Unauthorized Access"></Result>,
})(Dashboard);
