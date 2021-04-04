import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Button } from "antd";
import dynamic from "next/dynamic";
import styles from "./style.module.css";
import Layout from "../../../Component/layout";
import BrandAddModal from "../../../Component/Admin/Modal/BrandAddModal";
import { useQuery, gql } from "@apollo/client";
import { LOAD_BRAND } from "../../../GraphQL/queries";

const brand = () => {
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
      <Button
        onClick={() => {
          setIsModalVisible(true);
        }}
      >
        Add Brands
      </Button>
      <Layout>
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

export default brand;
