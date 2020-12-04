import React, { useState } from "react";
import { DropzoneDialog } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { useRecoilState, useResetRecoilState } from "recoil";
import Store from "store";

const Dropzone = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [files, setFiles] = useRecoilState(Store.FilesToUpload);
  const resetFiles = useResetRecoilState(Store.FilesToUpload);

  const handleClose = () => {
    resetFiles();
    setOpen(false);
  };

  const handleSave = (files: File[]) => {
    setFiles(files);
    setOpen(false);
    if (files) {
      files.forEach((file) => {
        var objectURL = URL.createObjectURL(file);
        // arr.push(objectURL);
        // setArr(arr);
      });
      //   props.changeFile(arr);
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
        Upload Images
      </Button>
      <DropzoneDialog
        open={open}
        onSave={handleSave}
        acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={handleClose}
        dialogTitle={"Upload PDF/DOC Files"}
      />
    </div>
  );
};

export default Dropzone;
