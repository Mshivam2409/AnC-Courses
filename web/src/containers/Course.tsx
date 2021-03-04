import { CourseQuery } from "__generated__/CourseQuery.graphql";
import { message } from "antd";
import Loader from "components/Loader";
import Course from "pages/course";
import ErrorPage from "pages/error";
import React from "react";
import { graphql, QueryRenderer } from "react-relay";
import { useParams } from "react-router-dom";
import environment from "services/gqlenv";

const CourseContainer = () => {
  const { cid } = useParams<{ cid: string }>();
  return (
    <QueryRenderer<CourseQuery>
      environment={environment}
      query={graphql`
        query CourseQuery($cid: String!) {
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
              approved
            }
          }
        }
      `}
      variables={{ cid }}
      render={({ error, props }) => {
        if (error) {
          message.error("Unable to fetch Data!");
          return <ErrorPage id={500} />;
        }
        if (!props) {
          return <Loader />;
        } else {
          return <Course courseData={props.getCourseData} />;
        }
      }}
    />
  );
};

export default CourseContainer;
