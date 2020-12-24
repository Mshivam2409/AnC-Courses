import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import ControlledEditor from "components/shared/Editor";
import { markdownToDraft } from "markdown-draft-js";
import Axios from "axios";
import urlBackend from "config/api";
import { useRecoilValue } from "recoil";
import Store from "store";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: "relative",
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  })
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditorDialog(props: any) {
  const classes = useStyles();
  const token = useRecoilValue(Store.User).token;
  const course = useRecoilValue(Store.CurrentCourse);

  const [state, setState] = React.useState({
    contents: markdownToDraft(props.text),
  });

  const handleClose = () => {
    props.handleClose();
  };

  const submit = () => {
    Axios.post(
      urlBackend(`secure/editCourse/${course.id}`),
      {
        contents: state.contents,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((resp) => {
        handleClose();
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Dialog
        fullScreen
        open={props.open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Edit Content
            </Typography>
            <Button autoFocus color="inherit" onClick={submit}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <ControlledEditor set={setState} state={state} />
      </Dialog>
    </>
  );
}
