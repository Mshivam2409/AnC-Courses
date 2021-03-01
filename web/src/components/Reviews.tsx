// import userEvent from "@testing-library/user-event";
// import { Collapse, message, Result, Spin, Typography } from "antd";
import { CourseQueryResponse } from "__generated__/CourseQuery.graphql";
import Collapse from "antd/lib/collapse";
import Typography from "antd/lib/typography";
import { Fragment } from "react";
import ReactMarkdown from "react-markdown";

// import { IReview } from "types";

const Reviews = (props: {
  reviews: CourseQueryResponse["getCourseData"]["reviews"];
}) => {
  const { Panel } = Collapse;
  const { reviews } = props;
  return (
    // <Spin tip="Loading....." spinning={loading}>

    <Fragment>
      {/* <CollectionsPage /> */}
      <Collapse accordion>
        {reviews.map((review) => {
          return (
            <Panel
              header={`${review.semester} Prof : ${review.instructor}`}
              key={review.id}
            >
              <Typography>
                <ReactMarkdown children={review.grading} />
              </Typography>
            </Panel>
          );
        })}
      </Collapse>
    </Fragment>
    // )}

    // {!loading && reviews.length === 0 && (
    //   <Result
    //     title="There are no reviews!"
    //     // extra={
    //     // <Button type="primary" key="console">
    //     //   Go Console
    //     // </Button>
    //     // }
    //   />
    // )}

    // {error && (
    //   <Result
    //     status="warning"
    //     title="Failed to fetch reviews! Please check your network connection"
    //   />
    // )}

    // {/* {loading && (
    // <div
    //   style={{
    //     justifyItems: "center",
    //     alignSelf: "center",
    //     alignItems: "center",
    //     textAlign: "center",
    //   }}
    // >
    //   <Spin tip="Loading....." />
    // </div>
    // )} */}
    // </Spin>
  );
};

export default Reviews;
