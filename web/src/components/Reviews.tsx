import { CourseQueryResponse } from "__generated__/CourseQuery.graphql";
import Collapse from "antd/lib/collapse";
import Typography from "antd/lib/typography";
import { Fragment } from "react";
import ReactMarkdown from "react-markdown";

const Reviews = (props: {
  reviews: CourseQueryResponse["getCourseData"]["reviews"];
}) => {
  const { Panel } = Collapse;
  const { reviews } = props;
  return (
    <Fragment>
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
  );
};

export default Reviews;
