import Axios, { AxiosResponse } from "axios";
import urlBackend from "config/api";
import React, { useEffect } from "react";
import EditCourse from "components/EditCourse";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import Store from "store";
import { IBCourse } from "types";

const EditCoursePage = () => {
  const params: { cid: string } = useParams();
  const setCourse = useSetRecoilState(Store.CurrentCourse);
  useEffect(() => {
    Axios.get<any, AxiosResponse<IBCourse>>(
      urlBackend(`getCourse/${params.cid.toUpperCase()}`)
    )
      .then((resp) => {
        setCourse(resp.data);
      })
      .catch((error) => {});
  }, [params]);
  return <EditCourse />;
};

export default EditCoursePage;
