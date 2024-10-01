// Start of Selection
import React from "react";
import { createSubscription } from "../api/subscription";
import {
  Typography,
  Divider,
  Form,
  Input,
  Button,
  message,
  Select,
  Radio,
} from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const UserRegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await createSubscription({
        name: values.name.trim(),
        phoneNumber: values.phoneNumber.trim(),
        email: values.email.trim(),
        lang: [values.lang],
        plan: [values.plan],
        platform: [values.platform],
        duration: [values.duration],
        zoom_mentoring: [values.zoom_mentoring],
      });

      if (response.status === 200 || response.status === 201) {
        message.success("사용자가 성공적으로 등록되었습니다.");
        navigate("/user");
      } else {
        message.error("사용자 등록에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (e) {
      console.error(e);
      message.error("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div>
      <Title level={2}>사용자 등록</Title>
      <Divider />
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        style={{
          maxWidth: "1000px",
        }}
      >
        <Form.Item
          name="name"
          label="이름"
          rules={[{ required: true, message: "이름을 입력해주세요!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="전화번호"
          rules={[
            {
              required: true,
              message: "전화번호를 입력해주세요!",
            },
          ]}
        >
          <Input placeholder="국가번호 포함 ex: +821012345678" />
        </Form.Item>

        <Form.Item
          name="lang"
          label="언어"
          rules={[{ required: true, message: "언어를 선택해주세요!" }]}
        >
          <Radio.Group>
            <Radio value="EN">EN</Radio>
            <Radio value="ID">ID</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="email"
          label="이메일"
          rules={[{ type: "email", message: "올바른 이메일 형식이 아닙니다!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="plan"
          label="구독 유형"
          rules={[{ required: true, message: "구독 유형을 선택해주세요!" }]}
        >
          <Select placeholder="구독 유형을 선택해주세요">
            <Select.Option value="beginners">beginners</Select.Option>
            <Select.Option value="daily_conversation">
              daily_conversation
            </Select.Option>
            <Select.Option value="topik_word">topik_word</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="platform"
          label="플랫폼"
          rules={[{ required: true, message: "플랫폼을 선택해주세요!" }]}
        >
          <Select placeholder="플랫폼을 선택해주세요">
            <Select.Option value="whatsapp">WhatsApp</Select.Option>
            <Select.Option value="telegram">Telegram</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="duration"
          label="구독 기간"
          rules={[{ required: true, message: "구독 기간을 선택해주세요!" }]}
        >
          <Select placeholder="구독 기간을 선택해주세요">
            <Select.Option value="1">1개월</Select.Option>
            <Select.Option value="3">3개월</Select.Option>
            <Select.Option value="6">6개월</Select.Option>
            <Select.Option value="12">12개월</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="zoom_mentoring"
          label="줌 멘토링"
          rules={[
            { required: true, message: "줌 멘토링 여부를 선택해주세요!" },
          ]}
        >
          <Radio.Group>
            <Radio value="yes">예</Radio>
            <Radio value="no">아니오</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" block>
            등록
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserRegisterPage;
