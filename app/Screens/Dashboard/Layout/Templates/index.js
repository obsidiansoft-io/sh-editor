import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';

//Redux
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const Templates = props => {
  function createNew() {
    props.push('/dashboard/templates/editor');
  }
  return (
    <Layout className="Templates">
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['Local']}
          defaultOpenKeys={['my-templates']}
          style={{ height: '80%', borderRight: 0 }}
        >
          <Menu.ItemGroup title="My Templates">
            <Menu.Item key="Local">Local</Menu.Item>
            <Menu.Item key="Published" disabled>
              Published
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu>
        <div className="btn-container">
          <Button type="primary" onClick={createNew}>
            Create new
          </Button>
        </div>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Templates</Breadcrumb.Item>
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
          No templates
        </Content>
      </Layout>
    </Layout>
  );
};

export default connect(state => ({}), { push })(Templates);
