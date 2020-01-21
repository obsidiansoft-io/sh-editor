import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './Settings/routes.json';
import App from './containers/App';
import HomePage from './Screens/Home';

export default () => (
  <App>
    <Switch>
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
