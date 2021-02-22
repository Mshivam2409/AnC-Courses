// import userEvent from "@testing-library/user-event";
// import { Collapse, message, Result, Spin, Typography } from "antd";
import Collapse from "antd/lib/collapse";
import message from "antd/lib/message";
import Result from "antd/lib/result";
import Spin from "antd/lib/spin";
import Typography from "antd/lib/typography";

import Axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useRecoilValue, useResetRecoilState } from "recoil";
// import { IReview } from "types";

const Reviews = (props: { course: string }) => {
  const [reviews, setReviews] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    Axios.get<any, AxiosResponse<Array<any>>>(`getReviews/${props.course}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        setReviews(response.data);
        setLoading(false);
      })
      .catch((reason: AxiosError) => {
        message.error(
          reason.response?.data.message || "Failed to Reach Server"
        );

        setLoading(false);
        setError(true);
      });
  }, [props.course]);
  const { Panel } = Collapse;

  return (
    <Spin tip="Loading....." spinning={loading}>
      {!loading && (
        <Collapse accordion>
          {reviews.map((review) => {
            return (
              <Panel
                header={`${review.semester} Prof : ${review.instructor}`}
                key={review._id}
              >
                <Typography>
                  <ReactMarkdown children={review.grading} />
                </Typography>
              </Panel>
            );
          })}
        </Collapse>
      )}

      {!loading && reviews.length === 0 && (
        <Result
          title="There are no reviews!"
          // extra={
          // <Button type="primary" key="console">
          //   Go Console
          // </Button>
          // }
        />
      )}

      {error && (
        <Result
          status="warning"
          title="Failed to fetch reviews! Please check your network connection"
        />
      )}

      {/* {loading && (
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
      )} */}
    </Spin>
  );
};

export default Reviews;
