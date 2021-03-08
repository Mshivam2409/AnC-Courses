import "react-markdown-editor-lite/lib/index.css";

import AddCourseMutation from "actions/AddCourseMutation";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Steps,
} from "antd";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import MdEditor from "react-markdown-editor-lite";
import environment from "services/gqlenv";

import { depts } from "../constants";

function renderHTML(text: string) {
  return React.createElement(ReactMarkdown, {
    source: text,
  });
}

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const RegistrationForm = () => {
  const [form] = Form.useForm();
  const [contents, setContents] = useState<string>("");

  const onFinish = (values: {
    agreement: boolean;
    captcha: string;
    credits: string;
    dept: string;
    number: string;
    prefix: string;
    semester: string;
    title: string;
  }) => {
    const { credits, dept, number, title, semester, prefix } = values;
    console.log("Received values of form: ", values);
    AddCourseMutation.commit(environment, {
      credits,
      dept,
      title,
      number: `${prefix}${number}`,
      offered: semester,
      contents: contents,
      author: "",
    });
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        {depts.map((dept) => {
          return (
            <Option value={dept} key="dept">
              {dept}
            </Option>
          );
        })}
      </Select>
    </Form.Item>
  );

  return (
    <Form
      layout="vertical"
      {...formItemLayout}
      form={form}
      name="courser"
      onFinish={onFinish}
      initialValues={{
        residence: ["zhejiang", "hangzhou", "xihu"],
        prefix: "EE",
      }}
      scrollToFirstError
    >
      <Form.Item
        name="number"
        label="Course Number"
        rules={[
          {
            type: "string",
            message: "Invalid Course Number found!",
          },
          {
            required: true,
            message: "Please enter the Course Number!",
          },
        ]}
        hasFeedback
      >
        <Input addonBefore={prefixSelector} />
      </Form.Item>

      <Form.Item
        name="dept"
        label="Course Department"
        rules={[
          {
            required: true,
            message: "Please input the department!",
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="credits"
        label="Course Credits"
        // dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please enter the course credits!",
          },
          () => ({
            validator(_, value) {
              if (!value || (parseInt(value) >= 0 && parseInt(value) <= 15)) {
                return Promise.resolve();
              }
              return Promise.reject("Please input valid course credits!");
            },
          }),
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="semester"
        label="Course semester"
        rules={[
          {
            type: "string",
            required: true,
            message: "Please select course semester!",
          },
        ]}
      >
        <Select placeholder="Please select a semester">
          <Option value={"Odd"}>Odd</Option>
          <Option value={"Even"}>Even</Option>
          <Option value={"Odd & Even"}>Odd and Even</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: "Please input website!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Captcha"
        extra="We must make sure that your are a human."
      >
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="captcha"
              noStyle
              rules={[
                {
                  required: true,
                  message: "Please input the captcha you got!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button>Get captcha</Button>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item>
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={renderHTML}
          onChange={(data) => setContents(data.text)}
        />
      </Form.Item>
      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject("Should accept agreement"),
          },
        ]}
      >
        <Checkbox>I have read and verified the information.</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit Course
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
