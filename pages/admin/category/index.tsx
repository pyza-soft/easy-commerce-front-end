import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Button } from "antd";

import styles from "./style.module.css";
import Layout from "../../../Component/Layout";
import BrandAddModal from "../../../Component/Admin/Modal/BrandAddModal";
import BrandUpdateModal from "../../../Component/Admin/Modal/BrandUpdateModal";
import { useQuery, gql } from "@apollo/client";
import { LOAD_BRAND } from "../../../GraphQL/queries";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: String!, $type: String!) {
    updateTodo(id: $id, type: $type) {
      id
      type
    }
  }
`;

type dataType = {
  ID: number;
  Name: string;
  Description: string;
};

const Category = () => {
  const { error, loading, data } = useQuery(LOAD_BRAND);
  const [brands, setBrands] = useState([]);
  const [currentBrands, setCurrentBrands] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

  useEffect(() => {
    if (data) {
      setBrands(data?.brands);
    }
  }, [data]);

  const onEdit = (id: number) => {
    console.log("YY", id);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
    },
    {
      title: "Action",
      key: "action",
      className: "text-center",

      render: (action: any, record: dataType) => (
        <Space size='middle'>
          <Button
            icon={<EditOutlined />}
            className={styles.buttonDesign}
            onClick={() => {
              setIsUpdateModalVisible(true);
              onEdit(record.ID);
            }}
          >
            Update
          </Button>
          <Button
            icon={<DeleteOutlined />}
            className={styles.buttonDesign}
            danger
            type='primary'
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const value = brands.map((d: any, index: number) => ({
    key: index,
    ID: d?.id,
    Name: d?.name,
    Description: d?.description,
  }));

  columns;
  return (
    <React.Fragment>
      <Layout>
        <Button
          icon={<PlusOutlined />}
          onClick={() => {
            setIsModalVisible(true);
          }}
          className={styles.addButton}
        >
          Add Category
        </Button>
        {loading ? (
          "Loading"
        ) : (
          <Table
            columns={columns}
            dataSource={value}
            pagination={{ pageSize: 5 }}
          />
        )}
      </Layout>
      <BrandAddModal
        show={isModalVisible}
        onHide={() => {
          setIsModalVisible(false);
        }}
      />

      <BrandUpdateModal
        show={isUpdateModalVisible}
        onHide={() => {
          setIsUpdateModalVisible(false);
        }}
      />
    </React.Fragment>
  );
};

export default Category;
