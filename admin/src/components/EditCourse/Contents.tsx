import React from "react";
import ReactMarkdown from "react-markdown";
import { Typography } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import { EditOutlined } from "@material-ui/icons";
import EditorDialog from "./EditorDialog";
import { Fragment } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: "sticky",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
);

const Contents = (props: { contents: string }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      <Typography>
        <ReactMarkdown children={props.contents} />
        <Fab
          className={classes.fab}
          onClick={() => {
            setOpen(true);
          }}
        >
          <EditOutlined />
        </Fab>
      </Typography>
      <EditorDialog
        open={open}
        handleClose={handleClose}
        text={props.contents}
      />
    </Fragment>
  );
};

export default Contents;
