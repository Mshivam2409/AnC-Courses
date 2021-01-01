import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import ControlledEditor from "components/shared/Editor";
import { markdownToDraft } from "markdown-draft-js";
import Axios, { AxiosError, AxiosResponse } from "axios";
import urlBackend from "config/api";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Store from "store";
import ErrorModal from "components/shared/ErrorModal";
import { IBCourse } from "types";
import { useHistory } from "react-router-dom";

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

export default function ReviewDialog(props: any) {
  const classes = useStyles();
  const token = useRecoilValue(Store.User).token;
  const [course, setCourse] = useRecoilState(Store.CurrentCourse);
  const [loading, setLoading] = useRecoilState(Store.Loading);
  const [error, setError] = React.useState("");
  const [state, setState] = React.useState({
    contents: markdownToDraft(props.text),
  });
  const history = useHistory();
  const setOpen = useSetRecoilState(Store.ModalOpen);
  const handleClose = () => {
    props.handleClose();
  };

  const submit = () => {
    setLoading(true);
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
        Axios.get<any, AxiosResponse<IBCourse>>(
          urlBackend(`secure/getCourse/${course.number.toUpperCase()}`),
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
        handleClose();
      })
      .catch((error: AxiosError) => {
        setOpen(true);
        setError(error.response?.data.message || "Internal Server Error");
        setLoading(false);
      });
  };

  return (
    <>
      <ErrorModal title={"An Error Occured"} description={error} />
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
            <Button
              autoFocus
              color="inherit"
              onClick={submit}
              disabled={loading}
            >
              save
            </Button>
          </Toolbar>
        </AppBar>
        <ControlledEditor set={setState} state={state} />
      </Dialog>
    </>
  );
}
