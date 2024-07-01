import React, { useEffect, useState } from "react";
import { Button, Table, message, Modal, Flex, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { getUsers, deleteUser } from "../api/user";

const UserPage = () => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState("");
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

  const goToUserRegister = () => {
    navigate("/user/register");
  };

  const getList = async (newPage) => {
    try {
      const response = await getUsers({
        page: newPage,
        limit: 10,
      });
      if (response.status !== 200) {
        throw new Error("서버 에러");
      }

      const { totalCount, totalPage, users } = response.data;

      const data = users.map((item) => {
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
      methods.push(deleteUser(key));
    });

    await Promise.all(methods);

    message.success(selectedRowKeys.length + "명 유저가 삭제되었습니다.");

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
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => {
        return new Date(createdAt).toLocaleString();
      },
    },
  ];
  return (
    <div>
      <Flex gap="small" wrap>
        {/* <Button
          type="primary"
          style={{
            marginTop: "auto",
            marginBottom: "10px",
          }}
          onClick={goToUserRegister}
        >
          추가
        </Button> */}
        <Button
          type="primary"
          onClick={showModal}
          disabled={selectedRowKeys.length === 0}
        >
          삭제
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
        <p>정말 삭제하시겠습니까? (유저는 삭제를 권하지 않습니다.)</p>
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
