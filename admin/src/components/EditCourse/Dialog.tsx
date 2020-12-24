import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { NavLink } from "react-router-dom";

export default function EditDialog() {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            label="Email Address"
            type="email"
            fullWidth
            onChange={(e) => setText(e.currentTarget.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <NavLink to={`/edit/${text.trim().toUpperCase()}`}>
            <Button onClick={handleClose} color="primary">
              Edit
            </Button>
          </NavLink>
        </DialogActions>
      </Dialog>
    </>
  );
}
