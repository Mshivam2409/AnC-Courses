import { CourseQueryResponse } from "__generated__/CourseQuery.graphql";
import {
  Descriptions,
  Divider,
  PageHeader,
  Statistic,
  Tabs,
  Typography,
} from "antd";
import CollectionsPage from "components/AddReview";
import Commento from "components/Commento";
import Files from "components/Files";
import Reviews from "components/Reviews";
import React from "react";
import ReactMarkdown from "react-markdown";

// import url from "utils/api";
// import { ICourse } from "types";
const { TabPane } = Tabs;

const Course = (props: {
  courseData: CourseQueryResponse["getCourseData"];
}) => {
  const { course, reviews } = props.courseData;
  return (
    <PageHeader
      className="site-page-header-responsive"
      onBack={() => window.history.back()}
      title={`${course?.number || " "}   ${course?.title || " "}`}
      extra={
        [
          // <Button key="3">Operation</Button>,
          // <Button key="2">Operation</Button>,
          // <Button key="1" type="primary">
          //   Mookit
          // </Button>,
        ]
      }
      footer={
        <Tabs defaultActiveKey="1">
          <TabPane tab="Details" key="1">
            <Divider />
            <Typography>
              {" "}
              <ReactMarkdown children={course?.contents || ""} />{" "}
            </Typography>
          </TabPane>
          <TabPane tab="Reviews" key="2">
            <Reviews reviews={reviews} />
          </TabPane>
          <TabPane tab="Files" key="3">
            <Files files={course?.driveFiles || []} />
          </TabPane>
          <TabPane tab="Discussions" key="4">
            <Commento id={course.id} />
          </TabPane>
        </Tabs>
      }
    >
      <div className="content">
        <div className="main">
          {" "}
          <Descriptions size="small" column={1}>
            {/* <Descriptions.Item label="Created">Lili Qu</Descriptions.Item> */}
            <Descriptions.Item label="Compiled By">
              <a href="#home" onClick={(e) => e.preventDefault()}>
                {course?.author || ""}
              </a>
            </Descriptions.Item>
            <Descriptions.Item label="Department">
              {course?.dept}
            </Descriptions.Item>
            <Descriptions.Item label="Offered as">
              {course?.offered}
            </Descriptions.Item>
          </Descriptions>
        </div>
        <div className="extra">
          {" "}
          <div
            style={{
              display: "flex",
              width: "max-content",
              justifyContent: "flex-end",
            }}
          >
            <Statistic
              title="Credits"
              value={course?.credits || ""}
              style={{
                marginRight: 32,
              }}
            />
            <Statistic title="Offered" value={course?.offered || ""} />
          </div>
        </div>
        <Descriptions.Item>
          <CollectionsPage />
        </Descriptions.Item>
      </div>
    </PageHeader>
  );
};

export default Course;
