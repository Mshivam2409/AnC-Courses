import { Form, Input, Button, message, Spin, Typography } from "antd";
import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import Axios, { AxiosError } from "axios";
import url from "utils/api";

const { Text } = Typography;

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const onFinish = (values: any) => {
    setLoading(true);
    Axios.post(url("signup"), {
      userName: values.username.trim(),
    })
      .then((resp) => {
        message.success(resp.data.message);
        setLoading(false);
      })

      .catch((error: AxiosError) => {
        message.error(error.response?.data.message || "Failed to Reach Server");
        setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Spin spinning={loading} tip={"Loading..."}>
      <Typography.Title level={3}>New User Registration</Typography.Title>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="IITK Username"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Submit
          </Button>
        </Form.Item>
        <Text type="secondary">
          An Email will sent to your IITK Email Id containing the password!
        </Text>
      </Form>
    </Spin>
  );
};

export default SignUpForm;
