import React from 'react';
import Image from "next/image";
import styles from "./style.module.css";
import { useRouter } from "next/router";
import { Layout, Menu } from "antd";

import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const { Header, Content, Footer, Sider } = Layout;

const Navbar = ({ children }) => {
  const router = useRouter();

  const handleClick = (url) => {
    router.push(url);
  };
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(true);
  const onSidebarCollapsed = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        // className='style-menu'
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          zIndex: 3,
        }}
        collapsible
        // breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={onSidebarCollapsed}
        collapsed={sidebarCollapsed}
      >
        <div className={styles.logo} />

        <Menu theme='dark' mode='inline' defaultSelectedKeys={["1"]}>
          <Menu.Item
            key='1'
            icon={<UserOutlined />}
            onClick={() => handleClick("/admin/brand")}
          >
            Brand
          </Menu.Item>

          <Menu.Item
            key='2'
            onClick={() => handleClick("/admin/category")}
            icon={<VideoCameraOutlined />}
          >
            Category
          </Menu.Item>
          <Menu.Item key='3' icon={<UploadOutlined />}>
            Product List
          </Menu.Item>
          <Menu.Item key='4' icon={<BarChartOutlined />}>
            Order List
          </Menu.Item>
          <Menu.Item key='5' icon={<CloudOutlined />}>
            nav 5
          </Menu.Item>
          <Menu.Item key='6' icon={<AppstoreOutlined />}>
            nav 6
          </Menu.Item>
          <Menu.Item key='7' icon={<TeamOutlined />}>
            nav 7
          </Menu.Item>
          <Menu.Item key='8' icon={<ShopOutlined />}>
            nav 8
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='site-layout'
        // style={{ paddingLeft: 80 }}
      >
        <Header className={styles.sitebackground} style={{ padding: 0 }}>
          {React.createElement(sidebarCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            style: {
              paddingLeft: !sidebarCollapsed ? 210 : 15,
            },
            onClick: () => onSidebarCollapsed(!sidebarCollapsed),
          })}
        </Header>
        <Content style={{
          margin: "0 16px", overflow: "initial",
        }}>
          <div
            className='site-layout-background'
            style={{ paddingTop: 15 }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Easy Commerce ©2021 Created by PyzaSoft
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Navbar;
