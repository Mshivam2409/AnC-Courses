import React from "react";
import ListCourse from "components/ListCourse";

const Search = () => {
  React.useEffect(() => {
    window.document.title = `Search | Courses | AnC`;
  });
  return <ListCourse />;
};

export default Search;
