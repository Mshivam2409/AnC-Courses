import "assets/scss/dasboard.scss";

import {
  BookOutlined,
  EditOutlined,
  FileOutlined,
  FileSyncOutlined,
  PieChartOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Result, Typography } from "antd";
import AddCourse from "components/AddCourse";
import AddFiles from "components/AddFiles";
import Logs from "components/Logs";
import UsersList from "components/Users";
import React, { useState } from "react";
import { secured } from "react-abac";
import { permissions } from "services/abac";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Dashboard = (props: any) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [openmenu, setOpenmenu] = useState<string>("0");
  const getContent = (key: string) => {
    switch (key) {
      case "5":
        return (
          <UsersList
            users={[
              { name: "aloo", email: "kachaku" },
              { name: "aloo", email: "kachaku" },
              { name: "aloo", email: "kachaku" },
              { name: "aloo", email: "kachaku" },
              { name: "aloo", email: "kachaku" },
              { name: "aloo", email: "kachaku" },
              { name: "aloo", email: "kachaku" },
              { name: "aloo", email: "kachaku" },
            ]}
          />
        );
      case "2":
        return <AddCourse />;
      case "3":
        return <AddCourse />;
      case "4":
        return <AddFiles />;
      case "8":
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
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Reviews
          </Menu.Item>
          <SubMenu key="sub1" icon={<BookOutlined />} title="Courses">
            <Menu.Item key="2" icon={<PlusOutlined />}>
              Add Course
            </Menu.Item>
            <Menu.Item key="3" icon={<EditOutlined />}>
              Edit Course
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="4" icon={<FileOutlined />}>
            Files
          </Menu.Item>
          <SubMenu key="sub2" icon={<UserOutlined />} title="User">
            <Menu.Item key="5">Users</Menu.Item>
            <Menu.Item key="6">Managers</Menu.Item>
            <Menu.Item key="7">Developers</Menu.Item>
          </SubMenu>

          <Menu.Item key="8" icon={<FileSyncOutlined />}>
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
