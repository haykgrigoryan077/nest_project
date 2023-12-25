import React from 'react';
import { Button, Form, Input } from 'antd';
import { setUser } from '../../store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { authorizationTypes } from '../../types';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_PREFIX } from '../../store/services/api';
import { useNavigate } from 'react-router-dom';

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const response: any = await axios.post(`${API_PREFIX}auth/login`, values);
      dispatch(
        setUser({
          isAuthenticated: authorizationTypes.AUTHORIZED
        })
      );
      localStorage.setItem('access_token', response.data.access_token as string);
      navigate('/home');
    } catch (error) {
      toast.error('Login or Password is incorrect');
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" onClick={form.submit}>
          Submit
        </Button>
      </Form.Item>
      <div>Don't have account</div>
      <div onClick={() => navigate('/register')} style={{ color: 'blue', cursor: 'pointer' }}>
        Register
      </div>
    </Form>
  );
};

export default Login;
