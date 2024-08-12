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
import { checkWord, createWord } from "../api/word";
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
  const [usableWord, setUsableWord] = useState(false);
  const navigate = useNavigate();

  const onClick = async () => {
    if (!usableWord) {
      message.warning("중복확인을 해주세요.");
      return;
    }
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

  const onClickCheckWord = async () => {
    if (!korean) {
      message.warning("한국어를 입력해주세요.");
      return;
    }

    // 중복확인 api 호출
    try {
      const response = await checkWord(korean);
      if (response.status === 200 && !response.data.result) {
        setUsableWord(true);
        message.success("사용 가능한 한국어입니다.");
      } else {
        message.error("이미 등록된 한국어입니다.");
      }
    } catch (e) {
      console.error(e);
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
            <Radio value="topik_word">TOPIK 단어</Radio>
            <Radio value="basic">BASIC</Radio>
          </Radio.Group>
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Input
              size="large"
              onChange={(e) => {
                setKorean(e.target.value);
                setUsableWord(false);
              }}
            />
            <div
              style={{
                width: 100,
                marginLeft: 10,
                height: 40,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: usableWord ? "#bfbfbf" : "#1890ff",
                borderRadius: 5,
                cursor: "pointer",
              }}
              onClick={onClickCheckWord}
            >
              <span
                style={{
                  color: "#fff",
                }}
              >
                중복확인
              </span>
            </div>
          </div>
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
        {/* <Form.Item
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
        </Form.Item> */}
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
