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
import { createQuestion } from "../api/question";
import TextArea from "antd/es/input/TextArea";
const { Title } = Typography;

const QuestionRegisterPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [answer, setAnswer] = useState("");
  const [explanation, setExplanation] = useState("");
  const [type, setType] = useState("topik_variation");
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  const onClick = async () => {
    if (!title || !description || !answer || !explanation) {
      message.warning("내용을 입력해주세요.");
      return;
    }

    try {
      const response = await createQuestion({
        title,
        description,
        answer,
        explanation,
        level: 1, // 사용안하고 있어서 1로 고정
        type,
        imageUrl,
      });
      if (response.status === 200 || response.status === 201) {
        message.success("등록이 완료되었습니다.");
        navigate("/question");
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
      <Title level={2}>기출문제 등록</Title>
      <Divider></Divider>
      <Form style={{ maxWidth: 800 }}>
        <Form.Item
          label="문제"
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
          labelAlign="left"
          labelCol={{ span: 5 }}
        >
          <Input size="large" onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="문제 보기"
          name="description"
          rules={[
            {
              required: true,
            },
          ]}
          labelCol={{ span: 5 }}
          labelAlign="left"
        >
          <TextArea
            size="large"
            onChange={(e) => setDescription(e.target.value)}
          />
          {/* <Input
                size="large"
                onChange={(e) => setDescription(e.target.value)}
              /> */}
        </Form.Item>
        <Form.Item
          label="정답"
          name="answer"
          rules={[
            {
              required: true,
            },
          ]}
          labelAlign="left"
          labelCol={{ span: 5 }}
        >
          <Input size="large" onChange={(e) => setAnswer(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="해설 / ID"
          name="explanation"
          rules={[
            {
              required: true,
            },
          ]}
          labelAlign="left"
          labelCol={{ span: 5 }}
        >
          <TextArea
            size="large"
            onChange={(e) => setExplanation(e.target.value)}
          />
          {/* <Input size="large" onChange={(e) => setAnswer(e.target.value)} /> */}
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
export default QuestionRegisterPage;
