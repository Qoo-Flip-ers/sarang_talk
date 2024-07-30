import React from "react";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  GlobalOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
const { Sider, Content } = Layout;

const BaseLayout = ({ children }) => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const menuItems = [
    {
      key: "1",
      icon: <GlobalOutlined />,
      label: "한국어 관리",
      onClick: () => navigate("/korean"),
    },
    // {
    //   key: "2",
    //   icon: <GlobalOutlined />,
    //   label: "기출문제 관리",
    //   onClick: () => navigate("/question"),
    // },
    {
      key: "2",
      icon: <UserOutlined />,
      label: "사용자 관리",
      onClick: () => navigate("/user"),
    },
  ];

  const goToLogin = () => {
    localStorage.removeItem("token");

    navigate("/");
  };
  return (
    <Layout>
      <Sider
        trigger={null}
        style={{
          background: "#25A641",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 50,
            color: "white",
            margin: 10,
            border: "none",
          }}
        >
          Wa
        </div>
        <div className="demo-logo-vertical" />
        <Menu
          theme="green"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menuItems}
          style={{
            background: "#25A641",
            color: "white",
          }}
        />
        <div style={{ marginTop: "auto" }} />
        <Button
          type="text"
          icon={<LogoutOutlined />}
          style={{
            color: "white",
            padding: 0,
            margin: 10,
            marginLeft: -30,
            border: "none",
            fontSize: "14px",
          }}
          onClick={goToLogin}
          block
        >
          로그아웃
        </Button>
      </Sider>
      <Layout>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
