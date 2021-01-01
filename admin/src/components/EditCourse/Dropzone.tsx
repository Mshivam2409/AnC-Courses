import React, { useState } from "react";
import Axios from "axios";
import { DropzoneDialog } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { useSetRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Store from "store";
import urlBackend from "config/api";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Dropzone = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [opent, setOpenT] = React.useState(false);
  const setFiles = useSetRecoilState(Store.FilesToUpload);
  const [message, setMessage] = React.useState("success");
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
        .then((resp) => {
          setOpenT(true);
          setMessage("success");
        })
        .catch((error) => {
          setOpenT(true);
          setMessage("error");
        });
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseT = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenT(false);
  };

  return (
    <div>
      <Snackbar open={opent} autoHideDuration={6000} onClose={handleCloseT}>
        <Alert onClose={handleCloseT} severity={message as any}>
          {message === "success"
            ? "Files have been added! They will appear after processing!"
            : "Error! Failed to add files!"}
        </Alert>
      </Snackbar>
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
        dialogTitle={"Upload Files(upto 3)"}
      />
    </div>
  );
};

export default Dropzone;
