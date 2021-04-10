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
  PropertySafetyFilled,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

const Navbar = ({ children }) => {
  const router = useRouter();

  const handleClick = (url) => {
    router.push(url);
  };
  return (
    <Layout>
      <Sider
        className='style-menu'
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
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
            nav 3
          </Menu.Item>
          <Menu.Item key='4' icon={<BarChartOutlined />}>
            nav 4
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
      <Layout className='site-layout' style={{ marginLeft: 200 }}>
        <Header className={styles.sitebackground} style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            className='site-layout-background'
            style={{ padding: 24, textAlign: "right" }}
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
