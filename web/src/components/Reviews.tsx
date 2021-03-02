import { CourseQueryResponse } from "__generated__/CourseQuery.graphql";
import Collapse from "antd/lib/collapse";
import Typography from "antd/lib/typography";
import { Fragment, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "antd";
import ModifyReviewMutation from "actions/ModifyReviewMutation";
import environment from "services/gqlenv";
const Reviews = (props: {
  reviews: CourseQueryResponse["getCourseData"]["reviews"];
}) => {
  const { Panel } = Collapse;
  const { reviews } = props;
  return (
    <Fragment>
      <Collapse accordion>
        {reviews.map((review, index) => {
          return (
            <Panel
              header={`${review.semester} Prof : ${review.instructor}`}
              key={review.id}
              extra={
                <Button
                  onClick={(e) => {
                    ModifyReviewMutation.commit(
                      environment,
                      review.id,
                      !review.approved
                      //   setReview
                    );
                  }}
                >
                  {review.approved === true ? "Takedown" : "Approve"}
                </Button>
              }
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

// const ReviewContainer = (props: {
//   data: {
//     readonly id: string;
//     readonly semester: string;
//     readonly instructor: string;
//     readonly grading: string;
//     readonly approved: boolean;
//   };
// }) => {
//   const [review, setReview] = useState(props.data);
//   const { Panel } = Collapse;
//   return (
//     <Panel
//       header={`${review.semester} Prof : ${review.instructor}`}
//       key={review.id}
//       extra={
//         <Button
//           onClick={(e) => {
//             ModifyReviewMutation.commit(
//               environment,
//               review.id,
//               !review.approved,
//               setReview
//             );
//           }}
//         >
//           Approve
//         </Button>
//       }
//     >
//       <Typography>
//         <ReactMarkdown children={review.grading} />
//       </Typography>
//     </Panel>
//   );
// };

export default Reviews;
