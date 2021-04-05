import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Button } from "antd";
import dynamic from "next/dynamic";
import styles from "./style.module.css";
import Layout from "../../../Component/layout";
import BrandAddModal from "../../../Component/Admin/Modal/BrandAddModal";
import { useQuery, gql } from "@apollo/client";
import { LOAD_BRAND } from "../../../GraphQL/queries";

const Brand = () => {
  const { error, loading, data } = useQuery(LOAD_BRAND);
  const [brands, setBrands] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (data) {
      setBrands(data?.brands);
    }
  }, [data]);

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
      render: (text, record) => (
        <Space size='middle'>
          {/* <Button
            className={styles.buttonDesign}
            type='primary'
            onClick={() => setIsModalVisible(true)}
          >
            Add
          </Button> */}
          <Button className={styles.buttonDesign}>Update</Button>
          <Button className={styles.buttonDesign} danger type='primary'>
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
          onClick={() => {
            setIsModalVisible(true);
          }}
          className='mb-2'
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
    </React.Fragment>
  );
};

export default Brand;
