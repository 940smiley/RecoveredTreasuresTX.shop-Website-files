import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { 
  HomeOutlined, 
  UserOutlined, 
  LaptopOutlined, 
  NotificationOutlined, 
  MailOutlined, 
  AppstoreOutlined, 
  SettingOutlined 
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

const items1 = [
  {
    label: 'Home',
    key: 'home',
  },
  {
    label: 'Components',
    key: 'components',
  },
  {
    label: 'Layout',
    key: 'layout',
  },
];

const items = [
  {
    label: 'Submenu',
    key: 'sub1',
    children: [
      {
        label: 'Option1',
        key: '1',
      },
      {
        label: 'Option2',
        key: '2',
      },
      {
        label: 'Option3',
        key: '3',
      },
      {
        label: 'Option4',
        key: '4',
      },
    ],
  },
  {
    label: 'Option5',
    key: '5',
  },
];

const App: React.FC = () => (
  <Layout style={{ minHeight: '100vh' }}>
    <Sider breakpoint="lg" collapsedWidth="0">
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
    </Sider>
    <Layout>
      <Header>
        <div className="demo-logo" />
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Pages</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
        </Breadcrumb>
        <div className="demo-toolbar-extra-content">
          <Menu mode="horizontal" items={[
            {
              key: "mail",
              icon: <MailOutlined />,
              label: "Navigation One"
            },
            {
              key: "app",
              icon: <AppstoreOutlined />,
              label: "Navigation Two"
            },
            {
              key: "setting",
              icon: <SettingOutlined />,
              label: "Navigation Three"
            }
          ]} />
        </div>
      </Header>
      <Content style={{ margin: '24px 16px 0' }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <p>Welcome to Recollected Treasures TX - AI-Powered Collectibles Store</p>
          <p>A modern, AI-enhanced e-commerce platform specifically designed for collectibles, featuring automatic categorization, photo enhancement, and intelligent product descriptions.</p>
          <h2>Features</h2>
          <ul>
            <li>Modern E-commerce Interface</li>
            <li>Category Management</li>
            <li>Product Listings</li>
            <li>Inventory Management</li>
          </ul>
          <h2>AI-Powered Features</h2>
          <ul>
            <li>Smart Product Descriptions</li>
            <li>Photo Enhancement</li>
            <li>Batch Categorization</li>
            <li>OCR Text Recognition</li>
            <li>Object Detection</li>
            <li>Authentication Assistance</li>
          </ul>
          <h2>Supported Categories</h2>
          <ul>
            <li>Vintage Books</li>
            <li>Comic Books</li>
            <li>Fast Food Toys</li>
            <li>Star Wars Memorabilia</li>
            <li>Trading Cards</li>
            <li>Collectible Cards</li>
            <li>Sports Cards</li>
            <li>Photography Equipment</li>
            <li>Stamps</li>
            <li>Ephemera</li>
            <li>Coca-Cola Collectibles</li>
            <li>Board Games</li>
          </ul>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Recollected Treasures TX ©2023 Created by Your Name</Footer>
    </Layout>
  </Layout>
);

export default App;