import Axios, { AxiosResponse } from "axios";
import urlBackend from "config/api";
import React, { useEffect } from "react";
import EditCourse from "components/EditCourse";
import { useHistory, useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import Store from "store";
import { IBCourse } from "types";

const EditCoursePage = () => {
  const params: { cid: string } = useParams();
  const history = useHistory();
  const setCourse = useSetRecoilState(Store.CurrentCourse);
  const setLoading = useSetRecoilState(Store.Loading);
  useEffect(() => {
    setLoading(true);
    Axios.get<any, AxiosResponse<IBCourse>>(
      urlBackend(`getCourse/${params.cid.toUpperCase()}`)
    )
      .then((resp) => {
        setCourse(resp.data);
      })
      .catch((error) => {
        // history.push("/404");
      });
    setLoading(false);
  }, [params]);
  return <EditCourse />;
};

export default EditCoursePage;
