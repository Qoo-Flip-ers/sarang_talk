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
const { Title, Link } = Typography;

const KoreanPage = () => {
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

  const goToKoreanRegister = () => {
    navigate("/korean/register");
  };

  const getList = async (newPage) => {
    try {
      const response = await getWords({
        page: newPage,
        limit: 10,
      });
      if (response.status !== 200) {
        throw new Error("서버 에러");
      }

      const { totalCount, totalPage, words } = response.data;
      const data = words.map((item) => {
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
      methods.push(deleteWord(key));
    });

    const response = await Promise.all(methods);

    message.success(selectedRowKeys.length + "개 단어가 삭제되었습니다.");

    // 선택된 keys 초기화, 목록 새로고침, 모달 닫기
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
    {
      title: "카테고리",
      dataIndex: "type",
      key: "type",
      width: 100,
      align: "center",
      render: (type) => {
        let color = "blue";
        switch (type) {
          case "daily_conversation":
            color = "green";
            break;
          case "kpop_lyrics":
            color = "blue";
            break;
          case "topik_word":
            color = "purple";
            break;
          case "basic":
            color = "orange";
            break;

          default:
            break;
        }
        return <Tag color={color}>{type}</Tag>;
      },
    },
    {
      title: "단어",
      dataIndex: "korean",
      key: "korean",
      width: "40%",
      render: (korean, row) => {
        return (
          <Col>
            <p style={{ fontWeight: "bold", fontSize: 14, marginBottom: 0 }}>
              {korean}
            </p>
            <p
              style={{
                color: "#888888",
                fontSize: 12,
                marginBottom: 0,
              }}
            >
              [
              <span
                style={{
                  fontStyle: "italic",
                }}
              >
                {row.pronunciation}
              </span>
              ]
            </p>
            <p
              style={{
                fontSize: 12,
                color: "#555555",
              }}
            >
              {row.description}
            </p>
          </Col>
        );
      },
    },
    // {
    //   title: "뜻",
    //   dataIndex: "description",
    //   key: "description",
    // },

    {
      title: "예문",
      dataIndex: "example_1",
      key: "example_1",
      width: "40%",
      render: (example_1, row) => {
        return (
          <Col>
            <p style={{ fontWeight: "bold", fontSize: 14, marginBottom: 0 }}>
              {example_1}
            </p>
            <p
              style={{
                color: "#888888",
                fontSize: 12,
                marginBottom: 0,
              }}
            >
              [
              <span
                style={{
                  fontStyle: "italic",
                }}
              >
                {row.example_2}
              </span>
              ]
            </p>
            <p
              style={{
                fontSize: 12,
                color: "#555555",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {row.example_3}
            </p>
          </Col>
        );
      },
    },

    {
      title: "출처",
      width: "10%",
      dataIndex: "source",
      key: "source",
      render: (source) => (
        <p style={{ fontSize: 12, color: "#777" }}>{source}</p>
      ),
    },
  ];
  return (
    <div>
      <Title level={2}>한국어 관리</Title>
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
              onClick={goToKoreanRegister}
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

export default KoreanPage;
