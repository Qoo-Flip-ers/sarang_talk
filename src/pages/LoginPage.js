import React from "react";
import { useRecoilState } from "recoil";
import { userState } from "../store/userAtom";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login } from "../api/auth";

const LoginPage = () => {
  const [userName, setUsername] = useRecoilState(userState);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await login(values);
      console.log(response);
      console.log(values);
      if (response.status === 200 || response.status === 201) {
        if (response.data && response.data.token) {
          const { token } = response.data;
          localStorage.setItem("token", token);
          setUsername(values.username);
        }
        navigate("/korean");
      }
    } catch (e) {
      message.error("아이디 비밀번호가 일치하지 않습니다.");
      console.log(e);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.warning("내용을 입력해주세요.");
  };

  return (
    <div style={{ maxWidth: "300px", margin: "50px auto" }}>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="아이디" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="비밀번호"
          />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
