import React, { useEffect, useState } from "react";
import { Button, Table, message, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { getWords, deleteWord } from "../api/user";

const UserPage = () => {
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

  const goToUserRegister = () => {
    navigate("/user/register");
  };

  const getList = async () => {
    // const data = dummy;

    const response = await getWords({
      page: 1,
      limit: 10,
    });
    const data = response.data.users.map((item) => {
      return {
        ...item,
        key: item.id,
      };
    });
    console.log(response.data.users, data);

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

  useEffect(() => {
    getList();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "PhoneNumber",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];
  return (
    <div>
      <Button
        type="primary"
        style={{
          marginTop: "auto",
          marginBottom: "10px",
        }}
        onClick={goToUserRegister}
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
      />
    </div>
  );
};

export default UserPage;
