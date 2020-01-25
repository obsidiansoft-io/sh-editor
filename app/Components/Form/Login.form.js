import React, { useState, useEffect } from 'react';
import { Input, Button, Form } from 'antd';
import SharaImg from '../../Images/logoShara.png';

import { login } from '../../Services/Api';

const LoginForm = props => {
  const { getFieldDecorator } = props.form;
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    await props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          setLoading(true);
          await login(values).then(() => {
            setLoading(false);
          });
        } catch (error) {
          setLoading(false);
        }
      }
    });
  }
  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <img src={SharaImg} className="logo" style={{ width: 300 }} />
      <Form.Item>
        <span className="label-input">Username</span>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Please input your username!' }]
        })(<Input />)}
      </Form.Item>
      <Form.Item>
        <span className="label-input">Password</span>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }]
        })(<Input.Password type="password" />)}
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="login-btn"
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Form.create({ name: 'edufarm_login' })(LoginForm);
