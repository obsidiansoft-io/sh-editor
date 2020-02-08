import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const Bizcards = props => {
  return (
    <Layout className="Home">
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Bizcards</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 280,
            color: '#000'
          }}
        >
          Coming Soon
        </Content>
      </Layout>
    </Layout>
  );
};

export default Bizcards;
