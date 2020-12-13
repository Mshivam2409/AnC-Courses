import React from "react";
import { useRecoilValue } from "recoil";
import Store from "store";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Dropzone from "components/EditCourse/Dropzone";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const ListItemLink = (props: any) => {
  return <ListItem button component="a" {...props} />;
};

const Files = () => {
  const classes = useStyles();
  const files: { fileId: string; name: string }[] = useRecoilValue(
    Store.CurrentCourse
  ).driveFiles.map((file) => {
    return JSON.parse(file);
  });
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders" dense>
        {files.map((file) => {
          return (
            <ListItem>
              {/* <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar> */}
              <ListItemText primary={file.name} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <Dropzone />
    </div>
  );
};

export default Files;
