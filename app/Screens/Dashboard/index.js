import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Switch, Route } from 'react-router';
import routes from '../../Settings/routes.json';
//Layout
import Templates from './Layout/Templates';
import Home from './Layout/Home';
import Bizcards from './Layout/Bizcards';
import Editor from './Layout/Editor';
import Settings from './Layout/Settings';

//Redux
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const SubRoutes = props => {
  return (
    <Switch>
      <Route path={routes.DASHBOARD.HOME} component={Home} exact />
      <Route path={routes.DASHBOARD.BIZCARDS} component={Bizcards} exact />
      <Route path={routes.DASHBOARD.SETTINGS} component={Settings} exact />
      //Templates
      <Route
        path={routes.DASHBOARD.TEMPLATES.HOME}
        component={Templates}
        exact
      />
      <Route
        path={routes.DASHBOARD.TEMPLATES.EDITOR}
        component={Editor}
        exact
      />
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
            onClick={e => props.push(routes.DASHBOARD.TEMPLATES.HOME)}
          >
            Templates
          </Menu.Item>
          <Menu.Item
            key="settings"
            onClick={e => props.push(routes.DASHBOARD.SETTINGS)}
          >
            Settings
          </Menu.Item>
        </Menu>
        <div>
          <Icon type="poweroff" />
        </div>
      </Header>
      <Layout>
        <SubRoutes />
      </Layout>
    </Layout>
  );
};

export default connect(state => ({}), { push })(Dashboard);
