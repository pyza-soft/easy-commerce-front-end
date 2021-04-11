import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Button } from "antd";

import styles from "./style.module.css";
import Layout from "../../../Component/Layout";
import CategoryAddModal from "../../../Component/Admin/Modal/CategoryAddModal";
import BrandUpdateModal from "../../../Component/Admin/Modal/BrandUpdateModal";
import { useQuery, gql } from "@apollo/client";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

export const LOAD_CATEGORY = gql`
  query {
    categories {
      id
      name
      description
      image
    }
  }
`;

const Category = () => {
  const { error, loading, data } = useQuery(LOAD_CATEGORY);
  const [category, setCategory] = useState([]);
  const [currentBrands, setCurrentBrands] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

  useEffect(() => {
    if (data) {
      setCategory(data?.categories);
    }
  }, [data]);

  const onEdit = (id: number) => {
    console.log("YY", id);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",

      render: (text, record) => {
        return (
          <div>
            <img src={record.image} />
          </div>
        );
      },
    },

    {
      title: "Action",
      key: "action",
      className: "text-center",

      render: () => (
        <Space size='middle'>
          <Button
            icon={<EditOutlined />}
            className={styles.buttonDesign}
            onClick={() => {
              setIsUpdateModalVisible(true);
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

  const value = category.map((d: any, index: number) => ({
    key: index,
    id: d?.id,
    name: d?.name,
    description: d?.description,
    image: d?.image,
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
      <CategoryAddModal
        show={isModalVisible}
        onHide={() => {
          setIsModalVisible(false);
        }}
      />
    </React.Fragment>
  );
};

export default Category;
