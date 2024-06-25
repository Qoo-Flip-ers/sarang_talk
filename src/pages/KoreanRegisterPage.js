import React, { useState } from "react";
import { createWord } from "../api/word";
import { Typography, Divider, Form, Input, Button, message, Rate } from "antd";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;

const KoreanRegisterPage = () => {
  const [korean, setKorean] = useState("");
  const [description, setDescription] = useState("");
  const [pronunciation, setpronunciation] = useState("");
  const [example1, setexmple1] = useState("");
  const [example2, setexmple2] = useState("");
  const [example3, setexmple3] = useState("");
  const [level, setLevel] = useState();
  const navigate = useNavigate();

  const onClick = async () => {
    if (!korean || !description || !pronunciation || !level) {
      message.warning("내용을 입력해주세요.");
      return;
    }

    try {
      const response = await createWord({
        korean,
        description,
        pronunciation,
        level,
        example1,
        example2,
        example3,
      });
      if (response.status === 200 || response.status === 201) {
        message.success("등록이 완료되었습니다.");
        navigate("/korean");
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
      <Title level={2}>한국어 관리</Title>
      <Divider></Divider>
      <Form>
        <Form.Item
          label="korean"
          name="korean"
          rules={[
            {
              required: true,
              message: "Please input Korean!",
            },
          ]}
        >
          <Input onChange={(e) => setKorean(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input description!",
            },
          ]}
        >
          <Input onChange={(e) => setDescription(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="pronunciation"
          name="pronunciation"
          rules={[
            {
              required: true,
              message: "Please input pronunciation!",
            },
          ]}
        >
          <Input onChange={(e) => setpronunciation(e.target.value)} />
        </Form.Item>
        <Form.Item label="example_1" name="example_1">
          <Input onChange={(e) => setexmple1(e.target.value)} />
        </Form.Item>
        <Form.Item label="example_2" name="example_2">
          <Input onChange={(e) => setexmple2(e.target.value)} />
        </Form.Item>
        <Form.Item label="example_3" name="example_3">
          <Input onChange={(e) => setexmple3(e.target.value)} />
        </Form.Item>
        <Form.Item label="Level" name="Level">
          <Rate
            allowHalf
            defaultValue={1}
            onChange={(value) => setLevel(value)}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" onClick={onClick}>
          등록
        </Button>
      </Form>
    </div>
  );
};

export default KoreanRegisterPage;
