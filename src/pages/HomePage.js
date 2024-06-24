import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  GlobalOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
const { Sider, Content } = Layout;

const HomePage = () => {
  const [contents, setContents] = useState("");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const menuItems = [
    {
      key: "1",
      icon: <GlobalOutlined />,
      label: "한국어 관리",
      onClick: () => setContents("한국어 관리"),
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: "사용자 관리",
      onClick: () => setContents("사용자 관리"),
    },
  ];
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/");
  };
  return (
    <Layout>
      <Sider
        trigger={null}
        style={{
          background: "#25A641",
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
        <div style={{ marginTop: "auto", marginBottom: 200 }} />
        <Button
          type="text"
          icon={<LogoutOutlined />}
          theme="green"
          mode="inline"
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
          {contents}
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;
