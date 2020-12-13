import React from "react";
import ReactMarkdown from "react-markdown";
import { Typography } from "@material-ui/core";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import { EditOutlined } from "@material-ui/icons";

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
  return (
    <Typography>
      <ReactMarkdown children={props.contents} />
      <Fab className={classes.fab}>
        <EditOutlined />
      </Fab>
    </Typography>
  );
};

export default Contents;
