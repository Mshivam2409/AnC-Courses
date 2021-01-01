import Axios, { AxiosResponse } from "axios";
import urlBackend from "config/api";
import React, { useEffect } from "react";
import EditCourse from "components/EditCourse";
import { useHistory, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Store from "store";
import { IBCourse } from "types";

const EditCoursePage = () => {
  const params: { cid: string } = useParams();
  const history = useHistory();
  const setCourse = useSetRecoilState(Store.CurrentCourse);
  const setLoading = useSetRecoilState(Store.Loading);
  const token = useRecoilValue(Store.User).token;
  useEffect(() => {
    setLoading(true);
    Axios.get<any, AxiosResponse<IBCourse>>(
      urlBackend(`secure/getCourse/${params.cid.toUpperCase()}`),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((resp) => {
        setCourse(resp.data);
      })
      .catch((error) => {
        history.push("/404");
      });
    setLoading(false);
  }, [params]);
  return <EditCourse />;
};

export default EditCoursePage;
