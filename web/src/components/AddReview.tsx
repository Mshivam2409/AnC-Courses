import AddReviewMutation from "actions/AddReviewMutation";
import { Button, Cascader, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import environment from "services/gqlenv";

import { offerings } from "../constants";

interface Values {
  contents: string;
  semester: string[];
  instructor: string;
}

interface AddReviewFormProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const AddReviewForm: React.FC<AddReviewFormProps> = ({
  visible,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Submit a new review!"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        name="register"
        initialValues={{
          semester: ["20-21", "Odd"],
        }}
        scrollToFirstError
        layout="vertical"
      >
        <Form.Item
          name="instructor"
          label="Professor"
          rules={[
            {
              required: true,
              message: "Please input your instructor's name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="contents"
          label="Course Review"
          rules={[
            {
              required: true,
              message: "Please input the review!",
            },
          ]}
          hasFeedback
        >
          <Input.TextArea rows={10} />
        </Form.Item>

        <Form.Item
          name="semester"
          label="Semester"
          rules={[
            {
              type: "array",
              required: true,
              message:
                "Please select your the semester you studied the course!",
            },
          ]}
        >
          <Cascader options={offerings} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AddReview = () => {
  const [visible, setVisible] = useState(false);
  const { cid } = useParams<{ cid: string }>();

  const onCreate = async (values: Values) => {
    AddReviewMutation.commit(environment, {
      grading: values.contents,
      instructor: values.instructor,
      semester: " ".concat(values.semester[0], values.semester[1]),
      course: cid,
    });
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Add Review
      </Button>
      <AddReviewForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default AddReview;
