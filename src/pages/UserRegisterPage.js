import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../store/userAtom";
import { createWord } from "../api/user";
import { Typography, Divider, Form, Input, Button, message, Rate } from "antd";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;

const UserRegisterPage = () => {
  // const [name, setName] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [status, setStatus] = useState("");
  const [userRegistration, setuserRegistration] = useRecoilState(userState);
  const navigate = useNavigate();

  const onChagne = (e) => {
    const { name, value } = e.target;
    setuserRegistration((prev) => ({ ...prev, [name]: value }));
  };

  const onClick = async () => {
    const { name, phoneNumber, status } = userRegistration;
    if (!name || !phoneNumber || !status) {
      message.warning("내용을 입력해주세요.");
      return;
    }

    try {
      const response = await createWord(userRegistration);
      if (response.status === 200 || response.status === 201) {
        message.success("등록이 완료되었습니다.");
        navigate("/user");
      } else {
        message.error("다시 시도해주세요.");
      }
    } catch (e) {
      console.error(e);
    } finally {
      // loading 종료
    }
  };

  return (
    <div>
      <Title level={2}>사용자 관리</Title>
      <Divider />
      <Form>
        <Form.Item
          label="name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input name!",
            },
          ]}
        >
          <Input
            name="name"
            value={userRegistration.name}
            onChange={onChagne}
          />
        </Form.Item>
        <Form.Item
          label="phoneNumber"
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Please input phoneNumber!",
            },
          ]}
        >
          <Input
            name="phoneNumber"
            value={userRegistration.phoneNumber}
            onChange={onChagne}
          />
        </Form.Item>
        <Form.Item
          label="status"
          name="status"
          rules={[
            {
              required: true,
              message: "Please input status!",
            },
          ]}
        >
          <Input
            name="status"
            value={userRegistration.status}
            onChange={onChagne}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" onClick={onClick}>
          등록
        </Button>
      </Form>
    </div>
  );
};

export default UserRegisterPage;
