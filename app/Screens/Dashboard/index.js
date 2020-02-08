import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Switch, Route } from 'react-router';
import routes from '../../Settings/routes.json';
//Layout
import Templates from './Layout/Templates';
import Home from './Layout/Home';
import Bizcards from './Layout/Bizcards';
import Editor from './Layout/Editor';

//Redux
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const SubRoutes = props => {
  return (
    <Switch>
      <Route path={routes.DASHBOARD.HOME} component={Home} exact />
      <Route path={routes.DASHBOARD.TEMPLATES} component={Editor} exact />
      <Route path={routes.DASHBOARD.BIZCARDS} component={Bizcards} exact />
    </Switch>
  );
};

const Dashboard = props => {
  return (
    <Layout className="dashboard">
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['home']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item
            key="home"
            onClick={e => props.push(routes.DASHBOARD.HOME)}
          >
            Home
          </Menu.Item>
          <Menu.Item
            key="bizcards"
            onClick={e => props.push(routes.DASHBOARD.BIZCARDS)}
          >
            Bizcards
          </Menu.Item>
          <Menu.Item
            key="templates"
            onClick={e => props.push(routes.DASHBOARD.TEMPLATES)}
          >
            Templates
          </Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <SubRoutes />
      </Layout>
    </Layout>
  );
};

export default connect(state => ({}), { push })(Dashboard);
