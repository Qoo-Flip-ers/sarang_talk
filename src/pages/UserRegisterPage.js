import React from "react";
import { createSubscription } from "../api/subscription";
import {
  Typography,
  Divider,
  Form,
  Input,
  Button,
  message,
  DatePicker,
  Row,
  Col,
  Select,
  Switch,
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
        type: values.type.join(","),
        quiz: values.quiz
          ? values.type.map((t) => `${t}_quiz`).join(",")
          : undefined,
        zoom: values.zoom,
        plan: values.plan,
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
              message: "전화번호를 입력해주세요! ",
            },
          ]}
        >
          <Input placeholder="국가번호 포함 ex: +821012345678" />
        </Form.Item>

        <Form.Item
          name="email"
          label="이메일"
          rules={[{ type: "email", message: "올바른 이메일 형식이 아닙니다!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="type"
          label="구독 유형"
          rules={[{ required: true, message: "구독 유형을 선택해주세요!" }]}
        >
          <Select mode="multiple" placeholder="여러 유형을 선택할 수 있습니다">
            <Select.Option value="basic">basic</Select.Option>
            <Select.Option value="daily_conversation">
              daily_conversation
            </Select.Option>
            <Select.Option value="topik_word">topik_word</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="plan" label="플랜" initialValue="whatsapp_1">
          <Select>
            <Select.Option value="telegram_1">텔레그램 1개월</Select.Option>
            <Select.Option value="telegram_3">텔레그램 3개월</Select.Option>
            <Select.Option value="telegram_12">텔레그램 12개월</Select.Option>
            <Select.Option value="whatsapp_1">왓츠앱 1개월</Select.Option>
            <Select.Option value="whatsapp_3">왓츠앱 3개월</Select.Option>
            <Select.Option value="whatsapp_12">왓츠앱 12개월</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="quiz" label="퀴즈">
          <Switch
            checkedChildren="사용"
            unCheckedChildren="사용하지 않음"
            defaultChecked={false}
          />
        </Form.Item>

        <Form.Item name="zoom" label="줌">
          <Switch
            checkedChildren="사용"
            unCheckedChildren="사용하지 않음"
            defaultChecked={false}
          />
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
