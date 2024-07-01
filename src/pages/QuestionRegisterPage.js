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
  const [example_1, setExmple1] = useState("①");
  const [example_2, setExmple2] = useState("②");
  const [example_3, setExmple3] = useState("③");
  const [example_4, setExmple4] = useState("④");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [answer, setAnswer] = useState("");
  const [explanation, setExplanation] = useState("");
  const [type, setType] = useState("topik_variation");
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  const onClick = async () => {
    if (
      !title ||
      !answer ||
      !explanation ||
      !example_1 ||
      !example_2 ||
      !example_3 ||
      !example_4
    ) {
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
        example_1,
        example_2,
        example_3,
        example_4,
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
          label="지문"
          name="description"
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
          label="보기 1"
          name="example_1"
          labelCol={{ span: 5 }}
          rules={[
            {
              required: true,
            },
          ]}
          labelAlign="left"
        >
          <Input
            size="large"
            defaultValue="①"
            onChange={(e) => setExmple1(e.target.value)}
          />
          <p style={{ fontSize: 12, color: "#999" }}>
            앞에 숫자도 입력해주세요 ! ① ② ③ ④
          </p>
        </Form.Item>
        <Form.Item
          label="보기 2"
          name="example_2"
          rules={[
            {
              required: true,
            },
          ]}
          labelCol={{ span: 5 }}
          labelAlign="left"
        >
          <Input
            size="large"
            defaultValue="②"
            onChange={(e) => setExmple2(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="보기 3"
          name="example_3"
          rules={[
            {
              required: true,
            },
          ]}
          labelCol={{ span: 5 }}
          labelAlign="left"
        >
          <Input
            size="large"
            defaultValue="③"
            onChange={(e) => setExmple3(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="보기 4"
          name="example_4"
          rules={[
            {
              required: true,
            },
          ]}
          labelCol={{ span: 5 }}
          labelAlign="left"
        >
          <Input
            size="large"
            defaultValue="④"
            onChange={(e) => setExmple4(e.target.value)}
          />
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
