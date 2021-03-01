import { message } from "antd";
import ListCourse from "components/ListCourse";
import Loader from "components/Loader";
import Course from "pages/course";
import ErrorPage from "pages/error";
import Search from "pages/search";
import React, { useState } from "react";
import { graphql, QueryRenderer } from "react-relay";
import { useParams } from "react-router-dom";
import environment from "services/gqlenv";
import { useDebounce } from "use-debounce/lib";
import { SearchCoursesQuery } from "__generated__/SearchCoursesQuery.graphql";

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
