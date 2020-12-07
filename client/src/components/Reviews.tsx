import { Collapse, Result, Spin } from "antd";
import Axios, { AxiosResponse } from "axios";
import { Fragment, useState } from "react";
import { useEffect } from "react";
import { IReview } from "types";
import url from "utils/api";

const Reviews = (props: { course: string }) => {
  const [reviews, setReviews] = useState<Array<IReview>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    Axios.get<any, AxiosResponse<Array<IReview>>>(
      url(`getReviews/${props.course}`),
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((response) => {
        setReviews(response.data);
        setLoading(false);
        console.log(response);
      })
      .catch((reason) => {
        console.log(reason);
        setLoading(false);
        setError(true);
      });
  }, [props.course]);
  const { Panel } = Collapse;

  return (
    <Fragment>
      {!loading && (
        <Collapse accordion>
          {reviews.map((review) => {
            return (
              <Panel
                header={`${review.semester} Prof : ${review.instructor}`}
                key={review._id}
              >
                <p>{review.grading}</p>
              </Panel>
            );
          })}
        </Collapse>
      )}

      {!loading && reviews.length === 0 && (
        <Result
          title="There are no reviews!"
          // extra={
          //   <Button type="primary" key="console">
          //     Go Console
          //   </Button>
          // }
        />
      )}

      {error && (
        <Result
          status="warning"
          title="Failed to fetch reviews! Please check your network connection"
        />
      )}

      {loading && (
        <div
          style={{
            justifyItems: "center",
            alignSelf: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Spin tip="Loading....." />
        </div>
      )}
    </Fragment>
  );
};

export default Reviews;
