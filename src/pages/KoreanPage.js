import React, { useEffect, useState } from "react";
import { Button, Table, message, Modal, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { getWords, deleteWord } from "../api/word";

const KoreanPage = () => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const goToKoreanRegister = () => {
    navigate("/korean/register");
  };

  const getList = async () => {
    // const data = dummy;

    const response = await getWords({
      page: 1,
      limit: 10,
    });
    const data = response.data.words.map((item) => {
      return {
        ...item,
        key: item.id,
      };
    });
    console.log(response.data.words, data);

    // .map() return 새 배열

    //
    setDataSource(data);
  };

  const onDelete = () => {
    selectedRowKeys.forEach(async (key) => {
      await deleteWord(key);
    });

    message.success(selectedRowKeys.length + "개 단어가 삭제되었습니다.");

    // 선택된 keys 초기화, 목록 새로고침, 모달 닫기
    setSelectedRowKeys([]);
    getList();

    setOpen(false);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // useEffect(() => {
  //   getList();
  // }, []);

  const columns = [
    {
      title: "Korean",
      dataIndex: "korean",
      key: "korean",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Pronunciation",
      dataIndex: "pronunciation",
      key: "pronunciation",
    },
    {
      title: "Example1",
      dataIndex: "example1",
      key: "example1",
    },
    {
      title: "Example2",
      dataIndex: "example2",
      key: "example2",
    },
    {
      title: "Example3",
      dataIndex: "example3",
      key: "example3",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
    },
    {
      title: "ImageUrl",
      dataIndex: "imageUrl",
      key: "imageUrl",
    },
  ];
  return (
    <div>
      <Flex gap="small" wrap>
        <Button
          type="primary"
          style={{
            marginTop: "auto",
            marginBottom: "10px",
          }}
          onClick={goToKoreanRegister}
        >
          Add
        </Button>
        <Button
          type="primary"
          onClick={showModal}
          disabled={selectedRowKeys.length === 0}
        >
          Delete
        </Button>
      </Flex>
      <Modal
        title="Delete"
        open={open}
        onOk={onDelete}
        onCancel={hideModal}
        okText="Ok"
        cancelText="Cancel"
      >
        <p>정말 삭제 하시겠습니까?</p>
      </Modal>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowSelection={{
          ...rowSelection,
        }}
      />
    </div>
  );
};

export default KoreanPage;
