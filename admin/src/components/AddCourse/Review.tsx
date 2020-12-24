import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { IBCourse } from "types";
import ReactMarkdown from "react-markdown";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review(props: { state: IBCourse }) {
  const classes = useStyles();
  const products = [
    { name: "Course Code", price: props.state.number },
    { name: "Course Title", price: props.state.title },
    { name: "Course Department", price: props.state.dept },
    { name: "Course Credits", price: props.state.credits },
    { name: "Semester", price: props.state.offered },
  ];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Course Summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
      </List>
      <Grid container spacing={2}>
        <Grid item>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Contents
          </Typography>
          <Typography gutterBottom>
            <ReactMarkdown children={props.state.contents} />
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
