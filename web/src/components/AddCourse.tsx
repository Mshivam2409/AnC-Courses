import { Steps, Button, message } from "antd";
// import React from "react";

import React, { useState } from "react";
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  //   Button,
  AutoComplete,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import MdEditor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
// import MarkdownIt from "markdown-it";
import { depts } from "../constants";
// const mdParser = new MarkdownIt(/* Markdown-it options */);

function renderHTML(text: string) {
  // Using markdown-it
  //   return mdParser.render(text);
  // Using react-markdown
  return React.createElement(ReactMarkdown, {
    source: text,
  });
}

const { Option } = Select;
const { Step } = Steps;
const residences = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];

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
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegistrationForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
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

  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

  const onWebsiteChange = (value: string) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  return (
    <Form
      layout="vertical"
      {...formItemLayout}
      form={form}
      name="register"
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

      {/* <Form.Item
        name="nickname"
        label={
          <span>
            Nickname&nbsp;
            <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: "Please input your nickname!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item> */}

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

      {/* <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: "Please input your phone number!" }]}
      >
        <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
      </Form.Item> */}

      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: "Please input website!" }]}
      >
        {/* <AutoComplete
          options={websiteOptions}
          onChange={onWebsiteChange}
          placeholder="website"
        > */}
        <Input />
        {/* </AutoComplete> */}
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
        <MdEditor style={{ height: "500px" }} renderHTML={renderHTML} />
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
