import { message } from "antd";
import Loader from "components/Loader";
import Course from "pages/course";
import ErrorPage from "pages/error";
import React from "react";
import { graphql, QueryRenderer } from "react-relay";
import { useParams } from "react-router-dom";
import environment from "services/gqlenv";
import { CourseQuery } from "__generated__/CourseQuery.graphql";

const CourseContainer = () => {
  const { cid } = useParams<{ cid: string }>();
  return (
    <QueryRenderer<CourseQuery>
      environment={environment}
      query={graphql`
        query CourseQuery($cid: String! = "ESC101") {
          getCourseData(number: $cid) {
            course {
              title
              number
              credits
              offered
              contents
              author
              driveFiles
              id
              dept
            }
            reviews {
              id
              semester
              instructor
              grading
            }
          }
        }
      `}
      variables={{ cid }}
      render={({ error, props }) => {
        if (error) {
          // error.name
          message.error("Unable to fetch Data!");
          return <ErrorPage id={500} />;
        }
        if (!props) {
          return <Loader />;
        }
        return <Course courseData={props.getCourseData} />;
      }}
    />
  );
};

export default CourseContainer;
