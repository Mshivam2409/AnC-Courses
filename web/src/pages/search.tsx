import React, { SetStateAction, useEffect, useState } from "react";
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
import { NavLink } from "react-router-dom";
import { SearchCoursesQuery } from "__generated__/SearchCoursesQuery.graphql";
import { Dispatch } from "react";
import { depts } from "../constants";
import { useDebounce } from "use-debounce/lib";
import SearchCoursesContainer from "containers/SearchCourses";

const Search = () => {
  const [text, setText] = useState<string>("");
  const [dept, setDept] = useState<string>("");
  const [params, setParams] = useState<string>("");
  const [dparam] = useDebounce(params, 500);
  useEffect(() => {
    setParams(`${dept}${text}`);
  }, [text, dept]);
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
                    return (
                      <Select.Option value={dept} key={dept}>
                        {dept}
                      </Select.Option>
                    );
                  })}
                </Select>
                <Input
                  style={{ width: "70%" }}
                  placeholder="Course Code"
                  //   options={courseList.map((course) => {
                  //     return {
                  //       value:
                  //         course.number.replace(/\D/g, "") +
                  //         (isNaN(
                  //           parseInt(course.number[course.number.length - 1])
                  //         )
                  //           ? course.number[course.number.length - 1]
                  //           : ""),
                  //     };
                  //   })}
                  allowClear
                  value={text}
                  onChange={(e) => setText(e.currentTarget.value)}
                />
              </Input.Group>
            </Col>
          </Row>
          <SearchCoursesContainer params={dparam} />
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default Search;
