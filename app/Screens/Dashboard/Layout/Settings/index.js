import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Button, Modal } from 'antd';

//Redux
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { logoutAction } from '../../../../Redux/actions/auth';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const Settings = props => {
  function exit() {
    Modal.confirm({
      onOk: () => {
        props.logoutAction();
        Modal.destroyAll();
      },
      title: 'Are you sure you want to log-off?'
    });
  }
  return (
    <Layout className="Templates">
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Settings</Breadcrumb.Item>
        </Breadcrumb>
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '80%' }}
            >
              <Menu.ItemGroup title="Editor">
                <Menu.Item key="general">General</Menu.Item>
                <Menu.Item key="language">Language</Menu.Item>
              </Menu.ItemGroup>
            </Menu>
            <div className="btn-container">
              <Button type="danger" onClick={exit}>
                Log Out <Icon type="poweroff" />
              </Button>
            </div>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            Content
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default connect(state => ({}), { push, logoutAction })(Settings);
