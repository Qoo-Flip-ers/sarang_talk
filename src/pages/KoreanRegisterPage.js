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
  Row,
} from "antd";
import { Link, Route, useNavigate } from "react-router-dom";
import { createWord } from "../api/word";
const { Title } = Typography;

const KoreanRegisterPage = () => {
  const [korean, setKorean] = useState("");
  const [description, setDescription] = useState("");
  const [pronunciation, setpronunciation] = useState("");
  const [example_1, setExmple1] = useState("");
  const [example_2, setExmple2] = useState("");
  const [example_3, setExmple3] = useState("");
  const [level, setLevel] = useState(1);
  const [type, setType] = useState("daily_conversation");
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
        example_1,
        example_2,
        example_3,
        level: 1, // 사용안하고 있어서 1로 고정
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
      <Title level={2}>한국어 등록</Title>
      <Divider></Divider>
      <Form style={{ maxWidth: 800 }}>
        <Form.Item
          label="카테고리"
          name="type"
          rules={[
            {
              required: true,
              message: "Please input Korean!",
            },
          ]}
          labelAlign="left"
          labelCol={{ span: 5 }}
        >
          <Radio.Group
            onChange={(e) => setType(e.target.value)}
            value={type}
            defaultValue="daily_conversation"
          >
            <Radio value="daily_conversation">Daily Conversation</Radio>
            <Radio value="kpop_lyrics">K-POP Lyrics</Radio>
            <Radio value="topik_word">TOPIK 빈출단어</Radio>
            {/* <Radio value="topik_variation">TOPIK 기출 변형 문제</Radio> */}
          </Radio.Group>
          <p
            style={{
              color: "#999",
              fontSize: 12,
              marginTop: 10,
            }}
          >
            *TOPIK 기출 변형문제는{" "}
            <Link to="/question/register">문제 등록 페이지</Link>에서
            등록해주세요 !
          </p>
        </Form.Item>

        <Form.Item
          label="표현 / KR"
          name="korean"
          rules={[
            {
              required: true,
              message: "Please input Korean!",
            },
          ]}
          labelAlign="left"
          labelCol={{ span: 5 }}
        >
          <Input size="large" onChange={(e) => setKorean(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="표현 발음기호 / Roman"
          name="pronunciation"
          rules={[
            {
              required: true,
              message: "Please input pronunciation!",
            },
          ]}
          labelAlign="left"
          labelCol={{ span: 5 }}
        >
          <Input
            size="large"
            onChange={(e) => setpronunciation(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="표현 뜻 / ID"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input description!",
            },
          ]}
          labelCol={{ span: 5 }}
          labelAlign="left"
        >
          <Input
            size="large"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Item>
        {/* <Form.Item
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
        </Form.Item> */}

        <Form.Item
          label="예문 / KR"
          name="example_1"
          labelCol={{ span: 5 }}
          labelAlign="left"
        >
          <Input size="large" onChange={(e) => setExmple1(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="예문 발음기호 / ROMAN"
          name="example_2"
          labelCol={{ span: 5 }}
          labelAlign="left"
        >
          <Input size="large" onChange={(e) => setExmple2(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="예문 뜻 / ID"
          name="example_3"
          labelCol={{ span: 5 }}
          labelAlign="left"
        >
          <Input size="large" onChange={(e) => setExmple3(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="출처"
          name="source"
          labelCol={{ span: 5 }}
          labelAlign="left"
        >
          <Input size="large" onChange={(e) => setSource(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="이미지 파일명"
          name="imageUrl"
          labelCol={{ span: 5 }}
          labelAlign="left"
        >
          <Input size="large" onChange={(e) => setImageUrl(e.target.value)} />
          <span
            style={{
              fontSize: 12,
              color: "#999",
            }}
          >
            파일 업로드 개발 전까지는 직접 전달주세요 !
          </span>
        </Form.Item>
        <Row justify="end">
          <Button
            type="primary"
            htmlType="submit"
            onClick={onClick}
            size="large"
            style={{
              width: "120px",
            }}
          >
            등록
          </Button>
        </Row>
      </Form>
    </div>
  );
};
export default KoreanRegisterPage;
