import React from 'react';
import { Switch, Route } from 'react-router';
import routes from '../Settings/routes.json';
import App from './App';
//Routes
import Login from '../Screens/Login';
import Dashboard from '../Screens/Dashboard';

export default () => (
  <App>
    <Switch>
      <Route path={routes.LOGIN} component={Login} exact />
      {/** DASHBOARD **/}
      <Route path={routes.DASHBOARD.HOME} component={Dashboard} />
    </Switch>
  </App>
);
