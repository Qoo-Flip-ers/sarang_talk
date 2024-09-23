import React, { useEffect, useState } from "react";
import {
  Typography,
  Divider,
  Form,
  Input,
  Button,
  message,
  Radio,
  Row,
  Col,
  Spin,
  Upload,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {
  checkWord,
  createWord,
  getWord,
  updateWord,
  generateWord,
  getWordSounds,
} from "../api/word";
import { uploadImage } from "../api/upload";
import magicWand from "../assets/icon_magic_wand.png";

const { Title } = Typography;

const KoreanRegisterPage = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [korean, setKorean] = useState("");
  const [description, setDescription] = useState("");
  const [pronunciation, setPronunciation] = useState("");
  const [example_1, setExample1] = useState("");
  const [example_2, setExample2] = useState("");
  const [example_3, setExample3] = useState("");
  const [en_description, setENDescription] = useState("");
  const [en_pronunciation, setENPronunciation] = useState("");
  const [en_example_1, setENExample1] = useState("");
  const [en_example_2, setENExample2] = useState("");
  const [en_example_3, setENExample3] = useState("");
  const [type, setType] = useState("daily_conversation");
  const [usableWord, setUsableWord] = useState(params.id ? true : false);
  const [soundUrl, setSoundUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const onUpdate = async () => {
    if (!usableWord) {
      message.warning("중복확인을 해주세요.");
      return;
    }
    if (!korean || !description || !pronunciation) {
      message.warning("내용을 입력해주세요.");
      return;
    }

    try {
      const response = await updateWord(params.id, {
        korean,
        description,
        pronunciation,
        example_1,
        example_2,
        example_3,
        en_description,
        en_pronunciation,
        en_example_1,
        en_example_2,
        en_example_3,
        type,
        audioUrl: soundUrl,
        imageUrl,
      });
      if (response.status === 200 || response.status === 201) {
        message.success("수정이 완료되었습니다.");
        navigate("/korean");
      } else {
        message.error("다시 시도해주세요.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onCreate = async () => {
    if (!usableWord) {
      message.warning("중복확인을 해주세요.");
      return;
    }
    if (!korean || !description || !pronunciation) {
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
        en_description,
        en_pronunciation,
        en_example_1,
        en_example_2,
        en_example_3,
        type,
        audioUrl: soundUrl,
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
    }
  };

  const onClickCheckWord = async () => {
    if (!korean) {
      message.warning("한국어를 입력해주세요.");
      return;
    }

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

  const onClickGenerate = async () => {
    if (!korean) {
      message.warning("한국어를 입력해주세요.");
      return;
    }

    if (!usableWord) {
      message.warning("중복확인을 해주세요.");
      return;
    }
    setLoading(true);

    try {
      const response = await generateWord(korean);
      if (response.status === 200) {
        const data = response.data;
        setPronunciation(data.pronunciation);
        setDescription(data.meaning_id);
        setENDescription(data.meaning_en);
        setExample1(data.example_sentence_kr);
        setExample2(data.example_pronunciation);
        setExample3(data.example_meaning_id);
        setENExample3(data.example_meaning_en);
        message.success("자동 생성이 완료되었습니다.");
      } else {
        message.error("자동 생성에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (e) {
      console.error(e);
      message.error("자동 생성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const onClickGetSound = async () => {
    if (!korean) {
      message.warning("한국어를 입력해주세요.");
      return;
    }

    if (!usableWord) {
      message.warning("중복확인을 해주세요.");
      return;
    }

    setLoading(true);
    try {
      const response = await getWordSounds(korean);
      if (response.status === 200) {
        setSoundUrl(response.data.url);
        message.success("소리를 가져왔습니다.");
      } else {
        message.error("소리를 가져오는데 실패했습니다. 다시 시도해주세요.");
      }
    } catch (e) {
      console.error(e);
      message.error("소리를 가져오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const getWordDetail = async () => {
    setLoading(true);
    try {
      const response = await getWord(params.id);
      if (response.status === 200) {
        const data = response.data;
        setKorean(data.korean);
        setDescription(data.description);
        setPronunciation(data.pronunciation);
        setExample1(data.example_1);
        setExample2(data.example_2);
        setExample3(data.example_3);
        setENDescription(data.en_description);
        setENPronunciation(data.en_pronunciation);
        setENExample1(data.en_example_1);
        setENExample2(data.en_example_2);
        setENExample3(data.en_example_3);
        setType(data.type);
        setSoundUrl(data.audioUrl);
        setImageUrl(data.imageUrl);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file) => {
    try {
      const response = await uploadImage(file);
      setImageUrl(response.url);
      message.success("이미지 업로드가 완료되었습니다.");
    } catch (e) {
      console.error(e);
      message.error("이미지 업로드 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    if (params.id) {
      getWordDetail();
    }
  }, [params.id]);

  return (
    <div>
      <Title level={2}>한국어 {params.id ? "수정" : "등록"}</Title>
      <Divider />
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <Form layout="vertical" style={{ maxWidth: 1000 }}>
          <Form.Item
            label="카테고리"
            name="type"
            rules={[{ required: true, message: "카테고리를 선택해주세요!" }]}
            initialValue={type}
          >
            <Radio.Group onChange={(e) => setType(e.target.value)}>
              <Radio value="daily_conversation">Daily Conversation</Radio>
              <Radio value="topik_word">TOPIK 단어</Radio>
              <Radio value="basic">BASIC</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="표현 / KR"
            name="korean"
            rules={[{ required: true, message: "한국어를 입력해주세요!" }]}
            initialValue={korean}
          >
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Input
                style={{ flex: 1 }}
                value={korean}
                size="large"
                onChange={(e) => {
                  setKorean(e.target.value);
                  setUsableWord(false);
                }}
              />
              <Button
                onClick={onClickCheckWord}
                disabled={usableWord}
                style={{ marginLeft: 10, maxWidth: 100 }}
                block
                size="large"
              >
                중복확인
              </Button>
              <Button
                onClick={onClickGenerate}
                style={{ marginLeft: 10, maxWidth: 100 }}
                block
                disabled={!usableWord}
                size="large"
                icon={
                  <img
                    src={magicWand}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                }
              >
                생성
              </Button>
              <Button
                onClick={onClickGetSound}
                style={{ marginLeft: 10, maxWidth: 120 }}
                block
                disabled={!usableWord}
                size="large"
              >
                소리 가져오기
              </Button>
            </Row>
          </Form.Item>

          {soundUrl && (
            <Form.Item label="소리">
              <audio controls src={soundUrl}>
                브라우저가 오디오를 지원하지 않습니다.
              </audio>
            </Form.Item>
          )}

          <Form.Item label="이미지 업로드">
            <Upload
              customRequest={({ file }) => handleImageUpload(file)}
              showUploadList={false}
            >
              <Button>이미지 업로드</Button>
            </Upload>
            {imageUrl && (
              <div
                style={{ display: "flex", alignItems: "center", marginTop: 10 }}
              >
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  style={{
                    maxWidth: "100px",
                    maxHeight: "100px",
                    marginRight: 10,
                  }}
                />
                <Button onClick={() => setImageUrl("")} type="primary" danger>
                  삭제
                </Button>
              </div>
            )}
          </Form.Item>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="표현 발음기호 / Roman"
                name="pronunciation"
                rules={[{ required: true, message: "발음을 입력해주세요!" }]}
                initialValue={pronunciation}
              >
                <Input
                  onChange={(e) => setPronunciation(e.target.value)}
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="표현 뜻 / ID"
                name="description"
                rules={[{ required: true, message: "의미를 입력해주세요!" }]}
                initialValue={description}
              >
                <Input
                  onChange={(e) => setDescription(e.target.value)}
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="표현 뜻 / EN"
                name="en_description"
                initialValue={en_description}
              >
                <Input
                  onChange={(e) => setENDescription(e.target.value)}
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>

          <Divider />
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="예문 / KR"
                name="example_1"
                initialValue={example_1}
              >
                <Input
                  onChange={(e) => setExample1(e.target.value)}
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="예문 발음기호 / Roman"
                name="example_2"
                initialValue={example_2}
              >
                <Input
                  onChange={(e) => setExample2(e.target.value)}
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="예문 뜻 / ID"
                name="example_3"
                initialValue={example_3}
              >
                <Input
                  onChange={(e) => setExample3(e.target.value)}
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="예문 뜻 / EN"
                name="en_example_3"
                initialValue={en_example_3}
              >
                <Input
                  onChange={(e) => setENExample3(e.target.value)}
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Form.Item>
            <Button
              type="primary"
              onClick={() => (params.id ? onUpdate() : onCreate())}
              block
              size="large"
            >
              {params.id ? "수정" : "등록"}
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default KoreanRegisterPage;
