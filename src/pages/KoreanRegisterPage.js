import React, { useState } from "react";
import {
  Typography,
  Divider,
  Form,
  Input,
  Button,
  message,
  Rate,
  Radio,
} from "antd";
import { useNavigate } from "react-router-dom";
import { createWord } from "../api/word";
const { Title, Link } = Typography;

const KoreanRegisterPage = () => {
  const [korean, setKorean] = useState("");
  const [description, setDescription] = useState("");
  const [pronunciation, setpronunciation] = useState("");
  const [example1, setexmple1] = useState("");
  const [example2, setexmple2] = useState("");
  const [example3, setexmple3] = useState("");
  const [level, setLevel] = useState();
  const [type, setType] = useState("");
  const [source, setSource] = useState("");
  const [imageUrl, setImageUrl] = useState("");
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
        example_1: example1,
        example_2: example2,
        example_3: example3,
        level,
        type,
        source,
        imageUrl,
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
        <Form.Item
          label="Level"
          name="Level"
          rules={[
            {
              required: true,
              message: "Please check level!",
            },
          ]}
        >
          <Rate
            allowHalf
            defaultValue={0}
            onChange={(value) => setLevel(value)}
          />
        </Form.Item>
        <Form.Item label="type" name="type">
          <Radio.Group
            onChange={(e) => setType(e.target.value)}
            value={type}
            defaultValue="daily_conversation"
          >
            <Radio value="daily_conversation">daily_conversation</Radio>
            <Radio value="kpop_lyrics">kpop_lyrics</Radio>
            <Radio value="topik_word">topik_word</Radio>
            <Radio value="topik_variation">topik_variation</Radio>
          </Radio.Group>
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
        <Form.Item label="source" name="source">
          <Input onChange={(e) => setSource(e.target.value)} />
        </Form.Item>
        <Form.Item label="imageUrl" name="imageUrl">
          <Input onChange={(e) => setImageUrl(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={onClick}>
            등록
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default KoreanRegisterPage;
