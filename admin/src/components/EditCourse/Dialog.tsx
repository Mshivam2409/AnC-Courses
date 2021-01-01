import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useHistory } from "react-router-dom";
import Axios, { AxiosResponse } from "axios";
import urlBackend from "config/api";
import { IBCourse } from "types";

export default function EditDialog() {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("");
  const [error, setError] = React.useState(false);
  const history = useHistory();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    Axios.get(urlBackend(`search/${text.trim().toUpperCase()}`)).then(
      (resp: AxiosResponse<IBCourse[]>) => {
        if (resp.data.length === 1) {
          history.push(`/edit/${resp.data[0].number}`);
        } else {
          setError(true);
        }
      }
    );
  };

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        fullWidth
      >
        Open form dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Select Course</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the code of course you want to edit.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Course Code"
            fullWidth
            onChange={(e) => setText(e.currentTarget.value)}
            error={error}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>

          <Button onClick={handleClose} color="primary">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
