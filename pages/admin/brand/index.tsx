import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Button, message } from "antd";
import styles from "./style.module.css";
import Layout from "../../../Component/Layout";
import BrandAddModal from "../../../Component/Admin/Modal/BrandAddModal";
import BrandUpdateModal from "../../../Component/Admin/Modal/BrandUpdateModal";
import { useQuery, gql, useMutation } from "@apollo/client";
import { LOAD_BRAND } from "../../../GraphQL/queries";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const DELETE_BRAND = gql`
  mutation deleteBrand($brandId: Int!) {
    deleteBrand(brandId: $brandId) {
      brandId
    }
  }
`;

const Brand = () => {
  const { error, loading, data } = useQuery(LOAD_BRAND);
  const [deleteBrand] = useMutation(DELETE_BRAND);
  const [brands, setBrands] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [item, setItem] = useState([]);

  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

  useEffect(() => {
    if (data) {
      setBrands(data?.brands);
    } else {
      if (error) message.error("No Data Found");
    }
  }, [data]);

  const value = brands.map((d: any, index: number) => ({
    key: index,
    ID: d?.id,
    Name: d?.name,
    Description: d?.description,
  }));

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

      render: (action: any, record: any) => (
        <Space size='middle'>
          <Button
            icon={<EditOutlined />}
            className={styles.buttonDesign}
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
            onClick={() =>
              deleteBrand({
                variables: { brandId: record.ID },
              }).catch(() => message.error("Delete Failed!"))
            }
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
          Add Brand
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
      {item && (
        <BrandUpdateModal
          show={isUpdateModalVisible}
          onUpdateSuccess={(values) => {
            let temp = [...brands];
            temp = temp.map((item: any) => {
              if (parseInt(item.id) === parseInt(values.id)) {
                return { ...values };
              } else {
                return item;
              }
            });

            setBrands(temp);
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

export default Brand;
