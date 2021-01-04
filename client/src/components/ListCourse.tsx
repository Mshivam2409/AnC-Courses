import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import {
  Input,
  Select,
  AutoComplete,
  Layout,
  Row,
  Col,
  Card,
  Result,
  message,
} from "antd";
import { ICourse } from "types";
import Axios, { AxiosError, AxiosResponse } from "axios";
import url from "utils/api";
import { NavLink } from "react-router-dom";

const depts = ["AE","ART", "BSE", "CE", "CHE", "CHM", "CS","DES","ECO","EE","EEM","ENG","ES","ESC","ESO","IME","PHY","LIF","LT","MBA","ME","MSE","MSO","MTH","NT","PHI","PHY","PSY","SE","SOC","TA"];
const ListCourse = () => {
  const [text, setText] = useState<string>("");
  const [dept, setDept] = useState<string>("");
  const [courseList, setCourseList] = useState<Array<ICourse>>([]);
  const [debouncedText] = useDebounce(text, 500);
  useEffect(() => {
    if (dept !== "")
      Axios.get<any, AxiosResponse<Array<ICourse>>>(
        url(`search/${dept}${debouncedText}`)
      )
        .then((response) => {
          setCourseList(response.data);
        })
        .catch((reason: AxiosError) => {
          message.error(
            reason.response?.data.message || "Failed to Reach Server"
          );
        });
  }, [dept, debouncedText]);
  return (
    <Layout style={{ backgroundColor: "white", height: "100vh" }}>
      <Layout.Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64, marginBottom: 64 }}
      >
        <div className="site-input-group-wrapper">
          <Row justify="center">
            <Col xs={24} md={12}>
              <Input.Group compact>
                <Select
                  defaultValue="Dept."
                  style={{ width: "30%" }}
                  onChange={(e) => {
                    setDept(e);
                    setText("");
                  }}
                >
                  {depts.map((dept) => {
                    return <Select.Option value={dept}>{dept}</Select.Option>;
                  })}
                </Select>
                <AutoComplete
                  style={{ width: "70%" }}
                  placeholder="Course Code"
                  options={courseList.map((course) => {
                    return {
                      value:
                        course.number.replace(/\D/g, "") +
                        (isNaN(
                          parseInt(course.number[course.number.length - 1])
                        )
                          ? course.number[course.number.length - 1]
                          : ""),
                    };
                  })}
                  allowClear
                  value={text}
                  onChange={(e) => setText(e)}
                />
              </Input.Group>
            </Col>
          </Row>
          <Row justify="center">
            <Col xs={24} md={12}>
              {courseList.map((course) => {
                return (
                  <Card
                    type="inner"
                    title={course.number}
                    extra={
                      <NavLink to={`/course/${course.number}`}>More</NavLink>
                    }
                    style={{ marginTop: "4vh" }}
                  >
                    {`${course.title} ${course.credits}`}
                  </Card>
                );
              })}
              {courseList.length === 0 && <Result title="No Courses found!" />}
            </Col>
          </Row>
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default ListCourse;
