import React from 'react';
import { Input, Button } from 'antd';

import SharaImg from '../../Images/logoShara.png';

const Login = props => {
  return (
    <div className="login">
      <div className="login-form">
        <img src={SharaImg} className="logo" style={{ width: 300 }} />
        <Input placeholder="Email" />
        <Input placeholder="Password" type="password" />
        <Button type="primary">Login</Button>
      </div>
    </div>
  );
};

export default Login;
