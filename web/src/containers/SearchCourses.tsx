import { SearchCoursesQuery } from "__generated__/SearchCoursesQuery.graphql";
import { message } from "antd";
import ListCourse from "components/ListCourse";
import Loader from "components/Loader";
import ErrorPage from "pages/error";
import React, { useState } from "react";
import { graphql, QueryRenderer } from "react-relay";
import environment from "services/gqlenv";

const SearchCoursesContainer = (props: { params: string }) => {
  return (
    <QueryRenderer<SearchCoursesQuery>
      environment={environment}
      query={graphql`
        query SearchCoursesQuery($params: SearchParams!) {
          searchCourses(params: $params) {
            id
            title
            number
            credits
          }
        }
      `}
      variables={{ params: { identifier: props.params } }}
      render={({ error, props }) => {
        if (error) {
          // error.name
          message.error("Unable to fetch Data!");
          return <ErrorPage id={500} />;
        }
        if (!props) {
          return <Loader />;
        }
        return <ListCourse courseList={props.searchCourses} />;
      }}
    />
  );
};

export default SearchCoursesContainer;
