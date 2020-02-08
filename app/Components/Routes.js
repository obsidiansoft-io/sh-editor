import React from 'react';
import { Switch, Route } from 'react-router';
import routes from '../Settings/routes.json';
import App from './App';
//Routes
import Login from '../Screens/Login';
import Dashboard from '../Screens/Dashboard';
import ProtectedRoute from './ProtectedRoute';

import { connect } from 'react-redux';

const Routes = props => {
  return (
    <App>
      <Switch>
        <Route path={routes.LOGIN} component={Login} exact />
        {/** DASHBOARD **/}
        <ProtectedRoute
          path={routes.DASHBOARD.HOME}
          component={Dashboard}
          token={props.token}
        />
      </Switch>
    </App>
  );
};

export default connect(state => ({ token: state.auth.token }), {})(Routes);
