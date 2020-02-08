import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, token, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (token !== null && token !== '') {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: {
                  key: 'login'
                }
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
