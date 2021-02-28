import React from "react";
import { FormField, Message } from "@ory/kratos-client";
import { FORM_LABELS } from "../constants";
import { KratosMessages } from "components/KratosMessages";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { NavLink } from "react-router-dom";
import config from "config/kratos";

export const KratosForm = ({
  action,
  messages = [],
  fields,
  submitLabel = "Submit",
}: {
  action: string;
  messages?: Message[];
  fields: FormField[];
  submitLabel: string;
}) => {
  const fieldsSorted = sortFormFields({ fields });
  return (
    <React.Fragment>
      {action && (
        <div className="fieldset">
          {/* <ConfigProvider form={{validateMessages:messages}}> */}
          <Form
            {...layout}
            action={action}
            // style={{ margin: "60px 0" }}
            method="POST"
            onFinish={(values) => console.log(values)}
            initialValues={{ remember: true }}
            layout="vertical"
            className="fieldset"
            // style={{ marginBottom: 0 }}
          >
            {/* <Form {...layout}> */}
            <form
              action={action}
              // style={{ margin: "60px 0" }}
              method="POST"
            >
              <Form.Item style={{ marginBottom: 0 }}>
                <Typography>
                  <Typography.Title level={2} className="formtitle">
                    Login to Continue
                  </Typography.Title>
                </Typography>
              </Form.Item>
              <Form.Item>
                {!!messages?.length && <KratosMessages messages={messages} />}
              </Form.Item>
              {renderFormFields({ fields: fieldsSorted })}
              <Form.Item style={{ marginBottom: 0 }}>
                <NavLink
                  className="login-form-forgot"
                  to={config.routes.recovery.path}
                >
                  Forgot password?
                </NavLink>
              </Form.Item>

              <Form.Item style={{ marginBottom: 2, paddingBottom: 20 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ width: "100%" }}
                >
                  {submitLabel}
                </Button>
              </Form.Item>
            </form>
          </Form>
          {/* </ConfigProvider> */}
        </div>
      )}
    </React.Fragment>
  );
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const sortFormFields = ({ fields }: { fields: FormField[] }) => {
  return fields.sort((current, next) => {
    const c = FORM_LABELS[current.name]?.priority || 0;
    const n = FORM_LABELS[next.name]?.priority || 0;
    return n - c;
  });
};

const renderFormFields = ({ fields = [] }: { fields: FormField[] }) =>
  fields.map((field) => {
    const { name, type, required, value, messages = [] } = field;
    const _required = required ? { required } : {};
    const _label = FORM_LABELS[name]?.label;
    const style = type === "hidden" ? { display: "none" } : {};
    const textmsg = messages.map((message) => {
      return message.text;
    }) as Array<string>;
    return (
      <fieldset key={name} style={style}>
        <label>
          <Form.Item
            label={_label}
            validateStatus={messages.length === 0 ? "" : "error"}
            help={messages.length === 0 ? "" : "".concat(...textmsg)}
            style={{ marginBottom: 0 }}
          >
            {messages.map((message) => {
              return message.text;
            })}
            {/* {messages[0]} */}
            <Input
              type={type}
              name={name}
              defaultValue={value as any}
              {..._required}
              style={{ maxWidth: "100%", width: "100%" }}
            ></Input>
          </Form.Item>
          {/* {_label && <span>{_label}</span>} */}
        </label>
        <KratosMessages messages={messages} />
      </fieldset>
    );
  });
