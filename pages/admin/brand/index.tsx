import React, { useEffect, useState } from "react";
import { Table, Space, Button, message } from "antd";
import { ColumnsType } from "antd/es/table";
import styles from "./style.module.css";
import Layout from "../../../Component/Layout";
import BrandAddModal from "../../../Component/Admin/Modal/BrandAddModal";
import BrandUpdateModal from "../../../Component/Admin/Modal/BrandUpdateModal";
import { useQuery, gql, useMutation } from "@apollo/client";
import { LOAD_BRAND } from "../../../GraphQL/queries";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const DELETE_BRAND = gql`
  mutation deleteBrand($id: Int!) {
    deleteBrand(id: $id) {
      success
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

  const columns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
      width: 20,
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      width: 100,
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      width: 150,
    },
    {
      title: "Action",
      key: "action",
      width: 40,
      className: "text-center",
      fixed: "right",
      render: (action: any, record: any) => (
        <Space size='middle'>
          <Button
            icon={<EditOutlined />}
            type='primary'
            // className={styles.buttonDesign}
            onClick={() => {
              setIsUpdateModalVisible(true);
              setItem(record);
            }}
          >
            Update
          </Button>

          <Button
            icon={<DeleteOutlined />}
            // className={styles.buttonDesign}
            danger
            type='primary'
            onClick={() => {
              deleteBrand({
                variables: { id: record.ID },
              }).catch(() => message.error("Delete Failed!"));

              let filteredAry = brands.filter((e) => {
                return e.id !== record.ID;
              });

              return setBrands(filteredAry);
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
    <>
      <Layout>
        <div>
          <Button
            icon={<PlusOutlined />}
            onClick={() => {
              setIsModalVisible(true);
            }}
            className={styles.addButton}
            type='primary'
          >
            Add Brand
          </Button>
          {loading ? (
            "Loading"
          ) : (
            <Table
              scroll={{ x: 1024 }}
              columns={columns}
              dataSource={value}
              pagination={{ pageSize: 5 }}
            />
          )}
        </div>
      </Layout>
      <BrandAddModal
        show={isModalVisible}
        onHide={() => {
          setIsModalVisible(false);
        }}
        onCreateSuccess={(values) => {
          let addtemp = [...brands, values];
          setBrands(addtemp);
          setIsUpdateModalVisible(false);
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
    </>
  );
};

export default Brand;
