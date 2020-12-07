import React, { useEffect, useState } from "react";
import {
  PageHeader,
  Tabs,
  Button,
  Statistic,
  Descriptions,
  Typography,
  Divider,
} from "antd";
import Axios, { AxiosError, AxiosResponse } from "axios";
import Reviews from "components/Reviews";
import { useHistory, useParams } from "react-router-dom";
import url from "utils/api";
import { ICourse } from "types";
import ReactMarkdown from 'react-markdown'

const { TabPane } = Tabs;

const Course = () => {
  const route: any = useParams();
  const history = useHistory();
  const [course, setCourse] = useState<ICourse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    Axios.get<any, AxiosResponse<ICourse>>(url(`getCourse/${route.cid}`), {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        setCourse(response.data);
        setLoading(false);
        console.log(response);
      })
      .catch((reason: AxiosError) => {
        if (reason.response) history.push(`/error/${reason.response?.status}`);
        else history.push(`/error/${500}`);
      });
  }, [route.cid]);

  return (
    <PageHeader
      className="site-page-header-responsive"
      onBack={() => window.history.back()}
      title={`${course?.number}   ${course?.title}`}
      extra={
        [
          // <Button key="3">Operation</Button>,
          // <Button key="2">Operation</Button>,
          // <Button key="1" type="primary">
          //   Primary
          // </Button>,
        ]
      }
      footer={
        <Tabs defaultActiveKey="1">
          <TabPane tab="Details" key="1">
            <Divider />
            <Typography> <ReactMarkdown children={course?.contents as string}/> </Typography>
          </TabPane>
          <TabPane tab="Reviews" key="2">
            <Reviews course={route.cid} />
          </TabPane>
          <TabPane tab="Files" key="3" />
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
                {course?.author}
              </a>
            </Descriptions.Item>
            <Descriptions.Item label="Department">{course?.dept}</Descriptions.Item>
            <Descriptions.Item label="Offered as">
              OE,ESO
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
              value={course?.credits}
              style={{
                marginRight: 32,
              }}
            />
            <Statistic title="Offered" value={course?.offered} />
          </div>
        </div>
      </div>
    </PageHeader>
  );
};

export default Course;
