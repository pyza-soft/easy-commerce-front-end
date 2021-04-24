import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Button, message } from "antd";

import styles from "./style.module.css";
import Layout from "../../../Component/Layout";
import CategoryAddModal from "../../../Component/Admin/Modal/CategoryAddModal";
import CategoryUpdateModal from "../../../Component/Admin/Modal/CategoryUpdateModal";

import { useQuery, gql, useMutation } from "@apollo/client";
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

const DELETE_CATEGORY = gql`
  mutation deleteCategory($id: Int!) {
    deleteCategory(id: $id) {
      success
    }
  }
`;

const Category = () => {
  const { error, loading, data } = useQuery(LOAD_CATEGORY);
  const [deleteBrand] = useMutation(DELETE_CATEGORY);
  const [category, setCategory] = useState([]);
  const [currentBrands, setCurrentBrands] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [item, setItem] = useState([]);

  useEffect(() => {
    if (data) {
      setCategory(data?.categories);
    }
  }, [data]);

  const info = () => {
    message.info("This is a normal message");
  };

  const value = category.map((d: any, index: number) => ({
    key: index,
    id: d?.id,
    name: d?.name,
    description: d?.description,
    image: d?.image,
  }));

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

      render: (action: any, record: any) => (
        <Space size='middle'>
          <Button
            icon={<EditOutlined />}
            className={styles.buttonDesign}
            type='primary'
            onClick={() => {
              setIsUpdateModalVisible(true);
              setItem(record);
            }}
          >
            Update
          </Button>
          <Button
            icon={<DeleteOutlined />}
            className={styles.buttonDesign}
            danger
            type='primary'
            onClick={() => {
              deleteBrand({
                variables: { id: record.id },
              }).catch(() => message.error("Delete Failed!"));

              let filteredAry = category.filter((e) => {
                return e.id !== record.id;
              });

              return setCategory(filteredAry);
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

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
        onCreateSuccess={(values) => {
          let addtemp = [...category, values];
          setCategory(addtemp);
          setIsModalVisible(false);
        }}
      />

      {item && (
        <CategoryUpdateModal
          show={isUpdateModalVisible}
          onUpdateSuccess={(values) => {
            let temp = [...category];
            temp = temp.map((item: any) => {
              if (parseInt(item.id) === parseInt(values.id)) {
                return { ...values };
              } else {
                return item;
              }
            });

            setCategory(temp);
            setIsUpdateModalVisible(false);
            setItem(null);
          }}
          value={item}
          onHide={() => {
            setIsUpdateModalVisible(false);
            setItem(null);
          }}
        />
      )}
    </React.Fragment>
  );
};

export default Category;
