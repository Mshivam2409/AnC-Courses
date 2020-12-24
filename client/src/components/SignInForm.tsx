import { Form, Input, Button, Checkbox, Spin, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "assets/css/login.css";
import Axios, { AxiosError } from "axios";
import url from "utils/api";
import { useSetRecoilState } from "recoil";
import { UserState } from "store";
import { NavLink, useHistory } from "react-router-dom";
import { useState } from "react";

const LoginForm = () => {
  const setUser = useSetRecoilState(UserState);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const onFinish = (values: any) => {
    setLoading(true);
    Axios.post(url("signin"), {
      userName: values.username.trim(),
      password: values.password.trim(),
    })
      .then((resp) => {
        setUser({
          username: values.username.trim(),
          token: resp.data.token,
          loggedIn: true,
        });
        localStorage.setItem('anc-courses',JSON.stringify({
          username: values.username.trim(),
          token: resp.data.token,
          loggedIn: true,
          expireTime:Date.now()+10440000
        }))
        message.success("Logged In Successfully");
        setLoading(false);
        history.push("search");
      })
      .catch((error: AxiosError) => {
        message.error(error.response?.data.message || "Failed to Reach Server");
        setLoading(false);
      });
  };

  return (
    <Spin spinning={loading} tip={"Loading..."}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          <NavLink className="login-form-forgot" to="signup">
           New User? Register Here!
          </NavLink>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default LoginForm;
