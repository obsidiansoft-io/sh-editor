import React from 'react';
import { Switch, Route } from 'react-router';
import routes from '../Settings/routes.json';
import App from './App';
//Routes
import HomePage from '../Screens/Home';
import Login from '../Screens/Login';
import Dashboard from '../Screens/Dashboard';

export default () => (
  <App>
    <Switch>
      <Route path={routes.HOME} component={HomePage} />
      <Route path={routes.LOGIN} component={Login} exact/>
      <Route path={routes.DASHBOARD} component={Dashboard} />
    </Switch>
  </App>
);
