import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  message,
  Modal,
  Flex,
  Row,
  Pagination,
  Tag,
  Col,
  Tooltip,
  Typography,
  Divider,
} from "antd";
import { useNavigate } from "react-router-dom";
import { getWords, deleteWord } from "../api/word";
import { deleteQuestion, getQuestions } from "../api/question";
const { Title, Link } = Typography;

const QuestionPage = () => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [metadata, setMetadata] = useState({
    totalCount: 0,
    totalPage: 1,
  });

  const showModal = () => {
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const goToQuestionsRegister = () => {
    navigate("/question/register");
  };

  const getList = async (newPage) => {
    try {
      const response = await getQuestions({
        page: newPage,
        limit: 10,
      });
      if (response.status !== 200) {
        throw new Error("서버 에러");
      }

      const { totalCount, totalPage, questions } = response.data;
      const data = questions.map((item) => {
        return {
          ...item,
          key: item.id,
        };
      });
      setDataSource(data);
      setMetadata({
        totalCount,
        totalPage,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const onDelete = async () => {
    const methods = [];
    selectedRowKeys.forEach(async (key) => {
      methods.push(deleteQuestion(key));
    });

    const resposne = await Promise.all(methods);

    message.success(selectedRowKeys.length + "개 문제가 삭제되었습니다.");

    setSelectedRowKeys([]);
    setOpen(false);
    refresh();
  };

  const refresh = () => {
    if (page === 1) {
      getList(1);
    } else {
      setPage(1);
    }
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    getList(page);
  }, [page]);

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      width: 10,
    },
    // {
    //   title: "카테고리",
    //   dataIndex: "type",
    //   key: "type",
    //   width: 100,
    //   align: "center",
    //   render: (type) => {
    //     let color = "blue";
    //     switch (type) {
    //       case "topik_variation":
    //         color = "orange";
    //         break;
    //       case "kpop_lyrics":
    //         color = "blue";
    //         break;
    //       case "topik_word":
    //         color = "purple";
    //         break;

    //       default:
    //         break;
    //     }
    //     return <Tag color={color}>{type}</Tag>;
    //   },
    // },
    {
      title: "문제",
      dataIndex: "title",
      key: "title",
      width: "35%",
      render: (title, row) => {
        return (
          <Col>
            <p style={{ fontWeight: "bold", fontSize: 14, marginBottom: 0 }}>
              {title}
            </p>

            <p
              style={{
                fontSize: 12,
                color: "#555555",
                whiteSpace: "pre",
              }}
            >
              {row.description}
            </p>
          </Col>
        );
      },
    },
    {
      title: "보기",
      dataIndex: "example_1",
      key: "example_1",
      width: "20%",
      render: (example_1, row) => (
        <Col>
          <Row style={{ fontSize: 12 }}>{example_1}</Row>
          <Row style={{ fontSize: 12 }}>{row.example_2}</Row>
          <Row style={{ fontSize: 12 }}>{row.example_3}</Row>
          <Row style={{ fontSize: 12 }}>{row.example_4}</Row>
        </Col>
      ),
    },

    {
      title: "정답",
      dataIndex: "answer",
      key: "answer",
      width: "35%",
      render: (answer, row) => {
        return (
          <Col>
            <p style={{ fontWeight: "bold", fontSize: 14, marginBottom: 0 }}>
              {answer}
            </p>

            <p
              style={{
                fontSize: 12,
                color: "#555555",
                whiteSpace: "pre",
              }}
            >
              {row.explanation}
            </p>
          </Col>
        );
      },
    },

    {
      title: "이미지",
      width: "100px",
      dataIndex: "imageUrl",
      key: "imageUrl",
      align: "center",

      render: (imageUrl) => (
        <div>
          {imageUrl && (
            <img
              src={`https://image.annyeongwa.xyz/${imageUrl}`}
              style={{ maxHeight: "50px" }}
            />
          )}
        </div>
      ),
    },
  ];
  return (
    <div>
      <Title level={2}>기출문제 관리</Title>
      <Divider />
      <Flex gap="small" wrap>
        <Row
          justify="space-between"
          style={{ width: "100%", paddingBottom: 10 }}
        >
          <Row>
            <Button
              type="primary"
              style={{
                marginRight: 6,
              }}
              onClick={goToQuestionsRegister}
            >
              추가
            </Button>
            <Button onClick={showModal} disabled={selectedRowKeys.length === 0}>
              삭제
            </Button>
          </Row>
          <Pagination
            current={page}
            pageSize={10}
            total={metadata.totalCount}
            onChange={(newPage) => {
              setPage(newPage);
            }}
          />
        </Row>
      </Flex>
      <Modal
        title="Delete"
        open={open}
        onOk={onDelete}
        onCancel={hideModal}
        okText="Ok"
        cancelText="Cancel"
      >
        <p>정말 삭제하시겠습니까?</p>
      </Modal>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowSelection={{
          ...rowSelection,
        }}
        pagination={false}
      />
    </div>
  );
};

export default QuestionPage;
