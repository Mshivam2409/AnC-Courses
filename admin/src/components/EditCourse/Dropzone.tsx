import React, { useState } from "react";
import Axios from "axios";
import { DropzoneDialog } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import Store from "store";
import urlBackend from "config/api";

const Dropzone = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [files, setFiles] = useRecoilState(Store.FilesToUpload);
  const resetFiles = useResetRecoilState(Store.FilesToUpload);
  const cid = useRecoilValue(Store.CurrentCourse).id;
  const token = useRecoilValue(Store.User).token;
  const handleClose = () => {
    resetFiles();
    setOpen(false);
  };

  const handleSave = (files: File[]) => {
    setFiles(files);
    setOpen(false);
    const data = new FormData();
    files.forEach((file) => data.append(file.name, file));
    data.append("cid", cid);
    if (files) {
      Axios.post(urlBackend("secure/addFiles"), data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => console.log(resp))
        .catch((error) => console.log(error));
    }
  };

  const handleOpen = () => {
    setOpen(true);
    // setArr([]);
  };

  return (
    <div>
      {/* <div className="form-group multi-preview">
        {(arr || []).map((url) => (
          <img src={url} alt="..." width="200" height="100" border="3" />
        ))}
      </div> */}
      <Button
        variant="contained"
        color="primary"
        component="span"
        startIcon={<CloudUploadIcon />}
        onClick={handleOpen}
      >
        Upload Files
      </Button>
      <DropzoneDialog
        open={open}
        onSave={handleSave}
        acceptedFiles={[
          "application/pdf",
          "application/msword",
          "application/vnd.ms-powerpoint",
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          "application/vnd.rar",
          "application/zip",
        ]}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={handleClose}
        dialogTitle={"Upload PDF/DOC/PPT/PPTX/RAR/ZIP Files"}
      />
    </div>
  );
};

export default Dropzone;
