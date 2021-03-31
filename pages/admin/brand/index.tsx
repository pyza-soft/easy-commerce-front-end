import React, { useEffect, useState } from "react";
import { Table, Tag, Space } from "antd";
import dynamic from "next/dynamic";
import Layout from "../../../Component/layout";
import { useQuery, gql } from "@apollo/client";
import { LOAD_BRAND } from "../../../GraphQL/queries";

const LayoutComponent = dynamic(
  () => import("../../../Component/layout/index")
);

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
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
  // {
  //   title: "Tags",
  //   key: "tags",
  //   dataIndex: "tags",
  //   render: (tags) => (
  //     <>
  //       {tags.map((tag) => {
  //         let color = tag.length > 5 ? "geekblue" : "green";
  //         if (tag === "loser") {
  //           color = "volcano";
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </>
  //   ),
  // },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size='middle'>
        <a>Add</a>
        <a>Update</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

// const data = [
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//     tags: ["nice", "developer"],
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//     tags: ["loser"],
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     age: 32,
//     address: "Sidney No. 1 Lake Park",
//     tags: ["cool", "teacher"],
//   },
// ];

const brand = () => {
  const { error, loading, data } = useQuery(LOAD_BRAND);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    if (data) {
      setBrands(data?.brands);
    }
  }, [data]);

  console.log("dd", brands);

  brands && brands.map((d: any) => console.log("ss", d));

  columns;
  return (
    <Layout>
      {/* {brands &&
        brands.map((d: any) => <Table columns={columns} dataSource={d} />)} */}
    </Layout>
  );
};

export default brand;
