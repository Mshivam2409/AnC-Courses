import { SearchCoursesQuery } from "__generated__/SearchCoursesQuery.graphql";
import { Card, Col, Result, Row } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";

const ListCourse = (props: {
  courseList: SearchCoursesQuery["response"]["searchCourses"];
}) => {
  return (
    <Row justify="center">
      <Col xs={24} md={12}>
        {props.courseList.map((course) => {
          return (
            <Card
              type="inner"
              title={course.number}
              extra={<NavLink to={`/course/${course.number}`}>More</NavLink>}
              style={{ marginTop: "4vh" }}
            >
              {`${course.title} ${course.credits}`}
            </Card>
          );
        })}
        {props.courseList.length === 0 && <Result title="No Courses found!" />}
      </Col>
    </Row>
  );
};

export default ListCourse;
